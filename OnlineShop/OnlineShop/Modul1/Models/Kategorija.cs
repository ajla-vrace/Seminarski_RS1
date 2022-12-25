namespace OnlineShop.Modul1.Models
{
    public class Kategorija
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public DateTime datum_kreiranja { get; set; }
        public DateTime? datum_modifikacije { get; set; }
    }
}
