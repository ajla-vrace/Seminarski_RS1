using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class KomentarController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public KomentarController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] KomentarAddVM x)
        {
            Komentar objekat;
            objekat = new Komentar();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
            if (!x.Opis.IsNullOrEmpty())
                objekat.Opis = x.Opis;
            objekat.KupacId = x.KupacId;
            objekat.ProdavnicaId = x.ProdavnicaId;
            objekat.DatumKreiranja = DateTime.Now;
            objekat.DatumModifikacije = DateTime.Now;
            /*objekat.Kupac = x.Kupac;
            objekat.Prodavnica = x.Prodavnica;*/
            
            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Komentar
                .OrderByDescending(s => s.Id)
                .Select(s => new 
                {
                    Id=s.Id,
                    Opis = s.Opis,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja=s.DatumKreiranja,
                    Prodavnica=s.Prodavnica.Naziv,
                    
                })
                .AsQueryable();


            return Ok(data.ToList());
        }

        [HttpGet]
        public ActionResult Get5()
        {
            var data = _dbContext.Komentar
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Opis = s.Opis,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.DatumKreiranja,
                    Prodavnica = s.Prodavnica.Naziv,
                    KupacId=s.KupacId,

                })
                .AsQueryable();


            return Ok(data.Take(5).ToList());
        }


        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var data = _dbContext.Komentar
                .OrderByDescending(s => s.Id)
                .Where(s=>s.KupacId==id)
                .Select(s => new
                {
                    Id = s.Id,
                    Opis = s.Opis,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.DatumKreiranja,
                    Prodavnica = s.Prodavnica.Naziv,
                    KupacId = s.KupacId,

                })
                .AsQueryable();


            return Ok(data.ToList());
        }






        /*[HttpGet]
        public List<Komentar> GetAll()
        {
            var priprema = _dbContext.Komentar.ToList();

            return priprema;
        }*/


        [HttpPost("{id}")]
        public ActionResult Update([FromBody] KomentarAddVM x)
        {
            Komentar objekat = _dbContext.Komentar.Find(x.Id);
            if (objekat == null)
            {
                return BadRequest("ne postoji takav id");
            }
            objekat.Opis = x.Opis;
            objekat.DatumModifikacije=DateTime.Now;
            _dbContext.SaveChanges();
            return Ok(objekat);
        }





        [HttpPost("{id}")]
        public ActionResult Brisanje(int id)
        {
            var komentar= _dbContext.Komentar.Find(id);
            if (komentar == null)
            {
                return BadRequest("ne postoji");
            }
            _dbContext.Remove(komentar);
            _dbContext.SaveChanges();
            return Ok(komentar);
        }

        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            Komentar komentar= _dbContext.Komentar.Find(id);

            if (komentar == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(komentar);

            _dbContext.SaveChanges();
            return Ok(komentar);
        }
        /* [HttpPut]
         public ActionResult Update(Komentar k)
         {
             var komentar= _dbContext.Komentar.Find(k.Id);
             if (komentar == null)
             {
                 return BadRequest("ne postoji takav komentar");

             }
             komentar.Opis = k.Opis;
             _dbContext.SaveChanges();
             return Ok(komentar);
         }
        */


    }
}
