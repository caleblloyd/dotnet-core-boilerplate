using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Reflection;

namespace App.Common.Config{

    public static class AppConfig{

        // directories
        private static Lazy<string> LazyBaseDir = new Lazy<string>(() => Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));

        public static string BaseDir => LazyBaseDir.Value;

        public static string DataDir => Path.Combine(BaseDir, "Data");
        
        // environment variables
        public static readonly string DevEnv = Environment.GetEnvironmentVariable("DEVENV") ?? "local";

        // configuration from JSON files
        public static IConfigurationRoot Config => LazyConfig.Value;

        private static Lazy<IConfigurationRoot> LazyConfig = new Lazy<IConfigurationRoot>(() => {
            return new ConfigurationBuilder()
                .SetBasePath(BaseDir)
                .AddJsonFile(Path.Combine("Config", "config.json"), true, true)
                .AddJsonFile(Path.Combine("Config", $"config.{DevEnv}.json"), true)
                .Build();
        });

        public static string ConnectionString => LazyConnectionString.Value;

        private static Lazy<string> LazyConnectionString = new Lazy<string>(() => {
            var section = AppConfig.Config.GetSection("Data:Postgres:Connection");
            var connectionString = "";
            foreach (var child in section.GetChildren()){
                string key, value;
                if (child.Key.EndsWith("_file")){
                    key = child.Key.Substring(0, child.Key.Length - "_file".Length).TrimEnd();
                    value = File.ReadAllText(child.Value);
                } else {
                    key = child.Key;
                    value = child.Value;
                }
                connectionString += $"{key}={value};";
            }
            return connectionString;
        });
        
    }
}
