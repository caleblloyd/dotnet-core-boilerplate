namespace App.Api.Models{

    public class Post
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }

		public int AuthorId { get; set; }
		public Author Author { get; set; }
	}
    
}