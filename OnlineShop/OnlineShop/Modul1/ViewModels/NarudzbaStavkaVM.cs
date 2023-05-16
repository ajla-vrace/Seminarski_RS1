using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.ViewModels
{
    public class NarudzbaStavkaVM
    {
        public int Id { get; set; }
        public float Cijena { get; set; }
        public int Kolicina { get; set; }
        public float Total { get; set; }
        //public Proizvod Proizvod { get; set; }
        public int? ProizvodId { get; set; }
        public string? ProizvodNaziv { get; set; }
        public int? NarudzbaId { get; set; }
        public int? SifraProizvoda { get; set; }
    }
}
