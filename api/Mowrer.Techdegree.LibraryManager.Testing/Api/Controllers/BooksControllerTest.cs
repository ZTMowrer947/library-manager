using Microsoft.AspNetCore.Mvc;
using Moq;
using Mowrer.Techdegree.LibraryManager.Api.Controllers;
using Mowrer.TechDegree.LibraryManager.Data;
using Mowrer.TechDegree.LibraryManager.Data.Dto;
using Mowrer.TechDegree.LibraryManager.Data.Seeding;
using Mowrer.TechDegree.LibraryManager.Data.Service;

namespace Mowrer.Techdegree.LibraryManager.Testing.Api.Controllers;

[TestFixture]
public class BooksControllerTest
{
    private Mock<IBookService> _serviceMock = new();
    private BooksController _controller;
    
    private IList<Book> _mockLibrary;
    private int _nextId;

    [SetUp]
    public void SetUp()
    {
        _controller = new BooksController(_serviceMock.Object);

        _mockLibrary = BookSeedUtils.ExampleBooks;
        _nextId = _mockLibrary.Select(book => book.Id).Max() + 1;
    }

    [TearDown]
    public void TearDown()
    {
        _serviceMock.Reset();
    }

    [Test]
    public void BookList_YieldsBookList()
    {
        Assume.That(_mockLibrary.Count, Is.AtLeast(1));
        
        var expected = _mockLibrary.Select(book => new BookViewDto(book)).ToList();
        
        _serviceMock.Setup(service => service.Get())
            .Returns(expected);
        var result = _controller.BookList();
        
        Assert.That(result, Is.AssignableTo<OkObjectResult>());
        
        Assert.Multiple(() =>
        {
            _serviceMock.Verify(service => service.Get(), Times.Once);
            var castResult = (OkObjectResult)result;

            Assert.That(castResult.Value, Is.EquivalentTo(expected));
        });
    }

    [Test]
    public void BookDetail_YieldsBookWithGivenId()
    {
        Assume.That(_mockLibrary.Count, Is.AtLeast(1));
        
        var expectedBook = new BookViewDto(_mockLibrary.First());
        
        _serviceMock.Setup(service => service.Get(It.IsAny<int>()))
            .Returns<int>(id => _mockLibrary
                .Where(book => book.Id == id)
                .Select(book => new BookViewDto(book))
                .SingleOrDefault());

        var result = _controller.BookDetail(expectedBook.Id);
        
        Assert.That(result, Is.AssignableTo<OkObjectResult>());

        Assert.Multiple(() =>
        {
            _serviceMock.Verify(service => service.Get(expectedBook.Id), Times.Once);
            var castResult = (OkObjectResult)result;

            Assert.That(castResult.Value, Is.EqualTo(expectedBook));
        });
    }

    [Test]
    public void BookDetail_YieldsNotFoundIfNotInService()
    {
        Assume.That(_mockLibrary.Count, Is.AtLeast(1));
        
        var testId = _mockLibrary.Select(book => book.Id).Max() + 1;

        _serviceMock.Setup(service => service.Get(It.IsAny<int>()))
            .Returns<int>(id => _mockLibrary
                .Where(book => book.Id == id)
                .Select(book => new BookViewDto(book))
                .SingleOrDefault());

        var result = _controller.BookDetail(testId);
        
        Assert.Multiple(() =>
        {
            _serviceMock.Verify(service => service.Get(testId), Times.Once);

            Assert.That(result, Is.AssignableTo<NotFoundResult>());
        });
    }

    [Test]
    public void NewBook_YieldsCreatedResultWithResultantBook()
    {
        var bookData = new BookUpsertDto()
        {
            Title = "Unit Testing ASP.NET Core Web API Controllers",
            Author = "John Doe"
        };

        var expectedData = new BookViewDto(bookData.ToModel())
        {
            Id = _nextId
        };
        
        _serviceMock.Setup(service => service.Create(It.IsAny<BookUpsertDto>()))
            .Callback<BookUpsertDto>(bookDto =>
            {
                var book = bookDto.ToModel();
                
                book.Id = _nextId;
                book.CreatedAt = DateTime.UtcNow;
                book.UpdatedAt = DateTime.UtcNow;
                _nextId++;

                _mockLibrary.Add(book);
            }).Returns(() => new BookViewDto(_mockLibrary.Last()));

        var result = _controller.NewBook(bookData);
        
        Assert.That(result, Is.AssignableTo<CreatedAtActionResult>());
        
        Assert.Multiple(() =>
        {
            _serviceMock.Verify(service => service.Create(It.IsAny<BookUpsertDto>()), Times.Once);

            var castResult = (CreatedAtActionResult)result;
            
            Assert.That(castResult.Value, Is.EqualTo(expectedData));
        });
    }

