namespace OnlineShop.Modul1.Models
{
    public class Kupac:Korisnik
    {
        public DateTime DatumPrveNarudzbe { get; set; }
        public DateTime DatumPretplate { get; set; }
        public bool isPretplacen { get; set; }
    }
}
