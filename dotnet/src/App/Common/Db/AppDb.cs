using System;
using App.Common.Config;
using App.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace App.Common.Db
{
    
    public class AppDb : IdentityDbContext<AppIdentityUser>
	{

		public AppDb(DbContextOptions options) : base(options)
		{
		}
        
        public DbSet<Author> Authors { get; set; }

        public DbSet<Post> Posts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
            base.OnModelCreating(modelBuilder);

			// Add model fluent APIs
			AuthorMeta.OnModelCreating(modelBuilder);

			// Shorten key length for Identity
			modelBuilder.Entity<AppIdentityUser>(entity => {
				entity.Property(m => m.Email).HasMaxLength(127);
				entity.Property(m => m.NormalizedEmail).HasMaxLength(127);
				entity.Property(m => m.NormalizedUserName).HasMaxLength(127);
				entity.Property(m => m.UserName).HasMaxLength(127);
			});
			modelBuilder.Entity<IdentityRole>(entity => {
				entity.Property(m => m.Name).HasMaxLength(127);
				entity.Property(m => m.NormalizedName).HasMaxLength(127);
			});
			modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
			{
				entity.Property(m => m.LoginProvider).HasMaxLength(127);
				entity.Property(m => m.ProviderKey).HasMaxLength(127);
			});
			modelBuilder.Entity<IdentityUserRole<string>>(entity =>
			{
				entity.Property(m => m.UserId).HasMaxLength(127);
				entity.Property(m => m.RoleId).HasMaxLength(127);
			});
			modelBuilder.Entity<IdentityUserToken<string>>(entity =>
			{
				entity.Property(m => m.UserId).HasMaxLength(127);
				entity.Property(m => m.LoginProvider).HasMaxLength(127);
				entity.Property(m => m.Name).HasMaxLength(127);
			});
		}

    }

}
