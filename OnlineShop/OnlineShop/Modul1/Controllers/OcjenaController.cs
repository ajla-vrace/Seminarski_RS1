using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class OcjenaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public OcjenaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] OcjenaProdavnicaVM x)
        {
            Ocjena objekat;
            objekat = new Ocjena();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
            objekat.OcjenaBrojcano = x.Ocjena;
            objekat.KupacId = x.KupacId;
            objekat.ProdavnicaId = x.ProdavnicaId;
            objekat.DatumKreiranja = DateTime.Now;
            
           

            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Ocjena
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Ocjena = s.OcjenaBrojcano,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.DatumKreiranja,
                    Prodavnica = s.Prodavnica.Naziv,
                    KupacId = s.KupacId,
                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var data = _dbContext.Ocjena
                .OrderByDescending(s => s.Id)
                .Where(s => s.KupacId == id)
                .Select(s => new
                {
                    Id = s.Id,
                    Ocjena= s.OcjenaBrojcano,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.DatumKreiranja,
                    Prodavnica = s.Prodavnica.Naziv,
                    KupacId = s.KupacId,

                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            Ocjena ocjena = _dbContext.Ocjena.Find(id);

            if (ocjena == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(ocjena);

            _dbContext.SaveChanges();
            return Ok(ocjena);
        }

    }
}
