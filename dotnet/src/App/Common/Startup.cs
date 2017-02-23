using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using App.Config;
using Newtonsoft.Json.Converters;
using App.Db;

namespace App
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            Configuration = AppConfig.Config;
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // MVC Options
            services
                .AddMvc()
                .AddJsonOptions(options => {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());
                    options.SerializerSettings.Formatting = Formatting.Indented;
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Include;
                    options.SerializerSettings.MissingMemberHandling = MissingMemberHandling.Ignore;
                });

            // Other Options
            services
                .AddEntityFrameworkMySql()
                .AddDbContext<AppDb>(ServiceLifetime.Scoped);

            // Add CORS if enabled
            if (AppConfig.Config["Frontend:CORS:Host"] != null){
                services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder.WithOrigins(AppConfig.Config["Frontend:CORS:Host"])
                            .AllowCredentials()
                            .AllowAnyHeader()
                            .AllowAnyMethod());
                });
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));

            if (AppConfig.Config["Frontend:CORS:Host"] != null){
                app.UseCors("CorsPolicy");
            }

            app.UseStatusCodePages();
            app.UseMvc();
        }
    }
}
