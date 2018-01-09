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

    public class AuthorsControllerTest : IClassFixture<ControllerFixture<AuthorsController>>
    {
        ControllerFixture<AuthorsController> _fixture;

        public AuthorsControllerTest(ControllerFixture<AuthorsController> fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task TestCreateUpdateDelete(){
            int newAuthorId;

            // create
            {
                var newAuthor = new Author{
                    Name = "test"
                };
                var result = await _fixture.Controller.CreateAsync(newAuthor);
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var author = Assert.IsType<Author>(response.Value);
                Assert.Equal(newAuthor.Name, author.Name);
                Assert.True(newAuthor.Id > 0);
                newAuthorId = newAuthor.Id;
            }
            // update
            {
                var updateAuthor = new Author{
                    Name = "test 2"
                };
                var result = await _fixture.Controller.UpdateAsync(newAuthorId, updateAuthor);
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var author = Assert.IsType<Author>(response.Value);
                Assert.Equal(updateAuthor.Name, author.Name);
            }
            // delete
            {
                var result = await _fixture.Controller.DeleteAsync(newAuthorId);
                var response = Assert.IsType<OkResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            }
        }

        [Fact]
        public async Task TestList(){            
            var result = await _fixture.Controller.ListAsync();
            var response = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            var authors = Assert.IsType<List<Author>>(response.Value);
            var filteredAuthors = authors.Where(m => m.Id == _fixture.Author.Id);
            Assert.Equal(1, filteredAuthors.Count());
            var i = 0;
            foreach (var author in filteredAuthors){
                Assert.Equal($"author {i}", author.Name);
                i++;
            }
        }
        
        [Fact]
        public async Task TestGet(){
            var result = await _fixture.Controller.GetAsync(_fixture.Author.Id);
            var response = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            var author = Assert.IsType<Author>(response.Value);
            Assert.NotNull(author.Posts);
            var i = author.Posts.Count - 1;
            foreach (var post in author.Posts){
                Assert.Equal($"title {i}", post.Title);
                i--;
            }
        }

    }

}