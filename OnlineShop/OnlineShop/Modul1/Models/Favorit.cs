using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Favorit
    {
        public int Id { get; set; }
        public DateTime datum_kreiranja { get; set; }
        [ForeignKey("KupacId")]
        public Kupac Kupac { get; set; }
        public int? KupacId { get; set; }
        [ForeignKey("ProizvodId")]
        public Proizvod Proizvod { get; set; }
        public int? ProizvodId { get; set; }
    }
}
