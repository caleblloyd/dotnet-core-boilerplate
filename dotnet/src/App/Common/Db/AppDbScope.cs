using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using System.Data.Common;
using App.Common;
using App.Common.Config;
using App.Common.Db;
using Microsoft.AspNetCore.Mvc;

namespace App.Common.Db
{
    public class AppDbScope : IDisposable
    {
        private static Lazy<ServiceProvider> DefaultLazyServiceProvider = new Lazy<ServiceProvider>(() => {
            var serviceCollection = new ServiceCollection();
            serviceCollection
                .AddLogging();
            Startup.ConfigureEntityFramework(serviceCollection);

            var serviceProvider = serviceCollection.BuildServiceProvider();
            serviceProvider
                .GetService<ILoggerFactory>()
                .AddConsole(AppConfig.Config.GetSection("Logging"));
            
            return serviceProvider;
        });

        private IServiceScope _scope;

        public AppDbScope()
        {
            var serviceProvider = DefaultLazyServiceProvider.Value;
            _scope = serviceProvider.CreateScope();
        }

        public AppDb AppDb => _scope.ServiceProvider.GetService<AppDb>();

        public void Dispose()
        {
            if (_scope != null)
            {
                _scope.Dispose();
                _scope = null;
            }
        }
    }
}
