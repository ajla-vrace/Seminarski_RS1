using Duende.IdentityServer.Services;
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
            Ocjena? objekat=default;
            List<Ocjena> svi = _dbContext.Ocjena.ToList();
            if (svi.Count > 0)
            {
                foreach (var item in svi)
                {
                    if ((item.KupacId) == (x.KupacId) && (item.ProdavnicaId) == (x.ProdavnicaId))
                    {
                        objekat = item;
                    }
                }
            }

            if (objekat == null)
            {
                objekat = new Ocjena();
                _dbContext.Add(objekat);
                objekat.OcjenaBrojcano = x.Ocjena;
                objekat.KupacId = x.KupacId;
                objekat.ProdavnicaId = x.ProdavnicaId;
                objekat.DatumKreiranja = DateTime.Now;
            }
            else
            {
                objekat.OcjenaBrojcano = x.Ocjena;
                    objekat.KupacId = x.KupacId;
                   objekat.ProdavnicaId = x.ProdavnicaId;
                  objekat.DatumKreiranja = DateTime.Now;
            }
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
                    Prodavnica = s.Prodavnica.Naziv+" "+s.Prodavnica.Adresa,
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
