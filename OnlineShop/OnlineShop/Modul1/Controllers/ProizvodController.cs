using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProizvodController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ProizvodController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class ProizvodVM
        {
            public int Id { get; set; }
            public int Sifra { get; set; }
            public string Naziv { get; set; }
            public float Cijena { get; set; }
            public string Opis { get; set; }
            public DateTime datum_kreiranja { get; set; }
            public DateTime? datum_modifikacije { get; set; }
            public bool Aktivan { get; set; }

            public int bojaId { get; set; }
            public string bojaOpis { get; set; }

            public int? odjelId { get; set; }
            public string odjelOpis { get; set; }

            public int? kategorijaId { get; set; }
            public string kategorijaOpis { get; set; }

            public int? podkategorijaId { get; set; }
            public string podkategorijaOpis { get; set; }
          
            public int? kolekcijaId { get; set; }
            public string kolekcijaOpis { get; set; }
            
            public int? sezonaId { get; set; }
            public string sezonaOpis { get; set; }

        }


        [HttpPost]
        public ActionResult Snimi (ProizvodVM x)
        {
            Proizvod? p;

            if(x.Id==0)
            {
                p = new Proizvod();
                
                p.datum_kreiranja = DateTime.Now;
                p.Sifra = x.Sifra;

                context.Add(p);
            }
            else
            {
                p = context.Proizvod.Find(x.Id);
                if (p == null)
                    return BadRequest("pogrešan ID");
                p.datum_modifikacije = DateTime.Now;
            }

            p.Naziv = x.Naziv;
            p.Cijena = x.Cijena;
            p.Opis = x.Opis;
            p.Aktivan = x.Aktivan;
            p.bojaId = x.bojaId;
            p.odjelId = x.odjelId;
            p.kategorijaId = x.kategorijaId;
            p.podkategorijaId = x.podkategorijaId;
            p.sezonaId = x.sezonaId;
            p.kolekcijaId = x.kolekcijaId;

            context.SaveChanges();

            return Ok(p);

        }

        [HttpGet]
        public List<ProizvodVM> Get()
        {
            var data = context.Proizvod.Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja=x.datum_kreiranja,
                datum_modifikacije=x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId=x.bojaId,
                bojaOpis=x.boja.Naziv,
                odjelId=x.odjelId,
                odjelOpis=x.odjel.Naziv,
                kategorijaId=x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId=x.kolekcijaId,
                kolekcijaOpis=x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                sezonaId=x.sezonaId,
                sezonaOpis=x.sezona.Naziv,          

            });

            return data.OrderByDescending(x=>x.Id).ToList();
        }

        [HttpGet("datumRastuci")]
        public List<ProizvodVM> GetProizvodeDatumRastuci()
        {
            var data = context.Proizvod.Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId = x.bojaId,
                bojaOpis = x.boja.Naziv,
                odjelId = x.odjelId,
                odjelOpis = x.odjel.Naziv,
                kategorijaId = x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId = x.kolekcijaId,
                kolekcijaOpis = x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv,

            });

            return data.OrderBy(x=>x.datum_kreiranja).ToList();
        }


        [HttpGet("datumOpadajuci")]
        public List<ProizvodVM> GetProizvodeDatumOpadajuci()
        {
            var data = context.Proizvod.Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId = x.bojaId,
                bojaOpis = x.boja.Naziv,
                odjelId = x.odjelId,
                odjelOpis = x.odjel.Naziv,
                kategorijaId = x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId = x.kolekcijaId,
                kolekcijaOpis = x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv,

            });

            return data.OrderByDescending(x => x.datum_kreiranja).ToList();
        }


        [HttpDelete]
        public ActionResult ObrisiProizvod (int id)
        {
            Proizvod? p = context.Proizvod.Find(id);

            if (id == 0)
                return BadRequest("pogrešan ID.");

            if (p == null)
                return BadRequest("nema proizvoda u bazi.");

            context.Remove(p);
            context.SaveChanges();
            return Ok(p);

        }

        [HttpGet("sifra")]  //kako bi onemogucili da se unose sifre koje vec postoje 
        public ActionResult<List<int>> GetSveSifre()
        {
            return context.Proizvod.Select(x => x.Sifra).ToList();
        }

        [HttpGet("odjeli")]
        public List<Odjel> GetOdjele()
        {
            return context.Odjel.ToList();
        }

    }
}
