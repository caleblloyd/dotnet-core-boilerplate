using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace App.Config{

    public static class AppConfig{

        // directories
        private static Lazy<string> LazyBaseDir = new Lazy<string>(() => {
            var dir = Directory.GetCurrentDirectory();
            while (!File.Exists(Path.Combine(dir, "Common", "Config", "config.json")))
            {
                var nextDir = Directory.Exists(Path.Combine(dir, "App")) ? Path.Combine(dir, "App") : new DirectoryInfo(dir).Parent?.FullName;
                if (nextDir == null)
                    throw new InvalidOperationException("Could not find App/Common/Config/config.json");
                dir = nextDir;
            }
            return dir;
        });

        public static string BaseDir => LazyBaseDir.Value;

        public static string DataDir => Path.Combine(BaseDir, "Data");
        
        // environment variables
        public static readonly string DevEnv = Environment.GetEnvironmentVariable("DEVENV") ?? "local";

        // configuration from JSON files
        public static IConfigurationRoot Config => LazyConfig.Value;

        private static Lazy<IConfigurationRoot> LazyConfig = new Lazy<IConfigurationRoot>(() => {
            return new ConfigurationBuilder()
                .SetBasePath(BaseDir)
                .AddJsonFile(Path.Combine("common", "config", "config.json"), true, true)
                .AddJsonFile(Path.Combine("common", "config", $"config.{DevEnv}.json"), true)
                .Build();
        });
        
    }
}