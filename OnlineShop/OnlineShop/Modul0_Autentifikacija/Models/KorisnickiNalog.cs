using System.ComponentModel.DataAnnotations.Schema;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Modul0_Autentifikacija.Models
{
    public class KorisnickiNalog
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Username { get; set; }

        public string Lozinka { get; set; }
        public string Email { get; set; }
        public string? BrojTelefona { get; set; }
        public DateTime DatumRegistracije { get; set; }
        public bool? isAdmin { get; set; }
        public bool? isZaposlenik { get; set; }
        public bool? isKupac { get; set; }
        [ForeignKey("SpolId")]
        public Spol Spol { get; set; }
        public int? SpolId { get; set; }

    }
}
