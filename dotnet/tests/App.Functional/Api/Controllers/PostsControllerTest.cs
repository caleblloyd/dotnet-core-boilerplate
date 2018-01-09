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

    public class PostsControllerTest : IClassFixture<ControllerFixture>
    {
        ControllerFixture _fixture;

        public PostsControllerTest(ControllerFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task TestCrudAsync(){
            
            var controller = new PostsController(_fixture.AppDb);
            int newPostId;

            // create
            {
                var newPost = new Post{
                    Title = "post 1",
                    Content = "first post",
                    AuthorId = _fixture.Author.Id
                };
                var result = await controller.CreateAsync(newPost);
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
                    Title = "title 3",
                    Content = "content 3",
                    AuthorId = _fixture.Author.Id
                };
                var result = await controller.UpdateAsync(newPostId, updatePost);
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var Post = Assert.IsType<Post>(response.Value);
                Assert.Equal(updatePost.Title, Post.Title);
                Assert.Equal(updatePost.Content, Post.Content);
            }
            // list
            {
                var result = await controller.ListAsync();
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var Posts = Assert.IsType<List<Post>>(response.Value);
                var filteredPosts = Posts.Where(m => _fixture.Posts.Exists(n => n.Id == m.Id) || m.Id == newPostId);
                Assert.Equal(4, filteredPosts.Count());
                var i = 3;
                foreach (var Post in filteredPosts){
                    Assert.Equal(Post.Title, $"title {i}");
                    Assert.Equal(Post.Content, $"content {i}");
                    i--;
                }
            }
            // get
            {
                var result = await controller.GetAsync(_fixture.Posts[0].Id);
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var post = Assert.IsType<Post>(response.Value);
                Assert.NotNull(post.Author);
                Assert.Equal(_fixture.Posts[0].Author.Name, post.Author.Name);
            }
            // delete
            {
                var result = await controller.DeleteAsync(newPostId);
                var response = Assert.IsType<OkResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            }
        }

    }

}