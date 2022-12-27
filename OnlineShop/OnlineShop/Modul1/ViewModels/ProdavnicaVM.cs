namespace OnlineShop.Modul1.ViewModels
{
    public class ProdavnicaVM
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Adresa { get; set; }
        public string? Povrsina { get; set; }
        public string? BrojTelefona { get; set; }        
        public int? gradId { get; set; }
       
    }
}
