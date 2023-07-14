using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Prodavnica
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Adresa { get; set; }
        public string BrojTelefona { get; set; }
        public string Povrsina { get; set; }

        [ForeignKey("gradId")]
        public int? gradId { get; set; }
        public Grad grad { get; set; }

        [ForeignKey("skladisteId")]
        public int? skladisteId { get; set; }
        public Skladiste skladiste { get; set; }

    }
}
