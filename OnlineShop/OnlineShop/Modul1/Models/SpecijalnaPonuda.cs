namespace OnlineShop.Modul1.Models
{
    public class SpecijalnaPonuda
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public DateTime datum_pocetka { get; set; }
        public DateTime datum_zavrsetka { get; set; }
    }
}
