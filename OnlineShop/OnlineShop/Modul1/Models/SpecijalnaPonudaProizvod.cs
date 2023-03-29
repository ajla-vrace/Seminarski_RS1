using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class SpecijalnaPonudaProizvod
    {
        public int Id { get; set; }
        [ForeignKey("specijalnaPonudaId")]
        public int? specijalnaPonudaId { get; set; }
        public SpecijalnaPonuda specijalnaPonuda { get; set; }

        [ForeignKey("proizvodId")]
        public int? proizvodId { get; set; }
        public Proizvod proizvod { get; set; }

        [ForeignKey("popustId")]
        public int? popustId { get; set; }
        public Popust popust { get; set; }

        public float? CijenaSaPopustom { get; set; }
            /*{ get { return proizvod.Cijena - (proizvod.Cijena * popust.Opis); } }*/

    }
}
