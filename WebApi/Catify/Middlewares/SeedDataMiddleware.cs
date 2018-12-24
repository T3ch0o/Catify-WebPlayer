namespace Catify.Middlewares
{
    using System.Threading.Tasks;

    using Catify.Data;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;

    public class SeedDataMiddleware
    {
        private readonly RequestDelegate _next;

        public SeedDataMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, CatifyDbContext db, RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                await roleManager.CreateAsync(new IdentityRole("Administrator"));
            }

            await _next(context);
        }
    }
}
