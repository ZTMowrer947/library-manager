using CsvHelper.Configuration;
using Mowrer.TechDegree.LibraryManager.Data;

namespace Mowrer.Techdegree.LibraryManager.Data.Seeding;

public sealed class BookCsvMap: ClassMap<Book>
{
    public BookCsvMap()
    {
        Map(m => m.Title).Name("title");
        Map(m => m.Author).Name("author");
        Map(m => m.Genre).Name("genre");
        Map(m => m.Year).Name("year");
    }
}