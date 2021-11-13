using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using Dapper.FluentMap;
using Dapper.FluentMap.Dommel;
using Done2X.Data;
using Done2X.Data.EntityMap;
using Done2X.Data.IMangerInterfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace Done2X.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Security Stuff from Auth0
            string domain = $"https://{Configuration["Auth0:Domain"]}/";
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = domain;
                options.Audience = Configuration["Auth0:ApiIdentifier"];
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = ClaimTypes.NameIdentifier
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("read:messages", policy => policy.Requirements.Add(new HasScopeRequirement("read:messages", domain)));
            });

            // register the scope authorization handler
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

            //Add Injection
            var connectionString = Configuration.GetConnectionString("Done2X");

            //TODO should this be here
            //TODO move this somewhere else to much noise in here, it should be in Data
            FluentMapper.Initialize(config =>
            {
                config.AddMap(new TaskItemMap());
                config.AddMap(new TaskItemStatusMap());
                config.AddMap(new GoalMap());
                config.AddMap(new ProjectMap());
                config.ForDommel();
            });

            //TODO what should we do here singleton or scoped?
            //services.AddSingleton<IDomainManager>(x => new DomainManager(connectionString));
            services.AddScoped<IDomainManager>(x => new DomainManager(connectionString));

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
            builder => builder.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Done2X.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Done2X.API v1"));
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
