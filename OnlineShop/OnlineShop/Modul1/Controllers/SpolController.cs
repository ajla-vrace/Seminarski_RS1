using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SpolController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public SpolController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] SpolVM x)
        {
            Spol objekat;
            objekat = new Spol();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
            objekat.Naziv = x.Naziv;

            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Spol
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Naziv = s.Naziv,


                })
                .AsQueryable();


            return Ok(data.ToList());
        }

    }
}
