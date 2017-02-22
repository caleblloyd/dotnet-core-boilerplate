using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace App.Models{

    public static class BlogMeta{

        public static void OnModelCreating(ModelBuilder modelBuilder){

            modelBuilder.Entity<Blog>(entity => {
                entity.HasMany(m => m.Posts)
                    .WithOne(m => m.Blog)
                    .HasForeignKey(m => m.Blog)
                    .HasPrincipalKey(m => m.Id);
            });

        }

    }
    
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public List<BlogPost> Posts { get; set; }
    }
    
}