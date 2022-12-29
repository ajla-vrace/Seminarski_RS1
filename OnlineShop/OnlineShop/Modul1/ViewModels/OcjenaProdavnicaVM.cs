using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.ViewModels
{
    public class OcjenaProdavnicaVM
    {
        public int Id { get; set; }
        public int Ocjena { get; set; }
        public DateTime DatumKreiranja { get; set; }
        public int? KupacId { get; set; }
        public int? ProdavnicaId { get; set; }
    }
}
