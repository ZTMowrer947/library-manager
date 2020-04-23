#nullable enable
using LibraryManager.DTOs;
using LibraryManager.Models;
using LibraryManager.Tests.Integration.Setup;
using LibraryManagerTestUtils;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Xunit;

namespace LibraryManager.Controllers.Tests.Integration
{
	public class BooksControllerIntegrationTests : IClassFixture<TestingWebApplicationFactory<Startup>>
	{
		private static readonly Regex LocationRegex = new Regex(@"^/api/[Bb]ooks/(?<id>\d+)$");
		private readonly HttpClient _client;

		public BooksControllerIntegrationTests(TestingWebApplicationFactory<Startup> factory)
		{
			_client = factory.CreateClient();
		}

		private async Task<BookDto> CreateTestBookData()
		{
			// Define regex for location header
			var locationRegex = new Regex(@"/api/[Bb]ooks/(?<id>\d+)$");

			// Generate test book DTO
			var bookData = BookUtils.GetFakeBookDto();

			// Serialize book for request body
			var bookJson = JsonConvert.SerializeObject(bookData);

			// Create request body
			var reqData = new StringContent(bookJson, Encoding.UTF8, "application/json");

			// Make POST request to book collection
			var response = await _client.PostAsync("/api/Books", reqData);

			// Ensure response was successful
			response.EnsureSuccessStatusCode();

			// Get location string
			var location = response.Headers.Location.AbsolutePath;

			// Match location against regex
			var locationMatch = locationRegex.Match(location);

			// Attach ID to book data
			bookData.Id = ulong.Parse(locationMatch.Groups[1].Value);

			// Return book
			return bookData;
		}

		[Fact()]
		public async Task GetToCollection_ShouldReturnNonEmptyBookListing()
		{
			// Make GET request to books collection
			var response = await _client.GetAsync("/api/Books");

			// Ensure response has successful status code
			response.EnsureSuccessStatusCode();

			// Deserialize response body into book collection
			var bodyString = await response.Content.ReadAsStringAsync();
			var books = JsonConvert.DeserializeObject<ICollection<BookDto>>(bodyString);

			// Assert that book collection is non-empty
			Assert.True(books.Count > 0, "Book collection should be non-empty");
		}

		[Fact()]
		public async Task PostToCollection_ShouldReturnCreatedStatusAndLinkToNewCourse()
		{
			// Generate test book data
			var bookDto = BookUtils.GetFakeBookDto();

			// Serialize book for request body
			var bookJson = JsonConvert.SerializeObject(bookDto);

			// Create request body
			var reqData = new StringContent(bookJson, Encoding.UTF8, "application/json");

			// Make POST request to book collection
			var response = await _client.PostAsync("/api/Books", reqData);

			// Ensure response has 201 status code
			Assert.StrictEqual(HttpStatusCode.Created, response.StatusCode);

			// Get location string
			var location = response.Headers.Location.AbsolutePath;

			// Match location against regex
			var locationMatch = LocationRegex.Match(location);

			// Assert that match was successful
			Assert.True(locationMatch.Success, "Location header should contain ID of new book");
		}

		[Fact()]
		public async Task PostToCollectionWithInvalidData_ShouldReturnBadRequestStatus()
		{
			// Create request body with empty object
			var reqData = new StringContent("{}", Encoding.UTF8, "application/json");

			// Make POST request to book collection
			var response = await _client.PostAsync("/api/Books", reqData);

			// Assert that response has 400 status code
			Assert.StrictEqual(HttpStatusCode.BadRequest, response.StatusCode);
		}

		[Fact()]
		public async Task GetToResource_ShouldReturnBookData()
		{
			// Create book data for test
			var bookData = await CreateTestBookData();

			// Make GET request to book resource
			var response = await _client.GetAsync($"/api/Books/{bookData.Id}");

			// Ensure response has successful status code
			response.EnsureSuccessStatusCode();

			// Deserialize response body into book data
			var bodyString = await response.Content.ReadAsStringAsync();
			var resultBook = JsonConvert.DeserializeObject<BookDto>(bodyString);

			// Assert that book matches previously created book data
			Assert.StrictEqual(bookData, resultBook);
		}

		[Fact()]
		public async Task GetToResourceWithUnusedId_ShouldReturnNotFound()
		{
			// Define ID to test
			var id = ulong.MaxValue;

			// Make GET request to book resource
			var response = await _client.GetAsync($"/api/Books/{id}");

			// Assert that response has 404 status code
			Assert.StrictEqual(HttpStatusCode.NotFound, response.StatusCode);
		}

