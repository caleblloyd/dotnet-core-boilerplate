using System;
using App.Common.Config;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Logging;

namespace App.Common.Db
{
    
    public class AppDbDesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDb>
	{
        public AppDb CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDb>();
			optionsBuilder.UseNpgsql(AppConfig.ConnectionString);
			return new AppDb(optionsBuilder.Options);
        }
    }

}
