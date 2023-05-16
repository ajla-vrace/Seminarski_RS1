using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Kolekcija
    {
        public int Id { get; set; }
        public string Naziv { get; set; }    
        public string Godina { get; set; }
        public bool? Aktivna { get; set; }

        [ForeignKey("sezonaId")]
        public int? sezonaId { get; set; }
        public Sezona sezona { get; set; }
    }
}
