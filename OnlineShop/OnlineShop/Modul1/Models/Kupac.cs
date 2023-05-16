using System.ComponentModel.DataAnnotations.Schema;
using OnlineShop.Modul0_Autentifikacija.Models;

namespace OnlineShop.Modul1.Models
{
    [Table("Kupac")]
    public class Kupac : KorisnickiNalog
    {
        public DateTime? DatumPrveNarudzbe { get; set; }
        public DateTime? DatumPretplate { get; set; }
        public bool isPretplacen { get; set; }=false;
        public string? AdresaIsporuke { get; set; }
        public byte[]? SlikaKupca { get; set; }
    } 
    }
