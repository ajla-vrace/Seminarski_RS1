using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Data;
using OnlineShop.Helper;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmailPretplata : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmailPretplata(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult Pretplata(string email)
        {
            var kupac = _context.Kupac.FirstOrDefault(k => k.Email == email);
            if (kupac != null)
            {
                kupac.isPretplacen = true;
                kupac.DatumPretplate = DateTime.Now;
                _context.SaveChanges();

                EmailSender.UspjesnaPretplata(email);

                return Ok("Uspjesna pretplata - poruka.");
            }
            else
            {
                EmailSender.UspjesnaPretplata(email);
                return Ok("Email nije pronadjen.");
            }
        }


        [HttpPost]
        public IActionResult ObavjestOSpecijalnimPonudama(string subject, string body)
        {
            List<string> pretplaceni = _context.Kupac
                .Where(s=>s.isPretplacen==true)
                .Select(S=>S.Email).ToList();

            if (pretplaceni.Count > 0)
            {
                foreach (var email in pretplaceni)
                {

                    string message = $"Dodana nova kolekcija. Budite prvi koji će je pogledati. Pozdrav Luna";
                    EmailSender.EmailSpecijalnePonude(email, subject, message);
                }

                return Ok("Uspjesno poslano.");
            }
            else
            {
                return Ok("Nema pretplacenih korisnika.");
            }
           
        }
        [HttpPost]
        public IActionResult PosaljiSpecijalnePonude()
        {
            var pretplaceni = _context.Kupac
                .Where(u => u.isPretplacen)
                .Select(u => u.Email).ToList();

            if (pretplaceni.Count > 0)
            {
                foreach (var email in pretplaceni)
                {
                    EmailSender.SpecijalnePonude(email);
                }

                return Ok("Uspjesno poslan mail o specijalnim ponudama.");
            }
            else
            {
                return Ok("Nema pretplacenih korisnika.");
            }
        }















    }
}
