using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
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
        public List<Skladiste> GetAll()
        {
            return context.Skladiste.ToList();
        }


        [HttpPost]
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
            s.prodavnicaId = x.prodavnicaId;

            context.SaveChanges();

            return Ok(s);
        }

        [HttpDelete]
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
