using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Api.Controllers;
using App.Api.Models;
using App.Common.Db;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace App.Functional.Api.Controllers{

    public class PostsControllerTest : IClassFixture<ControllerFixture<PostsController>>
    {
        ControllerFixture<PostsController> _fixture;

        public PostsControllerTest(ControllerFixture<PostsController> fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task TestCreateUpdateDelete(){
            int newPostId;

            // create
            {
                var newPost = new Post{
                    Title = "post 1",
                    Content = "first post",
                    AuthorId = _fixture.Author.Id
                };
                var result = await _fixture.Controller.CreateAsync(newPost);
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var post = Assert.IsType<Post>(response.Value);
                Assert.Equal(newPost.Title, post.Title);
                Assert.Equal(newPost.Content, post.Content);
                Assert.Equal(_fixture.Author.Id, post.AuthorId);
                Assert.True(newPost.Id > 0);
                newPostId = newPost.Id;
            }
            // update
            {
                var updatePost = new Post{
                    Title = "post 2",
                    Content = "second post",
                    AuthorId = _fixture.Author.Id
                };
                var result = await _fixture.Controller.UpdateAsync(newPostId, updatePost);
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var Post = Assert.IsType<Post>(response.Value);
                Assert.Equal(updatePost.Title, Post.Title);
                Assert.Equal(updatePost.Content, Post.Content);
            }
            // delete
            {
                var result = await _fixture.Controller.DeleteAsync(newPostId);
                var response = Assert.IsType<OkResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            }
        }

        [Fact]
        public async Task TestList()
        {
            var result = await _fixture.Controller.ListAsync();
            var response = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            var Posts = Assert.IsType<List<Post>>(response.Value);
            var filteredPosts = Posts.Where(m => _fixture.Posts.Exists(n => n.Id == m.Id));
            Assert.Equal(3, filteredPosts.Count());
            var i = 2;
            foreach (var Post in filteredPosts){
                Assert.Equal($"title {i}", Post.Title);
                Assert.Equal($"content {i}", Post.Content);
                i--;
            }
        }

        [Fact]
        public async Task TestGet()
        {
            var result = await _fixture.Controller.GetAsync(_fixture.Posts[0].Id);
            var response = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            var post = Assert.IsType<Post>(response.Value);
            Assert.NotNull(post.Author);
            Assert.Equal(_fixture.Posts[0].Author.Name, post.Author.Name);
        }

    }

}