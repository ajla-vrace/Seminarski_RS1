using OnlineShop.Modul1.Models;

namespace OnlineShop.Modul1.ViewModels
{
    public class KupacVM
    {

        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Username { get; set; }
        public string Lozinka { get; set; }
        public string Email { get; set; }
        public string BrojTelefona { get; set; }
        public DateTime DatumRegistracije { get; set; }
        public bool? isKupac { get; set; }
        
        public int? SpolId { get; set; }
        public Spol? Spol { get; set; }
        public string? spolOpis { get; set; }
        public DateTime? DatumPrveNarudzbe { get; set; }
        public DateTime? DatumPretplate { get; set; }
        public bool isPretplacen { get; set; }=false;
        public string? AdresaIsporuke { get; set; }
    }
}
