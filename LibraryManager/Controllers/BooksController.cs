#nullable enable
using LibraryManager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        [HttpGet]
        public async Task<ICollection<Book>> Get()
        {
            return new List<Book>();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Book bookData)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(ulong id)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(ulong id, [FromBody] Book updatedData)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(ulong id)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable);
        }
    }
}