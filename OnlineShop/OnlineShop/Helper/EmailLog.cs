using OnlineShop.Modul0_Autentifikacija.Models;

namespace OnlineShop.Helper
{
    public class EmailLog
    {
        public static void UspjesnoLogiranKorisnik(AutentifikacijaToken token, HttpContext httpContext)
        {
            if (token.korisnickiNalog.isAdmin==true)
            {
                var poruka = $"Postovani {token.korisnickiNalog.Username}, <br>"+
                    $"Code za two factor auth je: {token.twoFcode} <br>" + $"{DateTime.Now}";
                PosaljiMail.Posalji(token.korisnickiNalog.Email, "Code za prijavu na racun", poruka, true);
            }
        }
    }
}
