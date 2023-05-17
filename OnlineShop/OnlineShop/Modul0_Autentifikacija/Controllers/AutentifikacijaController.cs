using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Helper;
using OnlineShop.Modul0_Autentifikacija.Models;
using OnlineShop.Modul0_Autentifikacija.ViewModels;
using static OnlineShop.Helper.AutentifikacijaAutorizacija.MyAuthTokenExtension;

namespace OnlineShop.Modul0_Autentifikacija.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutentifikacijaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public AutentifikacijaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpGet("kod")]
        public ActionResult GetCode()
        {
            var korisnickiNalog = HttpContext.GetLoginInfo()?.korisnickiNalog;
            if (korisnickiNalog != null)
            {
                var tokenLista = _dbContext.AutentifikacijaToken.Where(x=>x.KorisnickiNalogId==1).AsQueryable().OrderBy(x=>x.KorisnickiNalogId).ToList();
                var token = tokenLista.Count()>0 ? tokenLista[tokenLista.Count() - 1] : null;
                return Ok(token != null ? new { code=token?.twoFcode,jelOtkljucan=token?.jel_otkljucan }  : "");
            }
            return Ok("");
        }


        [HttpGet("{code}")]
        public ActionResult Otkljucaj(string code)
        {
            var korisnickiNalog = HttpContext.GetLoginInfo().korisnickiNalog;

            if (korisnickiNalog == null)
            {
                return BadRequest("korisnik nije logiran.");
            }

            var token = _dbContext.AutentifikacijaToken.FirstOrDefault(x => x.twoFcode == code && x.KorisnickiNalogId== korisnickiNalog.Id);

            if (token != null)
            {
                token.jel_otkljucan = true;
                _dbContext.SaveChanges();
                return Ok();
            }
            return BadRequest("token je null");
        }


        [HttpPost("x")]
        public ActionResult<LoginInformacije> Login([FromBody] LoginVM x)
        {
            //1- provjera logina

            KorisnickiNalog? logiraniKorisnik = _dbContext.KorisnickiNalog
                .FirstOrDefault(k =>
                k.Username != null && k.Username == x.username && k.Lozinka == x.password);

            if (logiraniKorisnik == null)
            {
                //pogresan username i password
                return new LoginInformacije(null);
            }

            //2- generisati random string
            string randomString = TokenGenerator.Generate(10);
            string twoFcode = TokenGenerator.Generate(4);

            //3- dodati novi zapis u tabelu AutentifikacijaToken za logiraniKorisnikId i randomString
            var noviToken = new AutentifikacijaToken()
            {
                ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString()??"",
                vrijednost = randomString,
                korisnickiNalog = logiraniKorisnik,
                vrijemeEvidentiranja = DateTime.Now,
                twoFcode=twoFcode
            };

         

            _dbContext.Add(noviToken);
            _dbContext.SaveChanges();


            EmailLog.UspjesnoLogiranKorisnik(noviToken, Request.HttpContext);

            //4- vratiti token string
            return new LoginInformacije(noviToken);
        }

        [HttpPost]
        public ActionResult Logout()
        {
            AutentifikacijaToken? autentifikacijaToken = HttpContext.GetAuthToken();

            if (autentifikacijaToken == null)
                return Ok();

            _dbContext.Remove(autentifikacijaToken);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public ActionResult<AutentifikacijaToken?> Get()
        {
            AutentifikacijaToken? autentifikacijaToken = HttpContext.GetAuthToken();

            return autentifikacijaToken;
        }
    }
}
