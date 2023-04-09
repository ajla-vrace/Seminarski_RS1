using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using static OnlineShop.Modul1.Controllers.SkladisteController;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkladisteProizvodController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public SkladisteProizvodController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class SkladisteProizvodVM
        {
            public int Id { get; set; }

            public int? proizvodId { get; set; }
            public string proizvodOpis { get; set; }

            public int? skladisteId { get; set; }
            public string skladisteOpis { get; set; }

            public int kolicina { get; set; }

            public DateTime datum_kreiranja { get; set; }
            public DateTime? datum_modifikacije { get; set; }
            public string? evidentirao { get; set; }
        }


        public class SkladisteProizvodVMGet
        {
            public int Id { get; set; }

            public int? proizvodId { get; set; }
            public string proizvodOpis { get; set; }

            public int? skladisteId { get; set; }
            public string skladisteOpis { get; set; }

            public int kolicina { get; set; }

            public string datum_kreiranja { get; set; }
            public string? datum_modifikacije { get; set; }
        }

        [HttpGet]
        public IQueryable<SkladisteProizvodVM> GetAll()
        {
            var sortiranje = "id opadajuci";

            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Naziv,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao
            }).ToList().AsQueryable();
            return data;
        }

        [HttpGet("kol_pr_opadajuci")]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolProizvodOpadajuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Naziv,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao
            }).ToList().AsQueryable().OrderByDescending(x=>x.kolicina).ThenByDescending(x => x.proizvodOpis);
            return data;
        }

        [HttpGet("kol_pr_rastuci")]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolProizvodRastuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Naziv,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao
            }).ToList().AsQueryable().OrderBy(x => x.kolicina).ThenBy(x => x.proizvodOpis);
            return data;
        }

        [HttpGet("kol_rastuci_pr_opadajuci")]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolRastuci_Pr_Opadajuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Naziv,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao
            }).ToList().AsQueryable().OrderBy(x => x.kolicina).ThenByDescending(x => x.proizvodOpis);
            return data;
        }


        [HttpGet("kol_opadajuci_pr_rastuci")]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolOpadajuci_Pr_Rastuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Naziv,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao
            }).ToList().AsQueryable().OrderByDescending(x => x.kolicina).ThenBy(x=>x.proizvodOpis);
            return data;
        }


        [HttpPost]
        public ActionResult Snimi(SkladisteProizvodVM x)
        {
            SkladisteProizvod? s;

            if (x.Id == 0)
            {
                s = new SkladisteProizvod();
                s.datum_kreiranja = DateTime.Now;
                context.Add(s);
            }
            else
            {
                s = context.SkladisteProizvod.FirstOrDefault(s => s.Id == x.Id);
                if (s == null)
                    return BadRequest("pogrešan id.");
                s.datum_modifikacije = DateTime.Now;
            }

            s.proizvodId = x.proizvodId;
            s.skladisteId = x.skladisteId;
            s.kolicina = x.kolicina;
            s.evidentirao = x.evidentirao;

            context.SaveChanges();

            return Ok(s);
        }


        [HttpDelete]
        public ActionResult ObrisiSkladisteProizvod(int id)
        {
            SkladisteProizvod? s = context.SkladisteProizvod.Find(id);
            SkladisteProizvod? s_copy = s;

            if (s != null)
            {
                context.Remove(s);
                context.SaveChanges();
            }

            return Ok(s_copy);
        }



    }
}
