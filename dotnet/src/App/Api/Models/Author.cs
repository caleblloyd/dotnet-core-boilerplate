using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations;

namespace App.Api.Models {

    public static class AuthorMeta{

        public static void OnModelCreating(ModelBuilder modelBuilder){

            modelBuilder.Entity<Author>(entity => {
                entity.HasMany(m => m.Posts)
                    .WithOne(m => m.Author)
                    .HasForeignKey(m => m.AuthorId)
                    .HasPrincipalKey(m => m.Id)
                    .OnDelete(DeleteBehavior.Restrict);
            });

        }

    }
    
    public class Author
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<Post> Posts { get; set; }
        private bool _showPosts = false;
        public void ShowPosts() {
            _showPosts = true;
        }
        public bool ShouldSerializePosts() => _showPosts;

    }
    
}