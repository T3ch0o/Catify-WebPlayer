namespace Catify.Data
{
    using Catify.Entities;

    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class CatifyDbContext : IdentityDbContext<ApplicationUser>
    {
        public CatifyDbContext(DbContextOptions<CatifyDbContext> options) : base(options)
        {
        }
    }
}
