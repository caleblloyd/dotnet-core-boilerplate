using System;
using App.Cmd;
using Microsoft.AspNetCore.Hosting;

namespace App
{
    public class Program
    {

        public static void Main(string[] args)
        {
            if (args.Length == 0)
            {
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