using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Proizvod
    {
        public int Id { get; set; } 
        public int Sifra { get; set; }
        public string Naziv { get; set; }
        public float Cijena { get; set; }
        public string Opis { get; set; }
        public DateTime datum_kreiranja { get; set; }
        public DateTime? datum_modifikacije { get; set; }
        public bool Aktivan { get; set; }

        public byte[]? slika_postojeca { get; set; }

        public string? evidentirao { get; set; }
        public string? modifikovao { get; set; }

        public bool? isSpecijalna { get; set; } = false;

        [ForeignKey("bojaId")]
        public int bojaId { get; set; }
        public Boja boja { get; set; }

        [ForeignKey("odjelId")]
        public int? odjelId { get; set; }
        public Odjel odjel { get; set; }

        [ForeignKey("kategorijaId")]
        public int? kategorijaId { get; set; }
        public Kategorija kategorija { get; set; }

        [ForeignKey("podkategorijaId")]
        public int? podkategorijaId { get; set; }
        public Podkategorija podkategorija { get; set; }

        [ForeignKey("kolekcijaId")]
        public int? kolekcijaId { get; set; }
        public Kolekcija kolekcija { get; set; }

        [ForeignKey("sezonaId")]
        public int? sezonaId { get; set; }
        public Sezona sezona { get; set; }

        

    }
}
