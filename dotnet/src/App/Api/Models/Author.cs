using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;

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
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Post> Posts { get; set; }
    }
    
}