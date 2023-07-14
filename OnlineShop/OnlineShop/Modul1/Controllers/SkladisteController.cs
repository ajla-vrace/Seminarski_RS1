using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkladisteController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public SkladisteController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class SkladisteVM
        {
            public int Id { get; set; }
            public string Naziv { get; set; }
            public string Adresa { get; set; }
            public string BrojTelefona { get; set; }
            public float Povrsina { get; set; }

        
            public int gradId { get; set; }
            public string gradOpis { get; set; }


            public int? prodavnicaId { get; set; }
            public string prodavnicaOpis { get; set; }
        }

        [HttpGet]
       // [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteVM> GetAll()
        {
            return context.Skladiste.Select(x => new SkladisteVM{
               Id=x.Id,
               Naziv=x.Naziv,
               Adresa=x.Adresa, 
               BrojTelefona=x.BrojTelefona,
               Povrsina=x.Povrsina,
               gradId=x.gradId,
               gradOpis=x.grad.Naziv,
               //prodavnicaId=x.prodavnicaId,
               //prodavnicaOpis=x.prodavnica.Naziv
            }).ToList().AsQueryable();
        }


        [HttpPost]
        [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public ActionResult Snimi(SkladisteVM x)
        {
            Skladiste? s;

            if (x.Id == 0)
            {
                s = new Skladiste();
                context.Add(s);
            }
            else
            {
                s = context.Skladiste.FirstOrDefault(s => s.Id == x.Id);
                if (s == null)
                    return BadRequest("pogrešan id.");
            }

            s.Naziv = x.Naziv;
            s.Adresa = x.Adresa;
            s.BrojTelefona = x.BrojTelefona;
            s.Povrsina = x.Povrsina;
            s.gradId = x.gradId;
            //s.prodavnicaId = x.prodavnicaId;

            context.SaveChanges();

            return Ok(s);
        }

        [HttpDelete]
        [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public ActionResult ObrisiSkladiste(int id)
        {
            Skladiste? s = context.Skladiste.Find(id);
            Skladiste? s_copy = s;

            List<SkladisteProizvod> sp_lista = context.SkladisteProizvod.Where(x => x.skladisteId == id).ToList();

            if (sp_lista.Count() > 0)
            {
                foreach (var sp in sp_lista)
                {
                    context.Remove(sp);
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
