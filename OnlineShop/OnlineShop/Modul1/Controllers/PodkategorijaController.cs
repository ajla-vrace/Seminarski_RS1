using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using static OnlineShop.Modul1.Controllers.ZaposlenikController;

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
        [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
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
       // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
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
       // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
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
        //[Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult Delete(int id)
        {
            Podkategorija? pk = context.Podkategorija.Find(id);

            if (pk == null)
                return BadRequest("pogresan id");


            var list_p = context.Proizvod.Where(x => x.podkategorijaId == pk.Id).ToList();


            if (list_p.Count() > 0)
            {
                foreach (var p in list_p)
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

                    var proizvodSlike = context.ProizvodSlika.Where(x => x.proizvodId == p.Id).ToList();

                    foreach (var ps in proizvodSlike)
                    {
                        context.Remove(ps);
                        context.SaveChanges();
                    }

                    context.Remove(p);
                    context.SaveChanges();
                }
            }


            context.Remove(pk);
            context.SaveChanges();

            return Ok(pk);
        }

        public class Paginacija<T>
        {
            public int ukupnoStranica { get; set; }
            public int trenutnaStranica { get; set; }
            public int trenutniBrojPodatakaNaStranici { get; set; }
            public int selektovaniBrojPodataka { get; set; }
            public int maxBrojPodataka { get; set; } = 5;
            public IQueryable<T>? podaci { get; set; }
        }

        [HttpGet("paging")]
       // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public Paginacija<PodkategorijaVM> GetPodkategorijePaged(string? naziv, int trenutnaStr=1, int brojPodataka = 5)
        {
            if (brojPodataka > 5) brojPodataka = 5;
            if (brojPodataka < 0) brojPodataka = 0;
            if (trenutnaStr <= 0) trenutnaStr = 1;

            var filter = naziv != null ? naziv.ToLower() : null;

            var filteredPodaci = context.Podkategorija.Where(x => naziv == null ||
            (x.Naziv.ToLower().StartsWith(filter) || x.Kategorija.Naziv.ToLower().StartsWith(filter)));

            var _podaci = filteredPodaci.OrderByDescending(x=>x.Id)
                .Skip((trenutnaStr - 1)*brojPodataka).Take(brojPodataka)
                .Select(x => new PodkategorijaVM
                {
                    Id=x.Id,
                    KategorijaID=x.KategorijaId,
                    KategorijaOpis=x.Kategorija.Naziv,
                    Naziv=x.Naziv,
                    datum_kreiranja=x.datum_kreiranja,
                    datum_modifikacije=x.datum_modifikacije
                }).ToList().AsQueryable();

            var trenutniBrojPodataka = _podaci.Count();

            var totalStranica = (int)Math.Ceiling(filteredPodaci.Count() / 5.0);

            return new Paginacija<PodkategorijaVM>
            {
                maxBrojPodataka = 5,
                trenutniBrojPodatakaNaStranici = trenutniBrojPodataka,
                selektovaniBrojPodataka = brojPodataka,
                ukupnoStranica = totalStranica,
                trenutnaStranica = trenutnaStr,
                podaci = _podaci
            };

        }

        [HttpGet("paging_kat")]
       // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public Paginacija<KategorijaVM> GetKategorijePaged(string? naziv, int trenutnaStr = 1, int brojPodataka = 5)
        {
            if (brojPodataka > 5) brojPodataka = 5;
            if (brojPodataka < 0) brojPodataka = 0;
            if (trenutnaStr <= 0) trenutnaStr = 1;

            var filter = naziv != null ? naziv.ToLower() : null;

            var filteredPodaci = context.Kategorija.Where(x => naziv == null ||
            (x.Naziv.ToLower().StartsWith(filter)));

            var _podaci = filteredPodaci.OrderByDescending(x => x.Id)
                .Skip((trenutnaStr - 1) * brojPodataka).Take(brojPodataka)
                .Select(x => new KategorijaVM
                {
                    Id = x.Id,
                    Naziv = x.Naziv,
                    datum_kreiranja = x.datum_kreiranja,
                    datum_modifikacije = x.datum_modifikacije
                }).ToList().AsQueryable();

            var trenutniBrojPodataka = _podaci.Count();

            var totalStranica = (int)Math.Ceiling(filteredPodaci.Count() / 5.0);

            return new Paginacija<KategorijaVM>
            {
                maxBrojPodataka = 5,
                trenutniBrojPodatakaNaStranici = trenutniBrojPodataka,
                selektovaniBrojPodataka = brojPodataka,
                ukupnoStranica = totalStranica,
                trenutnaStranica = trenutnaStr,
                podaci = _podaci
            };

        }
        
    }
}
