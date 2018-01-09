using App.Api.Models;
using App.Common.Db;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace App.Functional.Api.Controllers{

    public class ControllerFixture<T> : IDisposable where T : Controller
    {
        private AppDbScope _initDbScope;
        private AppDb _initDb;
        private AppDbScope _controllerDbScope;
        private AppDb _controllerDb;
        private T _controller;

        public T Controller => _controller;
        public readonly Author Author;
        public readonly List<Post> Posts = new List<Post>();

        public ControllerFixture()
        {
            _initDbScope = new AppDbScope();
            _initDb = _initDbScope.AppDb;
            _controllerDbScope = new AppDbScope();
            _controllerDb = _controllerDbScope.AppDb;
            _controller = (T)Activator.CreateInstance(typeof(T), _controllerDb);

            Author = new Author{
                Name = "author 0"
            };
            _initDb.Authors.Add(Author);
            for (var i=0; i<3; i++){
                var post = new Post{
                    Author = Author,
                    Title = $"title {i}",
                    Content = $"content {i}",
                };
                Posts.Add(post);
                _initDb.Posts.Add(post);
            }
            _initDb.SaveChanges();
        }

        public void Dispose()
        {
            if (_controllerDb != null){
                _controllerDb.Dispose();
                _controllerDb = null;
            }
            if (_controllerDbScope != null){
                _controllerDbScope.Dispose();
                _controllerDbScope = null;
            }
            if (_controller != null){
                _controller.Dispose();
                _controller = null;
            }
            if (_initDb != null){
                _initDb.Posts.RemoveRange(Posts);
                _initDb.Authors.Remove(Author);
                _initDb.SaveChanges();
                _initDb.Dispose();
                _initDb = null;
            }
            if (_initDbScope != null)
            {
                _initDbScope.Dispose();
                _initDbScope = null;
            }
        }
    }

}
