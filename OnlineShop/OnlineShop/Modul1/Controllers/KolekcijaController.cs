using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;
using static OnlineShop.Modul1.Controllers.SezonaController;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KolekcijaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public KolekcijaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class KolekcijaVM
        {
            public int Id { get; set; }
            public string Naziv { get; set; }
            public string Godina { get; set; }
            public int? sezonaId { get; set; }
            public string sezonaOpis { get; set; }
        }

        [HttpGet("kolekcija")]
        public IQueryable<KolekcijaVM> GetAll()
        {
            return context.Kolekcija.Select(x => new KolekcijaVM
            {
                Id = x.Id,
                Naziv = x.Naziv,
                Godina = x.Godina,
                sezonaId=x.sezonaId,
                sezonaOpis=x.sezona.Naziv
            }).ToList().AsQueryable().OrderByDescending(x=>x.Id);
        }

        [HttpGet("kolekcijaID")]
        public IQueryable<KolekcijaVM> GetKolekcijaById(int kolekcija_id)
        {
            return context.Kolekcija.Where(x=>x.Id==kolekcija_id).Select(x => new KolekcijaVM
            {
                Id = x.Id,
                Naziv = x.Naziv,
                Godina = x.Godina,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv
            }).ToList().AsQueryable();
        }
        
        [HttpPost]
        public ActionResult Snimi(KolekcijaVM x)
        {
            Kolekcija? s;

            if (x.Id == 0)
            {
                s = new Kolekcija();
                context.Add(s);
            }
            else
            {
                s = context.Kolekcija.Find(x.Id);
                if (s == null)
                    return BadRequest("pogresan id.");
            }
            s.Naziv = x.Naziv;
            s.Godina = x.Godina;
            s.sezonaId = x.sezonaId;

            context.SaveChanges();

            return Ok(s);
        }

        [HttpDelete]
        public ActionResult ObrisiKolekciju(int id)
        {
            Kolekcija? s = context.Kolekcija.Find(id);
            Kolekcija? s_copy = s;

            List<Proizvod> proizvodi = context.Proizvod.Where(x => x.kolekcijaId == id).ToList();
           

            if (proizvodi.Count() > 0)
            {
                foreach (var p in proizvodi)
                {

                    var skladisteProizvodi = context.SkladisteProizvod.Where(x => x.proizvodId == p.Id).ToList();

                    foreach (var sp in skladisteProizvodi)
                    {
                        context.Remove(sp);
                        context.SaveChanges();
                    }

                    var specijalnaPonudaProizvodi = context.SpecijalnaPonudaProizvod.Where(x => x.proizvodId == p.Id).ToList();

                    foreach (var spp in specijalnaPonudaProizvodi)
                    {
                        context.Remove(spp);
                        context.SaveChanges();
                    }


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
