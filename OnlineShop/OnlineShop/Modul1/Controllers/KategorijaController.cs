using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Modul1.Models;
using static OnlineShop.Modul1.Controllers.PodkategorijaController;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategorijaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public KategorijaController(ApplicationDbContext context)
        {
            this.context = context;
        }

       
        [HttpPost]
        [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult Snimi(Kategorija x)
        {
            Kategorija? k;

            if (x.Id == 0)
            {
                k = new Kategorija();
                k.datum_kreiranja = DateTime.Now;
                context.Add(k);
            }
            else
            {
                k = context.Kategorija.Find(x.Id);

                if (k == null)
                    return BadRequest("pogresan ID");

                k.datum_modifikacije = DateTime.Now;
            }

            k.Naziv = x.Naziv;

            context.SaveChanges();

            return Ok();
        }

        [HttpGet]
       // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public List<Kategorija> Get()
        {
            return context.Kategorija.ToList();
        }
        [HttpGet("{odjelid}")]
        // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult GetByOdjel()
        {
            var data=context.Proizvod.Where(x => x.odjelId == 1)
                .Select(x => new
                {
                    id=x.kategorijaId,
                    naziv=x.kategorija.Naziv
                }
                )
                .Distinct().ToList();
            return Ok(data);
        }
       

        [HttpGet("GetPodkategorije")]
     //   [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public List<PodkategorijaVM> GetByKategorija(int katID)
        {
            return context.Podkategorija.Where(x => x.KategorijaId == katID).Select(x =>
            new PodkategorijaVM
            {
                Id = x.Id,
                Naziv = x.Naziv,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                KategorijaID = x.KategorijaId,
                KategorijaOpis = x.Kategorija.Naziv
            }).ToList();
        }

        [HttpDelete]
        //[Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult Delete(int id)
        {
            Kategorija? k = context.Kategorija.Find(id);

            if (k == null)
                return BadRequest("pogresan id");

            var list_p = context.Proizvod.Where(x => x.kategorijaId == k.Id).ToList();
         
            if (list_p.Count() > 0)
            {
                foreach (var p in list_p)
                {
                    context.Remove(p);
                    context.SaveChanges();
                }
            }
           

            List<Podkategorija> lista_pk = context.Podkategorija.Where(x => x.KategorijaId == id).ToList();

            if (lista_pk.Count() > 0)
            {
                foreach (var item in lista_pk)
                {
                    context.Remove(item);
                    context.SaveChanges();
                }
            }

         
            context.Remove(k);
            context.SaveChanges();

            return Ok(k);
        }


    }
}
