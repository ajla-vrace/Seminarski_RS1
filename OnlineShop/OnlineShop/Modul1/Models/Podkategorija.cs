using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Podkategorija
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public DateTime datum_kreiranja { get; set; }
        public DateTime datum_modifikacije { get; set; }
        [ForeignKey("KategorijaId")]
        public Kategorija Kategorija { get; set; }
        public int? KategorijaId { get; set; }

    }
}
