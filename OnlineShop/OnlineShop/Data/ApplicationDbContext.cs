using Microsoft.EntityFrameworkCore;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Data
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<Kategorija> Kategorija { get; set; }
        public DbSet<Podkategorija> Podkategorija { get; set; }
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}

