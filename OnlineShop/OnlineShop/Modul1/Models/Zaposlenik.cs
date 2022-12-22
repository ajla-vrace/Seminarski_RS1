using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    [Table("Zaposlenik")]
    public class Zaposlenik:Korisnik
    {
        public DateTime DatumZaposlenja { get; set; }
        public DateTime? DatumOtkaza { get; set; }
        public string AdresaStanovanja { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string JMBG { get; set; }
        [ForeignKey("ProdavnicaId")]
        public Prodavnica Prodavnica { get; set; }
        public int? ProdavnicaId { get; set; }

    }
}
