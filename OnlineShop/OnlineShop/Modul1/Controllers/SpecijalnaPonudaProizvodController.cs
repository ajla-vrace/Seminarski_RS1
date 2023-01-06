using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecijalnaPonudaProizvodController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public SpecijalnaPonudaProizvodController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class SpecijalnePonudeVM
        {
            public int Id { get; set; }
            public string Naziv { get; set; }
            public DateTime datum_pocetka { get; set; }
            public DateTime datum_zavrsetka { get; set; }
        }

        public class SpecijalnePonudeProizvodVM
        {
            public int Id { get; set; }         
            public int? specijalnaPonudaId { get; set; }
            public string specijalnaPonudaOpis { get; set; }        
            public int? proizvodId { get; set; }
            public string proizvodOpis { get; set; }
            public int? popustId { get; set; }
            public string popustOpis { get; set; }
        }

        public class PopustVM
        {
            public int Id { get; set; }
            public string Opis { get; set; }
        }

        [HttpGet("Specijalne_ponude")]
        public IQueryable<SpecijalnePonudeVM> GetSpecijalnePonude()
        {
            var data = context.SpecijalnaPonuda.Select(x => new SpecijalnePonudeVM
            {
                Id=x.Id,
                Naziv=x.Naziv,
                datum_pocetka=x.datum_pocetka,
                datum_zavrsetka=x.datum_zavrsetka
            }).ToList().AsQueryable().OrderByDescending(x => x.Id);
            return data;
        }



        [HttpGet("Specijalne_ponude_opadajuci")]
        public IQueryable<SpecijalnePonudeVM> GetSpecijalnePonudeOpadajuci()
        {
            var data = context.SpecijalnaPonuda.Select(x => new SpecijalnePonudeVM
            {
                Id = x.Id,
                Naziv = x.Naziv,
                datum_pocetka = x.datum_pocetka,
                datum_zavrsetka = x.datum_zavrsetka
            }).ToList().AsQueryable().OrderByDescending(x => x.datum_pocetka).ThenByDescending(x=>x.datum_zavrsetka);
            return data;
        }

        [HttpGet("Specijalne_ponude_rastuci")]
        public IQueryable<SpecijalnePonudeVM> GetSpecijalnePonudeRastuci()
        {
            var data = context.SpecijalnaPonuda.Select(x => new SpecijalnePonudeVM
            {
                Id = x.Id,
                Naziv = x.Naziv,
                datum_pocetka = x.datum_pocetka,
                datum_zavrsetka = x.datum_zavrsetka
            }).ToList().AsQueryable().OrderBy(x => x.datum_pocetka).ThenBy(x => x.datum_zavrsetka);
            return data;
        }


        [HttpGet("Specijalne_ponude_proizvod")]
        public IQueryable<SpecijalnePonudeProizvodVM> GetSpecijalnePonudeProizvod()
        {
            var data = context.SpecijalnaPonudaProizvod.Select(x => new SpecijalnePonudeProizvodVM
            {
                Id = x.Id,
                specijalnaPonudaId=x.specijalnaPonudaId,
                specijalnaPonudaOpis=x.specijalnaPonuda.Naziv,
                proizvodId=x.proizvodId,
                proizvodOpis=x.proizvod.Naziv,
                popustId=x.popustId,
                popustOpis=x.popust.Opis
            }).ToList().AsQueryable().OrderByDescending(x => x.Id);
            return data;      
        }


        [HttpGet("Popust")]
        public IQueryable<PopustVM> GetPopuste()
        {
            return context.Popust.Select(x => new PopustVM
            {
                Id = x.Id,
                Opis = x.Opis
            }).ToList().AsQueryable().OrderByDescending(x=>x.Id);
        }


        [HttpPost("post_sp")]
        public ActionResult SnimiSP(SpecijalnePonudeVM x)
        {
            SpecijalnaPonuda? sp;

            if (x.Id == 0)
            {
                sp = new SpecijalnaPonuda();
                context.Add(sp);

                if (x.Naziv == "" && x.datum_pocetka == null && x.datum_zavrsetka == null)
                    return BadRequest("Nisu unesena obavezna polja.");
            }
            else
            {
                sp = context.SpecijalnaPonuda.Find(x.Id);
                if (sp == null)
                    return BadRequest("pogresan id");
            }

            sp.Naziv = x.Naziv;
            sp.datum_pocetka = x.datum_pocetka;
            sp.datum_zavrsetka = x.datum_zavrsetka;

            context.SaveChanges();

            return Ok();
        }

        [HttpPost("post_spp")]
        public ActionResult SnimiSPP(SpecijalnePonudeProizvodVM x)
        {
            SpecijalnaPonudaProizvod? spp;

            if (x.Id == 0)
            {
                spp = new SpecijalnaPonudaProizvod();
                context.Add(spp);
            }
            else
            {
                spp = context.SpecijalnaPonudaProizvod.Find(x.Id);
                if (spp == null)
                    return BadRequest("pogresan id");
            }

            spp.specijalnaPonudaId = x.specijalnaPonudaId;
            spp.proizvodId = x.proizvodId;
            spp.popustId = x.popustId;

            context.SaveChanges();

            return Ok();
        }

        [HttpPost("post_popust")]
        public ActionResult SnimiPopust(PopustVM x)
        {
            Popust? p;

            if (x.Id == 0)
            {
                p = new Popust();
                context.Add(p);

                if (x.Opis == "")
                    return BadRequest("Niste unijeli obavezno polje.");
            }
            else
            {
                p = context.Popust.Find(x.Id);
                if (p == null)
                    return BadRequest("pogresan id");
            }

            p.Opis = x.Opis;

            context.SaveChanges();

            return Ok();
        }

        [HttpDelete("del_sp")]
        public ActionResult DeleteSP (int id)
        {
            SpecijalnaPonuda? sp = context.SpecijalnaPonuda.Find(id);

            List<SpecijalnaPonudaProizvod> lista_spp = context.SpecijalnaPonudaProizvod.Where(x => x.specijalnaPonudaId == id).ToList();

            if (lista_spp.Count() > 0)
            {
                foreach (var item in lista_spp)
                {
                    context.Remove(item);
                    context.SaveChanges();
                }
            }

            if (sp != null)
            {
                context.Remove(sp);
                context.SaveChanges();
            }
            return Ok(sp);
        }

        [HttpDelete("del_popust")]
        public ActionResult DeleteP(int id)
        {
            Popust? p = context.Popust.Find(id);

            List<SpecijalnaPonudaProizvod> lista_spp=context.SpecijalnaPonudaProizvod.Where(x=>x.popustId==id).ToList();

            if (lista_spp.Count() > 0)
            {
                foreach (var item in lista_spp)
                {
                    context.Remove(item);
                    context.SaveChanges();
                }
            }

            if (p != null)
            {
                context.Remove(p);
                context.SaveChanges();
            }
            return Ok(p);
        }

        [HttpDelete("del_spp")]
        public ActionResult DeleteSPP(int id)
        {
            SpecijalnaPonudaProizvod? p = context.SpecijalnaPonudaProizvod.Find(id);
            if (p != null)
            {
                context.Remove(p);
                context.SaveChanges();
            }
            return Ok(p);
        }

    }
}
