using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class ProizvodSlika
    {
        public int Id { get; set; }

        //mozemo dodati neki opisSlike?
         
        [ForeignKey("proizvodId")]
        public int? proizvodId { get; set; }
        public Proizvod proizvod { get; set; }
    }
}
