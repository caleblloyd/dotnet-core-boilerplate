using System;
using System.Threading;
using App.Cmd;
using App.Common.Db;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;

namespace App.Common
{
    public class Program
    {

        public static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                var tryMigrate = 0;
                while (true)
                {
                    try
                    {
                        Console.WriteLine($"Migration attempt {tryMigrate + 1}/3");
                        using (var dbScope = new AppDbScope())
                            dbScope.AppDb.Database.Migrate();
                        Console.WriteLine("Migration complete");
                        break;
                    }
                    catch (MySqlException e)
                    {
                        Console.WriteLine("Migration failed");
                        Console.WriteLine(e.Message);
                        if (tryMigrate >= 2)
                            throw;
                        Console.WriteLine("Trying again in 3 seconds");
                        Thread.Sleep(TimeSpan.FromSeconds(3));
                    }
                    tryMigrate++;
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