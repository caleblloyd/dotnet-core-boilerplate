using System;
using System.Collections.Generic;
using App.Api.Models;
using App.Common.Db;

namespace App.Functional.Api.Controllers{

    public class ControllerFixture : IDisposable
    {

        private AppDbScope _dbScope = new AppDbScope();

        public AppDb AppDb => _dbScope.AppDb;
        
        public readonly Author Author;
        public readonly List<Post> Posts = new List<Post>();

        public ControllerFixture()
        {
            Author = new Author{
                Name = "author 0"
            };
            AppDb.Authors.Add(Author);
            for (var i=0; i<3; i++){
                var post = new Post{
                    Author = Author,
                    Title = $"title {i}",
                    Content = $"content {i}",
                };
                Posts.Add(post);
                AppDb.Posts.Add(post);
            }
            AppDb.SaveChanges();
        }

        public void Dispose()
        {
            if (_dbScope != null)
            {
                AppDb.Posts.RemoveRange(Posts);
                AppDb.Authors.Remove(Author);
                AppDb.SaveChanges();
                _dbScope.Dispose();
                _dbScope = null;
            }
        }
    }

}
