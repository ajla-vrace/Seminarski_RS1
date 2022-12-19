using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    [Table("Kupac")]
    public class Kupac : Korisnik
    {
        public DateTime? DatumPrveNarudzbe { get; set; }
        public DateTime? DatumPretplate { get; set; }
        public bool isPretplacen { get; set; }
        public string? AdresaIsporuke { get; set; }
    } 
    }
