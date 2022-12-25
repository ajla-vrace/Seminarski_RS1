using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Data;
using OnlineShop.Modul0_Autentifikacija.Models;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class KorisnikController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public KorisnikController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] KorisnikAddVM x)
        {
            KorisnickiNalog objekat;
            objekat = new KorisnickiNalog();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
            objekat.Ime = x.Ime;
            objekat.Prezime = x.Prezime;
            objekat.Email = x.Email;
            objekat.Username = x.Username;
            objekat.Lozinka = x.Lozinka;
            //objekat.BrojTelefona = x.BrojTelefona;
            objekat.isKupac = x.isKupac;
            objekat.DatumRegistracije = DateTime.Now;
            objekat.SpolId = x.SpolId;
            List<KorisnickiNalog> korisnici = _dbContext.KorisnickiNalog.ToList();
            foreach(var k in korisnici)
            {
                if (objekat.Username == k.Username)
                {
                    return BadRequest("Korisnicko ime vec postoji!");
                }
            }


            _dbContext.SaveChanges();
            return Ok(objekat);
        }
        [HttpPost]
        public List<KorisnickiNalog> GetAll()
        {
            var priprema = _dbContext.KorisnickiNalog.ToList();
            return priprema;
        }
        
          }
}
