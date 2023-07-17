using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
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
            public bool? Aktivna { get; set; }
        }

        [HttpGet("getKolekcije")] 
        public List<Kolekcija> GetKolekcijeBySezonaID(int id)
        {
            return context.Kolekcija.Where(x => x.sezonaId == id).ToList();
        }


        [HttpGet("getKolekcije_aktivne")]
        public List<Kolekcija> GetKolekcijeAktivneBySezonaID(int id)
        {
            return context.Kolekcija.Where(x => x.sezonaId == id && x.Aktivna==true).ToList();
        }

        [HttpGet("sezone")]
       // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public IQueryable<SezonaVM> GetAll()
        {
            return context.Sezona.Select(x => new SezonaVM
            {
                Id=x.Id,
                Naziv=x.Naziv,
                Doba=x.Doba,
                Godina=x.Godina,
                Aktivna=x.Aktivna
            }).ToList().OrderByDescending(x=>x.Id).AsQueryable();
        }

        [HttpGet("sezone_aktivne")]
        // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public IQueryable<SezonaVM> GetAllAktivne()
        {
            return context.Sezona.Where(x=>x.Aktivna==true).Select(x => new SezonaVM
            {
                Id = x.Id,
                Naziv = x.Naziv,
                Doba = x.Doba,
                Godina = x.Godina,
                Aktivna = x.Aktivna
            }).ToList().OrderByDescending(x => x.Id).AsQueryable();
        }

        [HttpPost]
        [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
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
            s.Aktivna = x.Aktivna;

            context.SaveChanges();

            return Ok(s);
        }

        [HttpDelete]
        //[Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
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

                    //var skladisteProizvodi = context.SkladisteProizvod.Where(x => x.proizvodId == p.Id).ToList();

                    //foreach (var sp in skladisteProizvodi)
                    //{
                    //    context.Remove(sp);
                    //    context.SaveChanges();
                    //}

                    //var specijalnaPonudaProizvodi=context.SpecijalnaPonudaProizvod.Where(x=>x.proizvodId==p.Id).ToList();

                    //foreach (var spp in specijalnaPonudaProizvodi)
                    //{
                    //    context.Remove(spp);
                    //    context.SaveChanges();
                    //}


                    //context.Remove(p);
                    //context.SaveChanges();

                    var proizvod = context.Proizvod.Find(p.Id);
                    if (proizvod != null)
                    {
                        proizvod.sezonaId = null;

                        context.Update(proizvod);
                        context.SaveChanges();
                    }
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
