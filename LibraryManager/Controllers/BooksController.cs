using LibraryManager.DTOs;
using LibraryManager.Models;
using LibraryManager.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IPagedService<Book, ulong> _service;

        public BooksController(IPagedService<Book, ulong> service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet]
        public async Task<Page<BookDto>> Get([FromQuery(Name = "page")] int pageNumber = 1, [FromQuery] int itemsPerPage = 10)
        {
            // Get page of book data from service
            var modelPage = await _service.GetPage(pageNumber, itemsPerPage);

            // Map each book model into a DTO
            var books = modelPage
                .Data
                .Select(book => BookDto.FromModel(book))
                .ToList();

            // Create page of DTO data
            var bookPage = new Page<BookDto>(modelPage.PageNumber, modelPage.TotalPages, modelPage.ItemsPerPage, books);

            // Return book data
            return bookPage;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BookDto bookData)
        {
            // If request body has invalid data,
            if (!ModelState.IsValid)
            {
                // Return Bad Request response
                return BadRequest(ModelState);
            }

            // Otherwise, convert DTO to book model
            var bookModel = bookData.ToModel();

            // Save book
            await _service.Create(bookModel);

            // Attach new ID to DTO
            bookData.Id = bookModel.Id;

            // Return Created response
            return CreatedAtAction(nameof(Get), new { id = bookData.Id }, bookData);
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult> Get(ulong id)
        {
            // Attempt to fetch book with ID
            var book = await _service.GetById(id);

            // If book was not found,
            if (book == null)
            {
                // Return Not Found result
                return NotFound();
            }

            // Otherwise, convert book model to DTO
            var bookData = BookDto.FromModel(book);

            // Return DTO data
            return Ok(bookData);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(ulong id, [FromBody] BookDto updatedData)
        {
            // Attempt to fetch book with ID
            var book = await _service.GetById(id);

            // If book was not found,
            if (book == null)
            {
                // Return Not Found result
                return NotFound();
            }

            // If ID from route path does not match ID in entity,
            if (updatedData.Id != id)
            {
                // Return Bad Request response
                return BadRequest(new { Message = $"ID in request body ('{updatedData.Id}') does not match ID in route path ('{id}')." });
            }

            // If request body has invalid data,
            if (!ModelState.IsValid)
            {
                // Return Bad Request response
                return BadRequest(ModelState);
            }

            // Otherwise, convert DTO to book model
            var bookModel = updatedData.ToModel();

            // Update book
            await _service.Update(bookModel);

            // Return No Content response
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(ulong id)
        {
            // Attempt to fetch book with ID
            var book = await _service.GetById(id);

            // If book was not found,
            if (book == null)
            {
                // Return Not Found result
                return NotFound();
            }

            // Otherwise, delete book
            await _service.Delete(id);

            // Return No Content response
            return NoContent();
        }
    }
}