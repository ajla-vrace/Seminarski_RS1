using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using System.Collections.Generic;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class KorpaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public KorpaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] KorpaVM x)
        {
            Korpa objekat;
            float totalSvega=0;
            int brojProizvoda=0;
            bool nadjenaKorpa = false;
            List<Korpa> sveKorpe = _dbContext.Korpa.ToList();
            for (int i = 0; i < sveKorpe.Count; i++)
            {
                if (sveKorpe[i].KupacId == x.KupacId)
                {
                    nadjenaKorpa = true;
                }
            }

            /*if (nadjenaKorpa == false)
            {*/
                if (x.Id == 0)
                {
                    objekat = new Korpa();
                    // objekat.Id = x.Id;
                    _dbContext.Add(objekat);
                    objekat.Total = 0;
                    objekat.UkupnoProizvoda = 0;
                }
           //}
            else /*if(nadjenaKorpa==true)*/
            {
                objekat = _dbContext.Korpa.Find(x.Id);
                List<KorpaStavka> stavkeKorpe=_dbContext.KorpaStavka
                    .Where(s=>s.KorpaId==x.Id).ToList();
                for (int i = 0; i < stavkeKorpe.Count; i++)
                {
                    totalSvega += stavkeKorpe[i].Total;
                    brojProizvoda += stavkeKorpe[i].Kolicina;
                }
                objekat.UkupnoProizvoda = brojProizvoda;
                objekat.Total = totalSvega;
            }  
            objekat.KupacId = x.KupacId;
            objekat.datum_kreiranja = DateTime.Now;
            objekat.datum_modifikacije = DateTime.Now;
            objekat.Name = x.Naziv;
           
            _dbContext.SaveChanges();
            return Ok(objekat);
        }



       [HttpGet]
        public ActionResult GetAll()
        {
            float totalSvega = default;
            int brojProizvoda = 0;
            /*List<KorpaStavka> stavkeTeKorpe = _dbContext.KorpaStavka.ToList();
            for (int i = 0; i < stavkeTeKorpe.Count; i++)
            {
                totalSvega += stavkeTeKorpe[i].Total;
                brojProizvoda += stavkeTeKorpe[i].Kolicina;
            }
            */
            var data = _dbContext.Korpa
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Naziv = s.Name,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.datum_kreiranja,
                    DatumModifikacije = s.datum_modifikacije,
                    Total=s.Total,
                    UkupnoProizvoda=s.UkupnoProizvoda,
                      
                })
                .AsQueryable();


            return Ok(data.ToList());
        }
       
       /* [HttpGet]
        public ActionResult Get5()
        {
            var data = _dbContext.Korpa
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Naziv = s.Name,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.datum_kreiranja,
                    DatumModifikacije = s.datum_modifikacije,
                    Total = s.Total,
                    UkupnoProizvoda = s.UkupnoProizvoda,

                })
                .AsQueryable();


            return Ok(data.Take(5).ToList());
        }

        */
        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            float totalSvega=default;
            List<KorpaStavka> stavkeTeKorpe = _dbContext.KorpaStavka
                .Where(k => k.KorpaId == id).ToList();
            for (int i = 0; i < stavkeTeKorpe.Count; i++)
            {
                totalSvega+=stavkeTeKorpe[i].Total;
            }

            var data = _dbContext.Korpa
                .OrderByDescending(s => s.Id)
                .Where(s => s.Id == id)
                .Select(s => new
                {
                    Id = s.Id,
                    Naziv = s.Name,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.datum_kreiranja,
                    DatumModifikacije = s.datum_modifikacije,
                    Total = totalSvega,
                    UkupnoProizvoda = stavkeTeKorpe.Count,

                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpGet("{kupac_id}")]
        public ActionResult GetByIdKupac(int kupac_id)
        {
            float totalSvega = default;
            int brojProizvoda = 0;
            
            bool nadjenaKorpa = false;
            /*var korpa = _dbContext.Korpa.FirstOrDefault(k => k.KupacId == kupac_id);
            if (korpa == null)
            {
                return NotFound("Korpa ne postoji za tog kupca.");
            }*/
            List <KorpaStavka> stavkeTeKorpe = _dbContext.KorpaStavka
                .Where(k => k.Korpa.KupacId == kupac_id).ToList();
            for (int i = 0; i < stavkeTeKorpe.Count; i++)
            {
                totalSvega += stavkeTeKorpe[i].Total;
                brojProizvoda += stavkeTeKorpe[i].Kolicina;
            }
            
            var data = _dbContext.Korpa
                .Where(s => s.KupacId == kupac_id)
                .Select(s => new
                {
                    Id = s.Id,
                    Naziv = s.Name,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.datum_kreiranja,
                    DatumModifikacije = s.datum_modifikacije,
                    Total = totalSvega,
                    UkupnoProizvoda = brojProizvoda,

                }).AsQueryable()
                ;


            return Ok(data);
        }

        [HttpGet("{naziv}")]
        public ActionResult GetByName(string naziv)
        {
            float totalSvega = default;
            int brojProizvoda = 0;
            List<KorpaStavka> stavkeTeKorpe = _dbContext.KorpaStavka
                .Where(k => k.Korpa.Name == naziv).ToList();
            for (int i = 0; i < stavkeTeKorpe.Count; i++)
            {
                totalSvega += stavkeTeKorpe[i].Total;
                brojProizvoda += stavkeTeKorpe[i].Kolicina;
            }

            var data = _dbContext.Korpa
                .OrderByDescending(s => s.Id)
                .Where(s => s.Name == naziv)
                .Select(s => new
                {
                    Id = s.Id,
                    Naziv = s.Name,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.datum_kreiranja,
                    DatumModifikacije = s.datum_modifikacije,
                    Total = totalSvega,
                    UkupnoProizvoda = brojProizvoda,

                })
                .AsQueryable();


            return Ok(data.ToList());
        }




        [HttpPost("{id}")]
        public ActionResult Update([FromBody] KorpaVM x)
        {
            float totalSvega = default;
            List<KorpaStavka> stavkeTeKorpe = _dbContext.KorpaStavka
                .Where(k => k.Korpa.Name == x.Naziv).ToList();
            for (int i = 0; i < stavkeTeKorpe.Count; i++)
            {
                totalSvega += stavkeTeKorpe[i].Total;
            }

            Korpa objekat = _dbContext.Korpa.Find(x.Id);
            if (objekat == null)
            {
                return BadRequest("ne postoji takav id");
            }
            objekat.Total = totalSvega;
            objekat.UkupnoProizvoda = stavkeTeKorpe.Count;
            objekat.datum_modifikacije = DateTime.Now;
            _dbContext.SaveChanges();
            return Ok(objekat);
        }





        [HttpPost("{id}")]
        public ActionResult Brisanje(int id)
        {
            var korpa = _dbContext.Korpa.Find(id);
            if (korpa == null)
            {
                return BadRequest("ne postoji");
            }
            _dbContext.Remove(korpa);
            _dbContext.SaveChanges();
            return Ok(korpa);
        }

        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            Korpa korpa = _dbContext.Korpa.Find(id);

            if (korpa == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(korpa);

            _dbContext.SaveChanges();
            return Ok(korpa);
        }
        


    
    }
}
