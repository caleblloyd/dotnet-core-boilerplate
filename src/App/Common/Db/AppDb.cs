using System;
using App.Config;
using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace App.Db{
    
    public class AppDb : DbContext{
        
        public DbSet<Blog> Blogs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
            optionsBuilder.UseMySql(AppConfig.Config["Data:MySql:ConnectionString"],
                options => options.MaxBatchSize(Convert.ToInt32(AppConfig.Config["Data:EntityFramework:MaxBatchSize"])));
		    optionsBuilder.UseLoggerFactory(new LoggerFactory().AddConsole(AppConfig.Config.GetSection("Logging")));
		}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// Add model fluent APIs
			BlogMeta.OnModelCreating(modelBuilder);
		}


    }

}