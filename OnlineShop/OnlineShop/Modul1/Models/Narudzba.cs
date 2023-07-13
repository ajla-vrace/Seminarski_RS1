using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Narudzba
    {
        public int Id { get; set; }
        public DateTime DatumKreiranja { get; set; }
        public DateTime? DatumPreuzimanja { get; set; }
        public float? Ukupno { get; set; }
        public int? UkupnoProizvoda { get; set; }
        public string Status { get; set; } = "Nova";
        [ForeignKey("KupacId")]
        public Kupac Kupac { get; set; }
        public int? KupacId { get; set; }
        [ForeignKey("ProdavnicaId")]
        public Prodavnica Prodavnica { get; set; }
        public int? ProdavnicaId { get; set; }
        public string? Evidentirao { get; set; }
       
        public bool jel_promijenjen_status { get; set; } = false;
        public bool jel_poslana_prouka { get; set; } = false;

        public string? PrethodniStatus { get; set; }
        public bool? jel_kliknuo_otkazana { get; set; }
        //public string? PromijenioStatus { get; set; }
        //public string? PoslaoPoruku { get; set; }

    }
}
