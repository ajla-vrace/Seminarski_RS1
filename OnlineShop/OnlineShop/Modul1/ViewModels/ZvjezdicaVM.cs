using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.ViewModels
{
    public class ZvjezdicaVM
    {
        public int Id { get; set; }
        public int OcjenaBrojcano { get; set; }
        public DateTime DatumKreiranja { get; set; }
        public int? KupacId { get; set; }
        public int? ProizvodId { get; set; }
    }
}
