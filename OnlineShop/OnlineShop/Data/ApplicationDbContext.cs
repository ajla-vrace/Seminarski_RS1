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
        public DbSet<Korisnik> Korisnik { get; set; }
        public DbSet<Kupac> Kupac { get; set; }
        public DbSet<Zaposlenik> Zaposlenik { get; set; }
        public DbSet<Spol> Spol { get; set; }
        public DbSet<Narudzba> Narudzba { get; set; }
        public DbSet<NarudzbaStavka> NarudzbaStavka { get; set; }
        public DbSet<Korpa> Korpa { get; set; }
        public DbSet<KorpaStavka> KorpaStavka { get; set; }
        public DbSet<Favorit> Favorit { get; set; }
        public DbSet<Ocjena> Ocjena { get; set; }
        public DbSet<Komentar> Komentar { get; set; }
        public DbSet<Zvjezdica> Zvjezdica { get; set; }
        public DbSet<Prodavnica> Prodavnica { get; set; }
        
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}

