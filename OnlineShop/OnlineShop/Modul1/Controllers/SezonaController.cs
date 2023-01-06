using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using System.Linq;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SezonaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public SezonaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class SezonaVM
        {
            public int Id { get; set; }
            public string Naziv { get; set; }
            public string Doba { get; set; }
            public string Godina { get; set; }
        }

        [HttpGet("getKolekcije")] 
        public List<Kolekcija> GetKolekcijeBySezonaID(int id)
        {
            return context.Kolekcija.Where(x => x.sezonaId == id).ToList();
        }

        [HttpGet("sezone")]
        public IQueryable<SezonaVM> GetAll()
        {
            return context.Sezona.Select(x => new SezonaVM
            {
                Id=x.Id,
                Naziv=x.Naziv,
                Doba=x.Doba,
                Godina=x.Godina
            }).ToList().OrderByDescending(x=>x.Id).AsQueryable();
        }
        [HttpPost]
        public ActionResult Snimi(SezonaVM x)
        {
            Sezona? s;

            if (x.Id == 0)
            {
                s = new Sezona();
                context.Add(s);
            }
            else
            {
                s = context.Sezona.Find(x.Id);
                if (s == null)
                    return BadRequest("pogresan id.");
            }
            s.Naziv = x.Naziv;
            s.Doba = x.Doba;
            s.Godina = x.Godina;

            context.SaveChanges();

            return Ok(s);
        }

        [HttpDelete]
        public ActionResult ObrisiSezonu(int id)
        {
            Sezona? s = context.Sezona.Find(id);
            Sezona? s_copy = s;

            List<Kolekcija> kolekcije = context.Kolekcija.Where(x => x.sezonaId == id).ToList();
            List<Proizvod> proizvodi = context.Proizvod.Where(x => x.sezonaId == id).ToList();

            if (kolekcije.Count() > 0)
            {
                foreach (var k in kolekcije)
                {
                    context.Remove(k);
                    context.SaveChanges();
                }
            }

            if(proizvodi.Count() > 0)
            {
                foreach (var p in proizvodi)
                {

                    context.Remove(p);
                    context.SaveChanges();
                }
            }

            if (s != null)
            {
                context.Remove(s);
                context.SaveChanges();
            }

            return Ok(s_copy);
        }


    }
}
