using Microsoft.EntityFrameworkCore;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Data
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<Kategorija> Kategorija { get; set; }
        public DbSet<Podkategorija> Podkategorija { get; set; }
        public DbSet<Odjel> Odjel { get; set; }
        public DbSet<Sezona> Sezona { get; set; }
        public DbSet<Kolekcija> Kolekcija { get; set; }

        public DbSet<Boja> Boja { get; set; }
        public DbSet<Proizvod> Proizvod { get; set; }
        public DbSet<SpecijalnaPonuda> SpecijalnaPonuda { get; set; }

        public DbSet<Popust> Popust { get; set; }
        public DbSet<SpecijalnaPonudaProizvod> SpecijalnaPonudaProizvod { get; set; }
        public DbSet<Skladiste> Skladiste { get; set; }
        public DbSet<Grad> Grad { get; set; }
        public DbSet<SkladisteProizvod> SkladisteProizvod { get; set; }

        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}

