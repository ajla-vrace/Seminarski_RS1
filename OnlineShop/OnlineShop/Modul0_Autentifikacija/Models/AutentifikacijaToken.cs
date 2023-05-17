using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Modul0_Autentifikacija.Models
{
    public class AutentifikacijaToken
    {

        [Key]
        public int id { get; set; }
        public string vrijednost { get; set; }
        [ForeignKey(nameof(korisnickiNalog))]
        public int KorisnickiNalogId { get; set; }
        public KorisnickiNalog korisnickiNalog { get; set; }
        public DateTime vrijemeEvidentiranja { get; set; }
        public string ipAdresa { get; set; }
        public string twoFcode { get; set; }  //dva nova polja
        public bool jel_otkljucan { get; set; }
    }
}
