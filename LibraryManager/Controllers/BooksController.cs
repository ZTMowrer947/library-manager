#nullable enable
using LibraryManager.Models;
using LibraryManager.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IService<Book, ulong> _service;

        public BooksController(IService<Book, ulong> service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet]
        public async Task<ICollection<Book>> Get()
        {
            return await _service.GetList();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Book bookData)
        {
            // If request body has invalid data,
            if (!ModelState.IsValid)
            {
                // Return Bad Request response
                return BadRequest(ModelState);
            }

            // Otherwise, save book
            await _service.Create(bookData);

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

            // Otherwise, return book data
            return Ok(book);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(ulong id, [FromBody] Book updatedData)
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

            // Otherwise, update book
            await _service.Update(updatedData);

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