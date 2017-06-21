using System;
using System.Threading;
using App.Cmd;
using App.Db;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;

namespace App
{
    public class Program
    {

        public static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                while (true)
                {
                    var tryMigrate = 0;
                    try
                    {
                        using (var db = new AppDb())
                            db.Database.Migrate();
                        break;
                    }
                    catch (MySqlException)
                    {
                        if (tryMigrate > 10)
                            throw;
                        Thread.Sleep(TimeSpan.FromSeconds(1));
                    }
                }

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