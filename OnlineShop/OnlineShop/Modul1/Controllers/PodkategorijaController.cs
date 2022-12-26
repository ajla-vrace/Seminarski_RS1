using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PodkategorijaController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public PodkategorijaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class PodkategorijaVM
        {
            public int Id { get; set; }
            public string Naziv { get; set; }
            public DateTime datum_kreiranja { get; set; }
            public DateTime? datum_modifikacije { get; set; }
            public int? KategorijaID { get; set; }
            public string KategorijaOpis { get; set; }
        }

        [HttpPost("nova_p")]
        public ActionResult Snimi([FromBody] PodkategorijaVM x)
        {
            Podkategorija? pk;

            if (x.Id == 0)
            {
                pk = new Podkategorija();
                pk.datum_kreiranja = DateTime.Now;
                context.Add(pk);
            }
            else
            {
                pk = context.Podkategorija.Find(x.Id);

                if (pk == null)
                    return BadRequest("pogresan ID");

                pk.datum_modifikacije = DateTime.Now;
            }

            pk.Naziv = x.Naziv;
            pk.KategorijaId = x.KategorijaID;

            context.SaveChanges();

            return Ok();
        }


        [HttpGet]
        public List<PodkategorijaVM> Get()
        {
            var data = context.Podkategorija.Select(x => new PodkategorijaVM
            {
                Id = x.Id,
                Naziv = x.Naziv,
                datum_kreiranja=x.datum_kreiranja,
                datum_modifikacije=x.datum_modifikacije,
                KategorijaID = x.KategorijaId,
                KategorijaOpis = x.Kategorija.Naziv
            });
            return data.OrderByDescending(s => s.Id).ToList();
        }


        //get podkategorije koje imaju unesen katID

        [HttpGet("kategorijaID")]
        public List<PodkategorijaVM> GetAll(int katID)
        {
            var data = context.Podkategorija.Where(x => x.KategorijaId == katID).Select(x =>
            new PodkategorijaVM
            {
                Id = x.Id,
                Naziv = x.Naziv,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                KategorijaID = x.KategorijaId,
                KategorijaOpis = x.Kategorija.Naziv
            }).ToList();

            return data;
        }


        [HttpDelete]
        public ActionResult Delete(int id)
        {
            Podkategorija? pk = context.Podkategorija.Find(id);

            if (pk == null)
                return BadRequest("pogresan id");

            context.Remove(pk);
            context.SaveChanges();

            return Ok(pk);
        }

    }
}
