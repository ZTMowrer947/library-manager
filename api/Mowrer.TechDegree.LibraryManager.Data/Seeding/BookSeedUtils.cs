using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using Mowrer.Techdegree.LibraryManager.Data.Seeding;

namespace Mowrer.TechDegree.LibraryManager.Data.Seeding;

public static class BookSeedUtils
{
    public static IList<Book> ExampleBooks
    {
        get
        {
            var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                PrepareHeaderForMatch = args => args.Header.ToLower()
            };
            
            var projectBase = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..\\..\\..\\..\\", "Mowrer.Techdegree.LibraryManager.Data");
            
            const string relFilePath = "Seeding\\Books.csv";

            var filePath = Path.GetFullPath(Path.Combine(projectBase, relFilePath));

            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, csvConfig);

            csv.Context.RegisterClassMap<BookCsvMap>();
            
            return csv.GetRecords<Book>()!.Select((book, index) =>
            {
                book.Id = index + 1;

                return book;
            }).ToList();
        }
    }

    public static void EnsureSeeded(this LibraryContext @this)
    {
        @this.AddRange(ExampleBooks);
        @this.SaveChanges();
    }
}