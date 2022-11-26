using Moq;
using Mowrer.TechDegree.LibraryManager.Data;
using Mowrer.TechDegree.LibraryManager.Data.Dto;
using Mowrer.TechDegree.LibraryManager.Data.Repositories;
using Mowrer.TechDegree.LibraryManager.Data.Seeding;
using Mowrer.TechDegree.LibraryManager.Data.Service;

namespace Mowrer.Techdegree.LibraryManager.Testing.Data.Services;

[TestFixture]
public class BookServiceTest
{
    private Mock<IBookRepository> _repositoryMock = new();
    private BookService _service;
    private IList<Book> _mockLibrary;
    private int _nextId;

    [SetUp]
    public void SetUp()
    {
        _service = new BookService(_repositoryMock.Object);
        _mockLibrary = BookSeedUtils.ExampleBooks;
        _nextId = _mockLibrary.Select(book => book.Id).Max() + 1;
    }

    [TearDown]
    public void TearDown()
    {
        _repositoryMock.Reset();
    }

    private void InitializeGetByIdMock()
    {
        _repositoryMock.Setup(repo => repo.Get(It.IsAny<int>()))
            .Returns<int>(id => _mockLibrary.SingleOrDefault(book => book.Id == id));
    }

    [Test]
    public void Get_WithNoArguments_ReturnsBookListing()
    {
        Assume.That(_mockLibrary, Is.Not.Empty);

        _repositoryMock.Setup(repo => repo.Get()).Returns(_mockLibrary);

        var expected = _mockLibrary.Select(book => new BookViewDto(book));
        var result = _service.Get();

        Assert.Multiple(() =>
        {
            _repositoryMock.Verify(repo => repo.Get(), Times.Once);
            Assert.That(result, Is.EquivalentTo(expected));
        });
    }

    [Test]
    public void Get_WithIdArgument_ReturnsBookWithId()
    {
        const int testId = 5;

        Assume.That(_mockLibrary, Has.One.Property("Id").EqualTo(testId));

        InitializeGetByIdMock();

        var expected = new BookViewDto(_mockLibrary.Single(book => book.Id == testId));
        var result = _service.Get(testId);

        Assert.Multiple(() =>
        {
            _repositoryMock.Verify(repo => repo.Get(testId), Times.Once);
            Assert.That(result, Is.EqualTo(expected));
        });
    }

    [Test]
    public void Get_WithIdArgument_ReturnsNullIfNotFound()
    {
        Assume.That(_mockLibrary, Is.Not.Empty);

        InitializeGetByIdMock();

        var testId = _nextId + 1;

        var result = _service.Get(testId);

        Assert.Multiple(() =>
        {
            _repositoryMock.Verify(repo => repo.Get(testId), Times.Once);
            Assert.That(result, Is.Null);
        });
    }

    [Test]
    public void Create_ReturnsNewlyCreatedBook()
    {
        // Arrange
        _repositoryMock.Setup(repo => repo.Create(It.IsAny<Book>()))
            .Callback<Book>(book =>
            {
                book.Id = _nextId;
                book.CreatedAt = DateTime.UtcNow;
                book.UpdatedAt = DateTime.UtcNow;
                _nextId++;

                _mockLibrary.Add(book);
            }).Returns(() => _mockLibrary.Last());

        var data = new BookUpsertDto
        {
            Title = "Writing Mocks with Moq",
            Author = "John Q."
        };

        var expected = new BookViewDto(data.ToModel())
        {
            Id = _nextId
        };

        // Act
        var result = _service.Create(data);

        // Assert
        Assert.Multiple(() =>
        {
            _repositoryMock.Verify(repo => repo.Create(It.IsAny<Book>()), Times.Once);
            Assert.That(result, Is.EqualTo(expected));
        });
    }

    [Test]
    public void Update_ModifiesBookInRepository()
    {
        const int testId = 2;

        // Assume
        Assume.That(_mockLibrary, Has.One.Property("Id").EqualTo(testId));

        // Arrange
        InitializeGetByIdMock();
        _repositoryMock.Setup(repo => repo.Update(It.IsAny<Book>()))
            .Callback<Book>(book =>
            {
                var idx = _mockLibrary.Select((mBook, index) => (book: mBook, index))
                    .Where(tuple => tuple.book.Id == book.Id)
                    .Select(tuple => tuple.index)
                    .Single();

                book.CreatedAt = _mockLibrary[idx].CreatedAt;
                book.UpdatedAt = DateTime.UtcNow;

                _mockLibrary.RemoveAt(idx);
                _mockLibrary.Insert(idx, book);
            })
            .Returns<Book>(book => _mockLibrary.Single(mBook => mBook.Equals(book)));

        var updateData = new BookUpsertDto
        {
            Title = "Writing Tests with Moq, 2nd edition",
            Author = "John Q."
        };

        var expected = new BookViewDto(updateData.ToModel())
        {
            Id = testId,
        };

        // Act
        _service.Update(testId, updateData);
        var postUpdateResult = _repositoryMock.Object.Get(testId)!;
        var dtoResult = new BookViewDto(postUpdateResult);

        // Assert
        Assert.Multiple(() =>
        {
            _repositoryMock.Verify(repo => repo.Update(It.IsAny<Book>()), Times.Once);

            Assert.That(dtoResult, Is.EqualTo(expected));
        });
    }

    [Test]
    public void Delete_RemovedBookFromRepository()
    {
        const int testId = 2;

        // Assume
        Assume.That(_mockLibrary, Has.One.Property("Id").EqualTo(testId));

        // Arrange
        InitializeGetByIdMock();

        _repositoryMock.Setup(repo => repo.Delete(It.IsAny<Book>()))
            .Callback<Book>(book => _mockLibrary.Remove(book));

        // Act
        _service.Delete(testId);

        var postDeleteResult = _repositoryMock.Object.Get(testId);

        // Assert
        Assert.Multiple(() =>
        {
            _repositoryMock.Verify(repo => repo.Delete(It.IsAny<Book>()), Times.Once);
            Assert.That(postDeleteResult, Is.Null);
        });
    }
}