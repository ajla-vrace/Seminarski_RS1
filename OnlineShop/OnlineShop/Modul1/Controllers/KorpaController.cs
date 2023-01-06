using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

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
            objekat = new Korpa();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
            List<Korpa> sveKorpe = _dbContext.Korpa.ToList();
            for (int i = 0; i < sveKorpe.Count; i++)
            {
                if (sveKorpe[i].Name == x.Naziv)
                {
                    return BadRequest("vec postoji takva korpa");
                }
            }
            
            objekat.KupacId = x.KupacId;
            objekat.datum_kreiranja = DateTime.Now;
            objekat.datum_modifikacije = DateTime.Now;
            objekat.Name = x.Naziv;
            objekat.Total = 0;
            objekat.UkupnoProizvoda = 0;
           
            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
           

            var data = _dbContext.Korpa
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Naziv = s.Name,
                    KupacId=s.KupacId,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.datum_kreiranja,
                    DatumModifikacije = s.datum_modifikacije,
                    Total=s.Total,
                    UkupnoProizvoda=s.UkupnoProizvoda,
                      
                })
                .AsQueryable();


            return Ok(data.ToList());
        }

        [HttpGet]
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


        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
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
                    Total = s.Total,
                    UkupnoProizvoda = s.UkupnoProizvoda,

                })
                .AsQueryable();


            return Ok(data.ToList());
        }

        [HttpPost("{id}")]
        public ActionResult Update([FromBody] KorpaVM x)
        {
            Korpa objekat = _dbContext.Korpa.Find(x.Id);
            if (objekat == null)
            {
                return BadRequest("ne postoji takav id");
            }
            
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
