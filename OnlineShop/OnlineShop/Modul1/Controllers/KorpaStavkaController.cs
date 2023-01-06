using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class KorpaStavkaController : ControllerBase
    {

        private readonly ApplicationDbContext _dbContext;
        public KorpaStavkaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] KorpaStavkaVM x)
        {
            KorpaStavka objekat;
            List<KorpaStavka> sveStavke = _dbContext.KorpaStavka.ToList();
            for (int i = 0; i < sveStavke.Count; i++)
            {
                if (sveStavke[i].KorpaId==x.KorpaId &&
                    sveStavke[i].ProizvodId == x.ProizvodId && 
                    sveStavke[i].Velicina==x.Velicina)
                {
                    return BadRequest("Ova stavka je vec dodana!");
                }
            }
            objekat = new KorpaStavka();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);

            // objekat.Cijena = x.Cijena;
           /* if (x.Kolicina == 0)
            {
                return BadRequest("Kolicina ne moze biti 0!");
            }*/
            objekat.Kolicina = x.Kolicina;
            objekat.ProizvodId = x.ProizvodId;
            objekat.KorpaId = x.KorpaId;
            objekat.Velicina = x.Velicina;
            var proizvod = _dbContext.Proizvod.Find(x.ProizvodId);
            float samoCijena;
            if (proizvod != null)
            {
                samoCijena=proizvod.Cijena;
                objekat.Total = samoCijena * x.Kolicina;
            }
            
            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.KorpaStavka
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Cijena = s.Proizvod.Cijena,
                    Kolicina = s.Kolicina,
                    Total=s.Total,
                   // Total = s.Proizvod.Cijena*s.Kolicina,
                    ProizvodId= s.ProizvodId,
                    KorpaId=s.KorpaId,
                    ProizvodIme=s.Proizvod.Naziv,
                    Boja=s.Proizvod.boja.Naziv,
                    Velicina=s.Velicina,
                })
                .AsQueryable();


            return Ok(data.ToList());
        }

        [HttpGet]
        public ActionResult Get5()
        {
            var data = _dbContext.KorpaStavka
                 .OrderByDescending(s => s.Id)
                 .Select(s => new
                 {
                     Id = s.Id,
                     Cijena = s.Proizvod.Cijena,
                     Kolicina = s.Kolicina,
                     Total = s.Total,
                     ProizvodId = s.ProizvodId,
                     KorpaId = s.KorpaId,
                     ProizvodIme = s.Proizvod.Naziv,
                     Boja = s.Proizvod.boja,
                     Velicina= s.Velicina,
                 })
                 .AsQueryable();


            return Ok(data.Take(5).ToList());
        }


        [HttpGet("{ime}")]
        public ActionResult GetByName(string ime)
        {
            var data = _dbContext.KorpaStavka
                .OrderByDescending(s => s.Id)
                .Where(s => s.Korpa.Name == ime)
                .Select(s => new
                {
                    Id = s.Id,
                    Cijena = s.Proizvod.Cijena,
                    Kolicina = s.Kolicina,
                    KorpaId=s.KorpaId,
                    Total = s.Total,
                    ProizvodId = s.ProizvodId,
                    ProizvodIme = s.Proizvod.Naziv,
                    Boja = s.Proizvod.boja,
                    Velicina=s.Velicina,
                })
                .AsQueryable();


            return Ok(data.ToList());
        }


        [HttpPost("{id}")]
        public ActionResult Update([FromBody] KorpaStavkaVM x)
        {
            KorpaStavka objekat = _dbContext.KorpaStavka.Find(x.Id);
            if (objekat == null)
            {
                return BadRequest("ne postoji takav id");
            }
            objekat.Kolicina = x.Kolicina;
            objekat.Velicina = x.Velicina;
            _dbContext.SaveChanges();
            return Ok(objekat);
        }





        [HttpPost("{id}")]
        public ActionResult Brisanje(int id)
        {
            var korpaStavka = _dbContext.KorpaStavka.Find(id);
            if (korpaStavka == null)
            {
                return BadRequest("ne postoji");
            }
            _dbContext.Remove(korpaStavka);
            _dbContext.SaveChanges();
            return Ok(korpaStavka);
        }

        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            KorpaStavka korpaStavka = _dbContext.KorpaStavka.Find(id);

            if (korpaStavka == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(korpaStavka);

            _dbContext.SaveChanges();
            return Ok(korpaStavka);
        }
        


    
}
}
