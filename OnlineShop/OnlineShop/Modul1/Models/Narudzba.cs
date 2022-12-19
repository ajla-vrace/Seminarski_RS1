using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Narudzba
    {
        public int Id { get; set; }
        public DateTime DatumKreiranja { get; set; }
        public DateTime DatumPreuzimanja { get; set; }
        public float Ukupno { get; set; }
        public int UkupnoProizvoda { get; set; }
        public string Status { get; set; }
        [ForeignKey("KupacId")]
        public Kupac Kupac { get; set; }
        public int? KupacId { get; set; }
    }
}
