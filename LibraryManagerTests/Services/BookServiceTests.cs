using Xunit;
using LibraryManager.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using LibraryManager.Models;
using LibraryManager.Repos;
using LibraryManagerTestUtils;
using System.Linq;
using Moq;

namespace LibraryManager.Services.Tests
{
	public class BookRepositoryFixture
	{
		private List<Book> _books;
		private ulong _nextId;

		public Mock<IRepository<Book, ulong>> RepositoryMock { get; private set; }
		public IRepository<Book, ulong> Repository => RepositoryMock.Object;
		public IService<Book, ulong> Service { get; private set; }
		public ulong TestId => _nextId - 1;

		public BookRepositoryFixture()
		{
			// Populate book listing with fake book data
			_books = BookUtils.GetFakeBooks().ToList();

			// Calculate ID of next book
			_nextId = _books.Select(book => book.Id).Max() + 1;

			// Create mock for repository
			RepositoryMock = new Mock<IRepository<Book, ulong>>(MockBehavior.Strict);

			// Setup mocks for repository methods
			RepositoryMock.Setup(repo => repo.FindAll()).ReturnsAsync(_books);
			RepositoryMock.Setup(repo => repo.FindById(It.IsAny<ulong>()))
				.ReturnsAsync((ulong id) => _books
					.Where(book => book.Id == id)
					.SingleOrDefault()
				);

			RepositoryMock.Setup(repo => repo.Create(It.IsAny<Book>()))
				.Callback((Book book) =>
				{
					// Assign book ID and increment next ID
					book.Id = _nextId++;

					// Add book to list
					_books.Add(book);
				})
				.Returns(Task.FromResult(false));

			RepositoryMock.Setup(repo => repo.Update(It.IsAny<Book>()))
				.Callback((Book updateData) =>
				{
					// Find index of book with matching ID
					var index = _books.FindIndex(book => book.Id == updateData.Id);

					// Get book at index
					var bookToUpdate = _books.ElementAt(index);

					// Update properties on book
					bookToUpdate.Title = updateData.Title;
					bookToUpdate.Author = updateData.Author;
					bookToUpdate.Genre = updateData.Genre;
					bookToUpdate.Year = updateData.Year;
				})
				.Returns(Task.FromResult(false));

			RepositoryMock.Setup(repo => repo.Delete(It.IsAny<Book>()))
				.Callback((Book bookToDelete) =>
				{
					// Remove book from list
					_books.Remove(bookToDelete);
				})
				.Returns(Task.FromResult(false));

			// Initialize service
			Service = new BookService(Repository);
		}
	}

	public class BookServiceTests : IClassFixture<BookRepositoryFixture>
	{
		private readonly BookRepositoryFixture _fixture;

		public BookServiceTests(BookRepositoryFixture fixture)
		{
			_fixture = fixture ?? throw new ArgumentNullException(nameof(fixture));
		}

		[Fact()]
		public async Task GetList_ShouldReturnNonEmptyBookListing()
		{
			// Get listing from service
			var books = await _fixture.Service.GetList();

			// Assert that collection has nonzero size
			Assert.True(books.Count > 0, "Book listing should be non-empty");
		}

		[Fact()]
		public async Task Create_ShouldPersistBook()
		{
			// Generate fake book data
			var newBook = BookUtils.GetFakeBook();

			// Save book using service
			await _fixture.Service.Create(newBook);

			// Attempt to retrieve newly created book using repository
			var retrievedBook = await _fixture.Repository.FindById(newBook.Id);

			// Assert that retrieved book is non-null and matches created book
			Assert.NotNull(retrievedBook);
			Assert.StrictEqual(newBook, retrievedBook);
		}

		[Fact()]
		public async Task GetById_ShouldReturnCorrectCourseData()
		{
			// Get ID of book to retrieve
			var testId = _fixture.TestId;

			// Get expected book from repository and actual book from service
			var expectedBook = await _fixture.Repository.FindById(testId);
			var actualBook = await _fixture.Service.GetById(testId);

			// Assert that book from service is non-null and matches book from repository
			Assert.NotNull(actualBook);
			Assert.StrictEqual(expectedBook, actualBook);
		}

		[Fact()]
		public async Task Update_ShouldModifyExistingBook()
		{
			// Get ID of book to update
			var testId = _fixture.TestId;

			// Retrieve current book with ID to compare against later
			var currentBook = await _fixture.Repository.FindById(testId);

			// Generate book data for update
			var updateData = BookUtils.GetFakeBook();

			// Set ID on update data
			updateData.Id = testId;

			// Update book using service
			await _fixture.Service.Update(updateData);

			// Assert that books are not equal
			Assert.NotStrictEqual(currentBook, updateData);
		}

		[Fact()]
		public async Task Delete_ShouldRemoveBook()
		{
			// Get ID of book to update
			var testId = _fixture.TestId;

			// Delete book with given ID
			await _fixture.Service.Delete(testId);

			// Attempt to retrieve book using repository
			var deletedBook = await _fixture.Repository.FindById(testId);

			// Assert that post-delete fetch returned null
			Assert.Null(deletedBook);
		}
	}
}