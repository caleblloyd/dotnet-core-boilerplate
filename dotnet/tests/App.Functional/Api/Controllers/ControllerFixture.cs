using System;
using System.Collections.Generic;
using App.Api.Models;
using App.Db;

namespace App.Functional.Api.Controllers{

    public class ControllerFixture : IDisposable
    {

        private readonly AppDb _db = new AppDb();

        public readonly Author Author;
        public readonly List<Post> Posts = new List<Post>();

        public ControllerFixture()
        {
            Author = new Author{
                Name = "author 0"
            };
            _db.Authors.Add(Author);
            for (var i=0; i<3; i++){
                var post = new Post{
                    Author = Author,
                    Title = $"title {i}",
                    Content = $"content {i}",
                };
                Posts.Add(post);
                _db.Posts.Add(post);
            }
            _db.SaveChanges();
        }

        public void Dispose()
        {
            _db.Posts.RemoveRange(Posts);
            _db.Authors.Remove(Author);
            _db.SaveChanges();
        }
    }

}