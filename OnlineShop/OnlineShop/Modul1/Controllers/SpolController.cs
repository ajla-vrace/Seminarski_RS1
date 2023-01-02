using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public ActionResult AddUpdate([FromBody] SpolVM x)
        {
            Spol objekat;
            if (x.Id == 0)
            {
                objekat = new Spol();
                _dbContext.Add(objekat);
            }
            else
            {
                objekat = _dbContext.Spol.Find(x.Id);
            }
            // objekat.Id = x.Id;

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

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        Spol spol = _dbContext.Spol.Find(id);

        if (spol == null)
            return BadRequest("pogresan ID");

        _dbContext.Remove(spol);

        _dbContext.SaveChanges();
        return Ok(spol);
    }



    }


    
}
