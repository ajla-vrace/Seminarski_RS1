using System.ComponentModel.DataAnnotations.Schema;
using OnlineShop.Modul0_Autentifikacija.Models;

namespace OnlineShop.Modul1.Models
{
    [Table("Zaposlenik")]
    public class Zaposlenik:KorisnickiNalog
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
