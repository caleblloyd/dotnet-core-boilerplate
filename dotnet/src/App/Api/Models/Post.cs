using System.ComponentModel.DataAnnotations;

namespace App.Api.Models{

    public class Post
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Title { get; set; }
		[Required]
		public string Content { get; set; }

		[Required]
		public int AuthorId { get; set; }
		public Author Author { get; set; }
	}
    
}