using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class KorpaStavka
    {
        public int Id { get; set; }
        public float Cijena { get; set; }
        public int Kolicina { get; set; }
        public string Velicina { get; set; }
        public float Total { get; set; }
        [ForeignKey("ProizvodId")]
        public Proizvod Proizvod { get; set; }
        public int? ProizvodId { get; set; }
        [ForeignKey("KorpaId")]
        public Korpa Korpa { get; set; }
        public int? KorpaId { get; set; }
        public bool Aktivan { get; set; }
    }
}
