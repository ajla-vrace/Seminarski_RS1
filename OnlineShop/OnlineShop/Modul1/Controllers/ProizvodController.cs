using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
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

       

        public class ProizvodSnimi2VM
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

            public int skladisteId { get; set; }
            public int kolicina { get; set; }
        }



        [HttpPost("drugiNacin")]
        public ActionResult Snimi2(ProizvodSnimi2VM x)
        {
            Proizvod? p;

            if (x.Id == 0)
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

            if (x.Id == 0)
            {
                SkladisteProizvod? sp = new SkladisteProizvod
                {
                    proizvodId = p.Id,
                    skladisteId = x.skladisteId,
                    kolicina = x.kolicina,
                    datum_kreiranja = DateTime.Now
                };
                context.Add(sp);
                context.SaveChanges();
            }

            return Ok();

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
            Proizvod? p_copy = p;

            List<SkladisteProizvod> sp_lista = context.SkladisteProizvod.Where(x => x.proizvodId == id).ToList();

            if (sp_lista.Count() > 0)
            {
                foreach (var sp in sp_lista)
                {
                    context.Remove(sp);
                    context.SaveChanges();
                }
            }

            List<ProizvodSlika> ps_lista = context.ProizvodSlika.Where(x => x.proizvodId == id).ToList();

            if (ps_lista.Count() > 0)
            {
                foreach (var ps in ps_lista)
                {
                    context.Remove(ps);
                    context.SaveChanges();
                }
            }

            if (id == 0)
                return BadRequest("pogrešan ID.");

            if (p == null)
                return BadRequest("nema proizvoda u bazi.");

            context.Remove(p);
            context.SaveChanges();

            return Ok(p_copy);

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

        //proizvodi sa najmanjom kolicinom
        public class ProizvodiMinKolicina
        {
            public int ProizvodId { get; set; }
            public ProizvodVM? proizvod { get; set; }
            public int Kolicina { get; set; }

        }

        //treba se uzeti proizvodID od ovog, i onda sa metodom GetSlikeByProizvodId dobijamo listu slika,
        //onda idemo for petljom i saljemo jedan item metodi get_slika_FS(item); - angular 

        [HttpGet("proizvodiMinKolicina")]
        public IEnumerable<ProizvodiMinKolicina> GetProizvodeMinKolicina()
        {
            var proizvodi = context.SkladisteProizvod.Select(x => x.proizvodId).Distinct();
            var proizvodi_kolicine = new List<ProizvodiMinKolicina>();
            foreach (int p in proizvodi)
            {
                var _proizvod = context.Proizvod.Where(x => x.Id == p).Select(x=>new ProizvodVM
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
                }).ToList()[0];
                var _kolicina = context.SkladisteProizvod.Where(x => x.proizvodId == p).Sum(x => x.kolicina);

              
                proizvodi_kolicine.Add(new ProizvodiMinKolicina 
                { 
                    ProizvodId = p, 
                    proizvod=_proizvod, 
                    Kolicina = _kolicina,                
                });
            }

            var minKol=proizvodi_kolicine.OrderBy(x => x.Kolicina).Select(x=>x.Kolicina).ToList()[0];

            //proizvodi sa najmanjom kolicinom (istom)
            return proizvodi_kolicine.Where(x=>x.Kolicina==minKol).OrderBy(x => x.Kolicina);
        }

        public class ProizvodDatum
        {
            public int ProizvodId { get; set; }
            public ProizvodVM proizvod { get; set; }
            public DateTime? datum_kreiranja { get; set; }
        }

        [HttpGet("posljednjeDodaniProizvodi")]
        public List<ProizvodDatum> GetPosljednjeDodaneProizvode()
        {
            //DateTime.Compare(x.datum_kreiranja,posljednji_datum)==0
            var posljednji_datum = context.Proizvod.OrderByDescending(x => x.datum_kreiranja).Select(x => x.datum_kreiranja).ToList()[0];

            var lista = context.Proizvod.Where(x => x.datum_kreiranja.Year == posljednji_datum.Year && x.datum_kreiranja.Month == posljednji_datum.Month && x.datum_kreiranja.Day == posljednji_datum.Day).Select(x=>x.Id).ToList();

            var proizvodi_datumi = new List<ProizvodDatum>();

            foreach (var p in lista)
            { 
                var proizvodVM=context.Proizvod.Where(x=>x.Id==p).Select(x=>new ProizvodVM
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
                    sezonaOpis = x.sezona.Naziv
                }).ToList()[0];
           
                proizvodi_datumi.Add(new ProizvodDatum { 
                    ProizvodId = p, proizvod = proizvodVM, datum_kreiranja = proizvodVM.datum_kreiranja});
            }

            return proizvodi_datumi;
        }
    }
}
