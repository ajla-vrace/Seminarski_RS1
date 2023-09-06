using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using OnlineShop.Modul3_SignalR;
using System.Globalization;

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
            else
                return BadRequest("Nije moguce prazan komentar");
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
                    ProdavnicaId=s.ProdavnicaId,
                    Prodavnica=s.Prodavnica.Naziv,
                    ProdavnicaAdresa=s.Prodavnica.Adresa

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
                    Prodavnica = s.Prodavnica.Naziv+" - "+s.Prodavnica.Adresa,
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
        [HttpGet("komentar")]

        public IActionResult GetKomentare(int page = 1, int pageSize = 2)
        {
            var totalCount = _dbContext.Komentar.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
           
                
            var komentari = _dbContext.Komentar
               .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Opis = s.Opis,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.DatumKreiranja,
                    Prodavnica = s.Prodavnica.Naziv+" "+s.Prodavnica.Adresa,
                    KupacId = s.KupacId,

                })
                
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = totalPages,
                Komentari = komentari
            };

            return Ok(result);
        }


        public class IzvjestajKomentari
        {
            public string Mjesec { get; set; }
            public int UkupnoKomentara { get; set; }
        }


        [HttpGet]
        public IActionResult GetIzvjestajKomentari()
        {
            var komentari = _dbContext.Komentar.ToList(); // Metoda koja dohvaca sve komentare

            var izvjestajKomentari = komentari
                //.Where(k => k.DatumKreiranja.Month==odabraniMjesec)
                .GroupBy(k => k.DatumKreiranja.Month)
                                             .Select(g => new IzvjestajKomentari
                                             {
                                                 Mjesec = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                                                 UkupnoKomentara = g.Count()
                                             })
                                             .OrderBy(i => i.Mjesec)
                                             .ToList();

            return Ok(izvjestajKomentari);
        }
        [HttpGet]
        public IActionResult GetIzvjestajKomentariParametar(int? mjesec)
        {
            var komentari = _dbContext.Komentar.ToList();

            if (mjesec.HasValue)
            {
                komentari = komentari.Where(k => k.DatumKreiranja.Month == mjesec).ToList();
            }

            var izvjestajKomentari = komentari
                .GroupBy(k => k.DatumKreiranja.Month)
                .Select(g => new IzvjestajKomentari
                {
                    Mjesec = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                    UkupnoKomentara = g.Count()
                })
                .ToList();

            return Ok(izvjestajKomentari);
        }

    }

}
