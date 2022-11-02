using Microsoft.AspNetCore.Mvc;
using Mowrer.TechDegree.LibraryManager.Data.Dto;
using Mowrer.TechDegree.LibraryManager.Data.Service;

namespace Mowrer.Techdegree.LibraryManager.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class BooksController : Controller
{
    private readonly IBookService _service;

    public BooksController(IBookService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult BookList()
    {
        var books = _service.Get();
        
        return Ok(books);
    }

    [HttpGet("{id:int}")]
    public IActionResult BookDetail([FromRoute] int id)
    {
        var book = _service.Get(id);

        if (book == null) return NotFound();

        return Ok(book);
    }

    [HttpPost]
    public IActionResult NewBook([FromBody] BookUpsertDto bookData)
    {
        var newBook = _service.Create(bookData);

        return CreatedAtAction(nameof(BookDetail), new { id = newBook.Id }, newBook);
    }

    [HttpPut("{id:int}")]
    public IActionResult UpdateBook([FromRoute] int id, [FromBody] BookUpsertDto updateData)
    {
        var currentBook = _service.Get(id);

        if (currentBook == null)
            return NotFound();

        var updatedBook = _service.Update(id, updateData);

        return Ok(updatedBook);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteBook([FromRoute] int id)
    {
        var book = _service.Get(id);

        if (book == null)
            return NotFound();
        
        _service.Delete(id);

        return NoContent();
    }
}