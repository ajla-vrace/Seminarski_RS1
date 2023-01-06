namespace OnlineShop.Modul1.ViewModels
{
    public class KorpaVM
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public DateTime datum_kreiranja { get; set; }
        public DateTime datum_modifikacije { get; set; }
        public int UkupnoProizvoda { get; set; }
        public float Total { get; set; }
        public int? KupacId { get; set; }
    }
}
