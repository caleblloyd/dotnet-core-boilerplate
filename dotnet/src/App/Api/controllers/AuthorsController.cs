using App.Db;
using App.Api.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.Api.Controllers
{
    [Route("api/[controller]")]
    public class AuthorsController : Controller
    {
	    private readonly AppDb _db;

	    public AuthorsController(AppDb db)
	    {
		    _db = db;
	    }

        // GET api/authors
        [HttpGet]
        public async Task<IActionResult> ListAsync()
        {
			return new OkObjectResult(await _db.Authors.OrderBy(m => m.Id).ToListAsync());
        }

        // GET api/authors/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
			var model = await _db.Authors.FindAsync(id);
			await _db.Entry(model).Collection(m => m.Posts).Query().OrderByDescending(m => m.Id).ToListAsync();
			if (model != null)
			{
				return new OkObjectResult(model);
			}
			return NotFound();
        }

        // POST api/async
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody]Author body)
        {
	        _db.Authors.Add(body);
			await _db.SaveChangesAsync();
			return new OkObjectResult(body);
        }

        // PUT api/async/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] Author body)
        {
			var model = await _db.Authors.FindAsync(id);
			if (model != null)
			{
				model.Name = body.Name;
				await _db.SaveChangesAsync();
				return new OkObjectResult(model);
			}
			return NotFound();
        }

        // DELETE api/async/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
			var model = await _db.Authors.FindAsync(id);
			if (model != null)
			{
				_db.Authors.Remove(model);
				await _db.SaveChangesAsync();
				return Ok();
			}
			return NotFound();
        }
    }
}