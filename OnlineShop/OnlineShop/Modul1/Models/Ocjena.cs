using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Ocjena
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public DateTime DatumKreiranja { get; set; }
        public DateTime DatumModifikacije { get; set; }
        [ForeignKey("KupacId")]
        public Kupac Kupac { get; set; }
        public int? KupacId { get; set; }
        [ForeignKey("ProdavnicaId")]
        public Prodavnica Prodavnica { get; set; }
        public int? ProdavnicaId { get; set; }
    }
}
