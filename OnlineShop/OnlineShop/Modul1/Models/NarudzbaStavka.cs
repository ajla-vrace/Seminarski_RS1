using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class NarudzbaStavka
    {
        public int Id { get; set; }
        public float Cijena { get; set; }
        public int Kolicina { get; set; }
        public float Total { get; set; }
        [ForeignKey("ProizvodId")]
        public Proizvod Proizvod { get; set; }
        public int? ProizvodId { get; set; }
        [ForeignKey("NarudzbaId")]
        public Narudzba Narudzba { get; set; }
        public int? NarudzbaId { get; set; }
    }
}
