using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.ViewModels
{
    public class FavoritVM
    {
        public int Id { get; set; }
        public DateTime datum_kreiranja { get; set; }
        public int? KupacId { get; set; }
        public int? ProizvodId { get; set; }
    }
}