    [Test]
    public void UpdateBook_YieldsOkResultWithUpdatedBook()
    {
        const int testId = 2;
     
        // Assume
        Assume.That(_mockLibrary, Has.Count.AtLeast(1));
        Assume.That(_mockLibrary, Has.One.Property("Id").EqualTo(testId));
        
        // Arrange
        _serviceMock.Setup(service => service.Get(It.IsAny<int>()))
            .Returns<int>(id => _mockLibrary
                .Where(book => book.Id == id)
                .Select(book => new BookViewDto(book))
                .SingleOrDefault());
        
        _serviceMock.Setup(service => service.Update(It.IsAny<int>(), It.IsAny<BookUpsertDto>()))
            .Callback<int, BookUpsertDto>((id, updateData) =>
            {
                var book = updateData.ToModel();
                
                var idx = _mockLibrary.Select((mBook, index) => (book: mBook, index))
                    .Where(tuple => tuple.book.Id == id)
                    .Select(tuple => tuple.index)
                    .Single();

                book.Id = _mockLibrary[idx].Id;
                book.CreatedAt = _mockLibrary[idx].CreatedAt;
                book.UpdatedAt = DateTime.UtcNow;
                
                _mockLibrary.RemoveAt(idx);
                _mockLibrary.Insert(idx, book);
            })
            .Returns<int, BookUpsertDto>((id, _) =>
                _mockLibrary.Where(book => book.Id == id)
                    .Select(book => new BookViewDto(book))
                    .Single());
        
        var updateData = new BookUpsertDto
        {
            Title = "Writing Tests with Moq, 2nd edition",
            Author = "John Q."
        };

        var expectedObjectValue = new BookViewDto(updateData.ToModel())
        {
            Id = testId
        };

        // Act
        var result = _controller.UpdateBook(testId, updateData);
        
        // Assert
        Assert.That(result, Is.AssignableTo<OkObjectResult>());
        
        Assert.Multiple(() =>
        {
            _serviceMock.Verify(service => service.Get(testId), Times.Once);
            _serviceMock.Verify(service => service.Update(testId, updateData), Times.Once);

            var castResult = (OkObjectResult)result;

            Assert.That(castResult.Value, Is.EqualTo(expectedObjectValue));
        });
    }

    [Test]
    public void UpdateBook_YieldsNotFoundResultForNonexistentBook()
    {
        const int testId = 65536;
     
        // Assume
        Assume.That(_mockLibrary, Has.Count.AtLeast(1));
        Assume.That(_mockLibrary, Has.None.Property("Id").EqualTo(testId));
        
        // Arrange
        _serviceMock.Setup(service => service.Get(It.IsAny<int>()))
            .Returns<int>(id => _mockLibrary
                .Where(book => book.Id == id)
                .Select(book => new BookViewDto(book))
                .SingleOrDefault());
        
        _serviceMock.Setup(service => service.Update(It.IsAny<int>(), It.IsAny<BookUpsertDto>()))
            .Callback<int, BookUpsertDto>((id, updateData) =>
            {
                var book = updateData.ToModel();
                
                var idx = _mockLibrary.Select((mBook, index) => (book: mBook, index))
                    .Where(tuple => tuple.book.Id == id)
                    .Select(tuple => tuple.index)
                    .Single();

                book.Id = _mockLibrary[idx].Id;
                book.CreatedAt = _mockLibrary[idx].CreatedAt;
                book.UpdatedAt = DateTime.UtcNow;
                
                _mockLibrary.RemoveAt(idx);
                _mockLibrary.Insert(idx, book);
            })
            .Returns<int, BookUpsertDto>((id, _) =>
                _mockLibrary.Where(book => book.Id == id)
                    .Select(book => new BookViewDto(book))
                    .Single());
        
        var updateData = new BookUpsertDto
        {
            Title = "Writing Tests with Moq, 2nd edition",
            Author = "John Q."
        };

        // Act
        var result = _controller.UpdateBook(testId, updateData);
        
        // Assert
        Assert.Multiple(() =>
        {
            _serviceMock.Verify(service => service.Get(testId), Times.Once);
            _serviceMock.Verify(service => service.Update(testId, updateData), Times.Never);

            Assert.That(result, Is.AssignableTo<NotFoundResult>());
        });
    }

    [Test]
    public void DeleteBook_YieldsNoContentResultAndRemovesBookFromService()
    {
        const int testId = 2;
        
        Assume.That(_mockLibrary, Has.Count.AtLeast(1));
        Assume.That(_mockLibrary, Has.One.Property("Id").EqualTo(testId));
        
        _serviceMock.Setup(service => service.Get(It.IsAny<int>()))
            .Returns<int>(id => _mockLibrary
                .Where(book => book.Id == id)
                .Select(book => new BookViewDto(book))
                .SingleOrDefault());

        _serviceMock.Setup(service => service.Delete(It.IsAny<int>()))
            .Callback<int>(id =>
            {
                var bookWithId = _mockLibrary.Single(book => book.Id == id);

                _mockLibrary.Remove(bookWithId);
            });

        var result = _controller.DeleteBook(testId);

        Assert.Multiple(() =>
        {
            _serviceMock.Verify(service => service.Get(testId), Times.Once);
            _serviceMock.Verify(service => service.Delete(testId), Times.Once);
            
            Assert.That(result, Is.AssignableTo<NoContentResult>());
        });
    }

    [Test]
    public void DeleteBook_YieldsNotFoundResultForNonexistentBook()
    {
        const int testId = 65536;
        
        Assume.That(_mockLibrary, Has.Count.AtLeast(1));
        Assume.That(_mockLibrary, Has.None.Property("Id").EqualTo(testId));
        
        _serviceMock.Setup(service => service.Get(It.IsAny<int>()))
            .Returns<int>(id => _mockLibrary
                .Where(book => book.Id == id)
                .Select(book => new BookViewDto(book))
                .SingleOrDefault());

        _serviceMock.Setup(service => service.Delete(It.IsAny<int>()))
            .Callback<int>(id =>
            {
                var bookWithId = _mockLibrary.Single(book => book.Id == id);

                _mockLibrary.Remove(bookWithId);
            });

        var result = _controller.DeleteBook(testId);
        
        Assert.Multiple(() =>
        {
            _serviceMock.Verify(service => service.Get(testId), Times.Once);
            _serviceMock.Verify(service => service.Delete(testId), Times.Never);
            
            Assert.That(result, Is.AssignableTo<NotFoundResult>());
        });
    }
}