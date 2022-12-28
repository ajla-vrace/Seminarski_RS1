using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Zvjezdica
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public DateTime DatumKreiranja { get; set; }
        [ForeignKey("KupacId")]
        public Kupac Kupac { get; set; }
        public int? KupacId { get; set; }
        [ForeignKey("ProizvodId")]
        public Proizvod Proizvod { get; set; }
        public int? ProizvodId { get; set; }
    }
}
