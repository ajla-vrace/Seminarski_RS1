using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class NarudzbaStavkaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public NarudzbaStavkaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] NarudzbaStavkaVM x)
        {
            NarudzbaStavka objekat;
            if (x.Id == 0)
            {
                objekat = new NarudzbaStavka();
                _dbContext.Add(objekat);
            }
            else
            {
                objekat = _dbContext.NarudzbaStavka.Find(x.Id);
            }


            
            Proizvod p = _dbContext.Proizvod.Find(x.ProizvodId);
            
            objekat.Kolicina = x.Kolicina;
            objekat.ProizvodId = x.ProizvodId;
            //objekat.Cijena = x.Proizvod.Cijena;
            if (p != null)
            {
                objekat.Cijena = p.Cijena;
            }
            
            objekat.Total = x.Total;
            objekat.NarudzbaId = x.NarudzbaId;
            var proizvod = _dbContext.Proizvod.Find(x.ProizvodId);
            float samoCijena;
            if (proizvod != null)
            {
                samoCijena = proizvod.Cijena;
                objekat.Total = samoCijena * x.Kolicina;
            }

            _dbContext.SaveChanges();
            return Ok(objekat);
        }
        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.NarudzbaStavka
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Cijena = s.Proizvod.Cijena,
                    Kolicina = s.Kolicina,
                    Total = s.Total,
                    // Total = s.Proizvod.Cijena*s.Kolicina,
                    ProizvodId = s.ProizvodId,
                    NarudzbaId=s.NarudzbaId,
                    ProizvodIme = s.Proizvod.Naziv,
                })
                .AsQueryable();


            return Ok(data.ToList());
        }
    }
}
