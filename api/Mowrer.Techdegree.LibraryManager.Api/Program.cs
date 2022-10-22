using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using Mowrer.Techdegree.LibraryManager.Api;
using Mowrer.TechDegree.LibraryManager.Data;
using Mowrer.TechDegree.LibraryManager.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<LibraryContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("Library");
    options.UseSqlite(connectionString);
});

builder.Services.AddScoped<IBookRepository, BookRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<LibraryContext>();

    context.Database.EnsureDeleted();
    context.Database.EnsureCreated();

    var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
    {
        PrepareHeaderForMatch = args => args.Header.ToLower()
    };
    using var reader = new StreamReader("Books.csv");
    using var csv = new CsvReader(reader, csvConfig);

    csv.Context.RegisterClassMap<BookCsvMap>();
    var records = csv.GetRecords<Book>()!;

    context.Books.AddRange(records);
    context.SaveChanges();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();