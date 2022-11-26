using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mowrer.TechDegree.LibraryManager.Data;

namespace Mowrer.Techdegree.LibraryManager.IntegrationTesting;

public class TestWebApplicationFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        // Replace normal database config with test-specific config with in-memory database
        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<LibraryContext>));

            services.Remove(descriptor);

            services.AddDbContext<LibraryContext>(options =>
            {
                options.UseSqlite("Data Source=file::memory:?cache=shared");
            });
        });

        builder.UseEnvironment("Development");
    }
}