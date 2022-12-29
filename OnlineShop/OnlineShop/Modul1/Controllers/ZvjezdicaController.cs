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
        public ActionResult Add([FromBody] OcjenaProizvodVM x)
        {
            Zvjezdica objekat;
            objekat = new Zvjezdica();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
            objekat.OcjenaBrojcano = x.Ocjena;
            objekat.KupacId = x.KupacId;
            objekat.ProizvodId = x.ProizvodId;
            objekat.DatumKreiranja = DateTime.Now;
           
          

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

                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            Zvjezdica zvjezdica = _dbContext.Zvjezdica.Find(id);

            if (zvjezdica == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(zvjezdica);

            _dbContext.SaveChanges();
            return Ok(zvjezdica);
        }


    }
}
