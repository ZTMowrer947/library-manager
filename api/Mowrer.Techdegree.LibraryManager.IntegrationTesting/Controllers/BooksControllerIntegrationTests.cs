using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mowrer.TechDegree.LibraryManager.Data;
using Mowrer.TechDegree.LibraryManager.Data.Dto;
using Mowrer.TechDegree.LibraryManager.Data.Seeding;

namespace Mowrer.Techdegree.LibraryManager.IntegrationTesting.Controllers;

[TestFixture]
public class BooksControllerIntegrationTests
{
    private TestWebApplicationFactory<Program> _factory;
    private HttpClient _client;

    [SetUp]
    public async Task SetUp()
    {
        _factory = new TestWebApplicationFactory<Program>();

        // Initialize test database
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<LibraryContext>();

        await context.Database.OpenConnectionAsync();
        await context.Database.EnsureDeletedAsync();
        await context.Database.EnsureCreatedAsync();

        context.EnsureSeeded();

        _client = _factory.CreateClient(new WebApplicationFactoryClientOptions()
        {
            AllowAutoRedirect = false
        });
    }

    [TearDown]
    public async Task TearDown()
    {
        // Close test database connection
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<LibraryContext>();

        await context.Database.CloseConnectionAsync();
    }

    [Test]
    public async Task BookCreateEndpoint_WithInvalidBody_ReturnsBadRequestError()
    {
        var data = new BookUpsertDto();

        var result = await _client.PostAsJsonAsync("/Books", data);

        Assert.That(result, Has.Property("StatusCode").EqualTo(HttpStatusCode.BadRequest));
    }

    [Test]
    public async Task BookUpdateEndpoint_WithCorrectIdButInvalidBody_ReturnsBadRequestError()
    {
        const int testId = 2;

        var data = new BookUpsertDto();

        var result = await _client.PutAsJsonAsync($"/Books/{testId}", data);

        Assert.That(result, Has.Property("StatusCode").EqualTo(HttpStatusCode.BadRequest));
    }
}