using LibraryManager.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace LibraryManager.Tests.Integration.Setup
{
	public class TestingWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup>
		where TStartup : class
	{
		protected override void ConfigureWebHost(IWebHostBuilder builder)
		{
			// Configure web services
			builder.ConfigureServices(services =>
			{
				// Create service provider with EF Core services
				var serviceProvider = new ServiceCollection()
					.AddEntityFrameworkInMemoryDatabase()
					.BuildServiceProvider();

				// Configure database context
				services.AddDbContextPool<LibraryContext>(options =>
				{
					// Use in-memory database
					options.UseInMemoryDatabase("library-integration");

					// Attach to service provider
					options.UseInternalServiceProvider(serviceProvider);
				});

				// Build service provider
				var sp = services.BuildServiceProvider();

				// Create scope to access database services
				using var scope = sp.CreateScope();

				// Get database context from scope
				var context = scope.ServiceProvider.GetRequiredService<LibraryContext>();

				// Ensure database is created and seeded
				context.Database.EnsureCreated();
				context.EnsureSeeded();
			});
		}
	}
}
