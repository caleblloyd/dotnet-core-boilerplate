using App.Common.Db;
using App.Api.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ganss.XSS;

namespace App.Api.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
	    private readonly AppDb _db;

	    public PostsController(AppDb db)
	    {
		    _db = db;
	    }

        // GET api/posts
        [HttpGet]
        public async Task<IActionResult> ListAsync()
        {
			var results = await _db.Posts.Include(m => m.Author).OrderByDescending(m => m.Id).ToListAsync();
			return new OkObjectResult(results);
        }

        // GET api/posts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
			var model = await _db.Posts.Include(m => m.Author).FirstOrDefaultAsync(m => m.Id == id);
			if (model != null)
			{
				return new OkObjectResult(model);
			}
			return NotFound();
        }

        // POST api/posts
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Post body)
        {
			var sanitizer = new HtmlSanitizer();
			body.Content = sanitizer.Sanitize(body.Content);
	        _db.Posts.Add(body);
			await _db.SaveChangesAsync();
			return new OkObjectResult(body);
        }

        // PUT api/posts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] Post body)
        {
			var model = await _db.Posts.FindAsync(id);
			if (model != null)
			{
				model.Title = body.Title;
				var sanitizer = new HtmlSanitizer();
				model.Content = sanitizer.Sanitize(body.Content);
				model.AuthorId = body.AuthorId;
				await _db.SaveChangesAsync();
				return new OkObjectResult(model);
			}
			return NotFound();
        }

        // DELETE api/posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
			var model = await _db.Posts.FindAsync(id);
			if (model != null)
			{
				_db.Posts.Remove(model);
				await _db.SaveChangesAsync();
				return Ok();
			}
			return NotFound();
        }
    }
}