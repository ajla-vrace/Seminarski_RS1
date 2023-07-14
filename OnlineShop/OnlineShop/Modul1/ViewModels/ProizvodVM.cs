namespace OnlineShop.Modul1.ViewModels
{
    public class ProizvodVM
    {
        public int Id { get; set; }
        public int Sifra { get; set; }
        public string Naziv { get; set; }
        public float Cijena { get; set; }
        public string Opis { get; set; }
        public DateTime datum_kreiranja { get; set; }
        public DateTime? datum_modifikacije { get; set; }
        public bool Aktivan { get; set; }

        public int bojaId { get; set; }
        public string bojaOpis { get; set; }

        public int? odjelId { get; set; }
        public string odjelOpis { get; set; }

        public int? kategorijaId { get; set; }
        public string kategorijaOpis { get; set; }

        public int? podkategorijaId { get; set; }
        public string podkategorijaOpis { get; set; }

        public int? kolekcijaId { get; set; }
        public string kolekcijaOpis { get; set; }

        public int? sezonaId { get; set; }
        public string sezonaOpis { get; set; }

        public byte[]? slika_postojeca { get; set; }
        public string? evidentirao { get; set; }
        public string? modifikovao { get; set; }

    }
}
