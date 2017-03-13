using System;
using App.Cmd;
using App.Db;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace App
{
    public class Program
    {

        public static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                using (var db = new AppDb())
                    db.Database.Migrate();

	            var host = new WebHostBuilder()
                    .UseUrls("http://*:5000")
                    .UseKestrel()
                    .UseStartup<Startup>()
                    .Build();
                host.Run();
            }
            else
            {
                Environment.Exit(CommandRunner.Run(args));
            }
        }

    }
}