		[Fact()]
		public async Task PutToResource_ShouldReturnNoContentStatusCode()
		{
			// Create test book data
			var bookData = await CreateTestBookData();

			// Create book update data
			var updateData = BookUtils.GetFakeBookDto();
			updateData.Id = bookData.Id;

			// Serialize update data for request body
			var updateJson = JsonConvert.SerializeObject(updateData);

			// Create request body
			var reqData = new StringContent(updateJson, Encoding.UTF8, "application/json");

			// Make PUT request to book resource, followed by GET request
			var putResponse = await _client.PutAsync($"/api/Books/{updateData.Id}", reqData);
			var getResponse = await _client.GetAsync($"/api/Books/{updateData.Id}");

			// Assert that PUT response has 204 status code
			Assert.StrictEqual(HttpStatusCode.NoContent, putResponse.StatusCode);

			// Assert that GET response has successful status code
			getResponse.EnsureSuccessStatusCode();

			// Deserialize GET response body into book data
			var bodyString = await getResponse.Content.ReadAsStringAsync();
			var resultBook = JsonConvert.DeserializeObject<BookDto>(bodyString);

			// Assert that book matches update data, but not original book data
			Assert.StrictEqual(updateData, resultBook);
			Assert.NotStrictEqual(bookData, resultBook);
		}

		[Fact()]
		public async Task PutToResourceWithUnusedId_ShouldReturnNotFound()
		{
			// Define ID to test
			var id = ulong.MaxValue;

			// Create book update data
			var updateData = BookUtils.GetFakeBookDto();
			updateData.Id = id;

			// Serialize update data for request body
			var updateJson = JsonConvert.SerializeObject(updateData);

			// Create request body
			var reqData = new StringContent(updateJson, Encoding.UTF8, "application/json");


			// Make PUT request to book resource
			var response = await _client.PutAsync($"/api/Books/{updateData.Id}", reqData);

			// Assert that response has 404 status code
			Assert.StrictEqual(HttpStatusCode.NotFound, response.StatusCode);
		}

		[Fact()]
		public async Task PutToResourceWithMismatchingIds_ShouldReturnBadRequestStatus()
		{
			// Create test book
			var bookData = await CreateTestBookData();

			// Create book update data
			var updateData = BookUtils.GetFakeBookDto();
			updateData.Id = bookData.Id + 1;

			// Serialize update data for request body
			var updateJson = JsonConvert.SerializeObject(updateData);

			// Create request body
			var reqData = new StringContent(updateJson, Encoding.UTF8, "application/json");

			// Make PUT request to book resource
			var response = await _client.PutAsync($"/api/Books/{bookData.Id}", reqData);

			// Assert that response has 400 status code
			Assert.StrictEqual(HttpStatusCode.BadRequest, response.StatusCode);
		}

		[Fact()]
		public async Task PutToResourceWithInvalidData_ShouldReturnBadRequestStatus()
		{
			// Create test book
			var book = await CreateTestBookData();

			// Create object to serialize
			var bodyObject = new {
				book.Id
			};

			// Serialize object for request body
			var bodyJson = JsonConvert.SerializeObject(bodyObject);

			// Create request body
			var reqData = new StringContent(bodyJson, Encoding.UTF8, "application/json");

			// Make POST request to book collection
			var response = await _client.PutAsync($"/api/Books/{bodyObject.Id}", reqData);

			// Assert that response has 400 status code
			Assert.StrictEqual(HttpStatusCode.BadRequest, response.StatusCode);
		}

		[Fact()]
		public async Task DeleteToResource_ShouldReturnNoContentAndRenderBookUnfindable()
		{
			// Create test book for deletion
			var bookToDelete = await CreateTestBookData();

			// Make DELETE request to book resource, followed by GET request
			var delResponse = await _client.DeleteAsync($"/api/Books/{bookToDelete.Id}");
			var getResponse = await _client.GetAsync($"/api/Books/{bookToDelete.Id}");

			// Assert that DELETE response has 204 status code
			Assert.StrictEqual(HttpStatusCode.NoContent, delResponse.StatusCode);

			// Assert that GET response has 404 status code
			Assert.StrictEqual(HttpStatusCode.NotFound, getResponse.StatusCode);
		}

		[Fact()]
		public async Task DeleteToResourceWithUnusedId_ShouldReturnNotFound()
		{
			// Define ID to test
			var id = ulong.MaxValue;

			// Make DELETE request to book resource
			var response = await _client.DeleteAsync($"/api/Books/{id}");

			// Assert that response has 404 status code
			Assert.StrictEqual(HttpStatusCode.NotFound, response.StatusCode);
		}
	}
}