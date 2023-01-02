using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class OdjelController : ControllerBase
    {

            private readonly ApplicationDbContext _dbContext;
            public OdjelController(ApplicationDbContext dbContext)
            {
                this._dbContext = dbContext;
            }

            [HttpPost]
            public ActionResult AddUpdate([FromBody] OdjelAddVM x)
            {
            Odjel objekat;
            if (x.Id == 0)
            {
                objekat = new Odjel();
                _dbContext.Add(objekat);
            }
            else
            {
                objekat = _dbContext.Odjel.Find(x.Id);
            }
            // objekat.Id = x.Id;
           
            objekat.Naziv = x.Naziv;
            _dbContext.SaveChanges();
            return Ok(objekat);
            }

        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Odjel
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Naziv = s.Naziv,
                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            Odjel odjel = _dbContext.Odjel.Find(id);

            if (odjel == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(odjel);

            _dbContext.SaveChanges();
            return Ok(odjel);
        }

    }







}
