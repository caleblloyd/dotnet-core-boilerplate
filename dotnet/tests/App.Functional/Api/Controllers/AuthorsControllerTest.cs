using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Api.Controllers;
using App.Api.Models;
using App.Db;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace App.Functional.Api.Controllers{

    public class AuthorsControllerTest : IClassFixture<ControllerFixture>
    {
        ControllerFixture _fixture;

        public AuthorsControllerTest(ControllerFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task TestCrudAsync(){
            
            var controller = new AuthorsController(new AppDb());
            int newAuthorId;

            // create
            {
                var newAuthor = new Author{
                    Name = "test"
                };
                var result = await controller.CreateAsync(newAuthor);
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
                    Name = "author 1"
                };
                var result = await controller.UpdateAsync(newAuthorId, updateAuthor);
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var author = Assert.IsType<Author>(response.Value);
                Assert.Equal(updateAuthor.Name, author.Name);
            }
            // list
            {
                var result = await controller.ListAsync();
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var authors = Assert.IsType<List<Author>>(response.Value);
                var filteredAuthors = authors.Where(m => m.Id == _fixture.Author.Id || m.Id == newAuthorId);
                Assert.Equal(2, filteredAuthors.Count());
                var i = 0;
                foreach (var author in filteredAuthors){
                    Assert.Equal(author.Name, $"author {i}");
                    i++;
                }
            }
            // get
            {
                var result = await controller.GetAsync(_fixture.Author.Id);
                var response = Assert.IsType<OkObjectResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
                var author = Assert.IsType<Author>(response.Value);
                Assert.NotNull(author.Posts);
                var i = author.Posts.Count - 1;
                foreach (var post in author.Posts){
                    Assert.Equal(post.Title, $"title {i}");
                    i--;
                }
            }
            // delete
            {
                var result = await controller.DeleteAsync(newAuthorId);
                var response = Assert.IsType<OkResult>(result);
                Assert.Equal(StatusCodes.Status200OK, response.StatusCode);
            }
        }

    }

}