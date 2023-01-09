using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ZvjezdicaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public ZvjezdicaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] ZvjezdicaVM x)
        {
            Zvjezdica? objekat = default;
            List<Zvjezdica> svi = _dbContext.Zvjezdica.ToList();
            if (svi.Count > 0)
            {
                foreach (var item in svi)
                {
                    if ((item.KupacId) == (x.KupacId) && (item.ProizvodId) == (x.ProizvodId))
                    {
                        objekat = item;
                    }
                }
            }

            if (objekat == null)
            {
                objekat = new Zvjezdica();
                _dbContext.Add(objekat);
                objekat.OcjenaBrojcano = x.OcjenaBrojcano;
                objekat.KupacId = x.KupacId;
                objekat.ProizvodId = x.ProizvodId;
                objekat.DatumKreiranja = DateTime.Now;
            }
            else
            {
                objekat.OcjenaBrojcano = x.OcjenaBrojcano;
                //objekat.KupacId = x.KupacId;
                //objekat.ProizvodId = x.ProizvodId;
                objekat.DatumKreiranja = DateTime.Now;
            }
            _dbContext.SaveChanges();
            return Ok(objekat);
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Zvjezdica
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Ocjena = s.OcjenaBrojcano,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.DatumKreiranja,
                    Proizvod = s.Proizvod.Naziv,
                    KupacId = s.KupacId,
                    ProizvodId=s.ProizvodId
                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var data = _dbContext.Zvjezdica
                .OrderByDescending(s => s.Id)
                .Where(s => s.KupacId == id)
                .Select(s => new
                {
                    Id = s.Id,
                    Ocjena = s.OcjenaBrojcano,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.DatumKreiranja,
                    Proizvod = s.Proizvod.Naziv,
                    KupacId = s.KupacId,

                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            Zvjezdica ocjena = _dbContext.Zvjezdica.Find(id);

            if (ocjena == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(ocjena);

            _dbContext.SaveChanges();
            return Ok(ocjena);
        }

    }
}
