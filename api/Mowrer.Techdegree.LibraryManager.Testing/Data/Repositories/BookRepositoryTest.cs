using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using Mowrer.Techdegree.LibraryManager.Api;
using Mowrer.TechDegree.LibraryManager.Data;
using Mowrer.TechDegree.LibraryManager.Data.Repositories;

namespace Mowrer.Techdegree.LibraryManager.Testing.Data.Repositories;

[TestFixture]
public class BookRepositoryTest
{
    private LibraryContext _context;
    private BookRepository _repository;
    private IEnumerable<Book> _seedData;

    [SetUp]
    public void SetUp()
    {
        // Configure test context with in-memory SQLite database
        var contextOptions = new DbContextOptionsBuilder<LibraryContext>()
            .UseSqlite("Data Source=:memory:")
            .Options;

        _context = new LibraryContext(contextOptions);

        // Initialize connection and create tables
        _context.Database.OpenConnection();
        _context.Database.EnsureCreated();
        
        // Seed database
        var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            PrepareHeaderForMatch = args => args.Header.ToLower()
        };
        using var reader = new StreamReader("Books.csv");
        using var csv = new CsvReader(reader, csvConfig);

        csv.Context.RegisterClassMap<BookCsvMap>();
        _seedData = csv.GetRecords<Book>()!.ToList();

        _context.Books.AddRange(_seedData);
        _context.SaveChanges();

        _repository = new BookRepository(_context);
    }

    [TearDown]
    public void TearDown()
    {
        _context.Database.CloseConnection();
        _repository.Dispose();
    }

    [Test]
    public void Get_WithNoArguments_ReturnsBookCollection()
    {
        var expected = _seedData;
        var result = _repository.Get();
        
        Assert.That(result, Is.EquivalentTo(expected));
    }

    [Test]
    public void Get_WithIdArgument_ReturnsBookWithId()
    {
        const int id = 2;

        var expected = _seedData.Single(book => book.Id == id);
        var result = _repository.Get(id);
        
        Assert.That(result, Is.EqualTo(expected));
    }

    [Test]
    public void Get_WithIdArgument_ReturnsNullIfNotFound()
    {
        var id = _seedData.Select(book => book.Id).Max() + 1;

        var result = _repository.Get(id);
        
        Assert.That(result, Is.Null);
    }

    [Test]
    public void Create_ReturnsNewBookWithAssignedId()
    {
        var newBook = new Book
        {
            Title = "Unit Testing with NUnit",
            Author = "John Doe"
        };

        var result = _repository.Create(newBook);
        
        Assert.Multiple(() =>
        {
            Assert.That(result.Id, Is.Positive);
            Assert.That(result, Is.EqualTo(newBook));
        });
    }

    [Test]
    public void Update_ReturnsUpdatedBook()
    {
        // Arrange
        var newBook = new Book
        {
            Title = "Unit Testing with NUnit",
            Author = "John Doe",
            Year = 2015
        };

        _context.Add(newBook);
        _context.SaveChanges();

        var updateData = new Book
        {
            Id = newBook.Id,
            Title = "Unit Testing with NUnit, 2nd Edition",
            Author = newBook.Author,
            Year = 2019
        };
        
        // Act
        var updatedBook = _repository.Update(updateData);
        
        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(updatedBook, Is.EqualTo(updateData));
            Assert.That(updateData, Is.Not.EqualTo(newBook));
        });
    }

    [Test]
    public void Delete_RemovesItemFromDatabase()
    {
        // Arrange
        var newBook = new Book
        {
            Title = "Unit Testing with NUnit",
            Author = "John Doe",
            Genre = "Informational",
            Year = 2015
        };

        _context.Add(newBook);
        _context.SaveChanges();

        var id = newBook.Id;
        
        // Act
        _repository.Delete(newBook);
        var postDeleteResult = _context.Books.SingleOrDefault(book => book.Id == id);

        // Assert
        Assert.That(postDeleteResult, Is.Null);
    }
}