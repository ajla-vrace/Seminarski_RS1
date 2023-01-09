using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Korpa
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime datum_kreiranja { get; set; }
        public DateTime datum_modifikacije { get; set; }
        public int UkupnoProizvoda { get; set; }
        public float Total { get; set; }

        [ForeignKey("KupacId")]
        public Kupac Kupac { get; set; }
        public int? KupacId { get; set; }

    }
}
