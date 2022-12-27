using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.ViewModels
{
    public class KomentarAddVM
    {
        public int Id { get; set; }
        public string Opis { get; set; }
        public DateTime DatumKreiranja { get; set; }
        public DateTime? DatumModifikacije { get; set; }
        public int? KupacId { get; set; }
        public int? ProdavnicaId { get; set; }

        
    }
}
