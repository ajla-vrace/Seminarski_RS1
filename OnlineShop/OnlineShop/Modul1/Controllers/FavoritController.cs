using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class FavoritController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public FavoritController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] FavoritVM x)
        {
            Favorit objekat;
            List<Favorit> svi = _dbContext.Favorit.ToList();
            if (svi.Count > 0)
            {
                foreach (Favorit f in svi)
                {
                    if(f.KupacId==x.KupacId && f.ProizvodId == x.ProizvodId)
                    {
                        return BadRequest("vec postoji ovakav favorit!");
                    }
                }
            }
            objekat = new Favorit();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
            objekat.datum_kreiranja=x.datum_kreiranja;
            objekat.ProizvodId= x.ProizvodId;
            objekat.KupacId = x.KupacId;

            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Favorit
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.datum_kreiranja,
                    ProizvodNaziv = s.Proizvod.Naziv,
                    KupacId = s.KupacId,
                    ProizvodId=s.ProizvodId,
                    Cijena=s.Proizvod.Cijena,
                    Proizvod=s.Proizvod

                })
                .AsQueryable();


            return Ok(data.ToList());
        }

       


        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var data = _dbContext.Favorit
                .OrderByDescending(s => s.Id)
                .Where(k=>k.KupacId==id)
                .Select(s => new
                {
                    Id = s.Id,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.datum_kreiranja,
                    ProizvodNaziv = s.Proizvod.Naziv,
                    KupacId = s.KupacId,
                    ProizvodId = s.ProizvodId,
                    Cijena=s.Proizvod.Cijena,
                    Proizvod=s.Proizvod
                })
                .AsQueryable();



            return Ok(data.ToList());
        }








        [HttpPost("{id}")]
        public ActionResult Brisanje(int id)
        {
            var favorit = _dbContext.Favorit.Find(id);
            if (favorit == null)
            {
                return BadRequest("ne postoji");
            }
            _dbContext.Remove(favorit);
            _dbContext.SaveChanges();
            return Ok(favorit);
        }

        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            Favorit favorit = _dbContext.Favorit.Find(id);

            if ( favorit== null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(favorit);
            _dbContext.SaveChanges();
            return Ok(favorit);
        }
        private List<Proizvod> GetAktivniProizvodiBezPopusta1(int odjel_id)
        {
            var sviProizvodi = _dbContext.Proizvod
                .Where(o => o.odjelId == odjel_id).ToList();
            var specijalnePonude = _dbContext.SpecijalnaPonudaProizvod
         .Where(sp => sp.specijalnaPonuda.aktivna == true)
         .Select(sp => sp.proizvodId)
         .ToList();
            var aktivniProizvodiBezPopusta = sviProizvodi.Where(p => p.Aktivan && !specijalnePonude.Contains(p.Id)).ToList();

            return aktivniProizvodiBezPopusta;
        }

        [HttpGet]
        public ActionResult<List<Proizvod>> GetFilteredProizvodi(int odjel_id, /*string[] odabraneBoje,*/ float minPrice, float maxPrice, int idkategorije, int idPodkategorije, int odabranaKolekcija)
        {
            var filtriraniProizvodi = GetAktivniProizvodiBezPopusta1(odjel_id);
           // filtriraniProizvodi = filtriraniProizvodi.Where(a => odabraneBoje.Contains(a.boja.Naziv));
            filtriraniProizvodi = filtriraniProizvodi.Where(a => a.Cijena >= minPrice && a.Cijena <= maxPrice).ToList();
            filtriraniProizvodi = filtriraniProizvodi.Where(a => a.kategorijaId == idkategorije).ToList();
            filtriraniProizvodi = filtriraniProizvodi.Where(a => a.podkategorijaId == idPodkategorije).ToList();
            filtriraniProizvodi = filtriraniProizvodi.Where(a => a.kolekcijaId == odabranaKolekcija).ToList();

            /*
            if (odabraneBoje.Length > 0)
            {
                filtriraniProizvodi = (List<Proizvod>)filtriraniProizvodi.Where(a => odabraneBoje.Contains(a.boja.Naziv));
            }

            if (minPrice >= 0 && maxPrice > 0)
            {
                filtriraniProizvodi = (List<Proizvod>)filtriraniProizvodi.Where(a => a.Cijena >= minPrice && a.Cijena <= maxPrice);
            }

            if (idkategorije != 0)
            {
                filtriraniProizvodi = (List<Proizvod>)filtriraniProizvodi.Where(a => a.kategorijaId == idkategorije);
            }

            if (idPodkategorije != 0)
            {
                filtriraniProizvodi = (List<Proizvod>)filtriraniProizvodi.Where(a => a.podkategorijaId == idPodkategorije);
            }

            if (odabranaKolekcija != 0)
            {
                filtriraniProizvodi = (List<Proizvod>)filtriraniProizvodi.Where(a => a.kolekcijaId == odabranaKolekcija);
            }
            */
            var rezultat = filtriraniProizvodi.ToList();
            return Ok(rezultat);
        }



    }
}
