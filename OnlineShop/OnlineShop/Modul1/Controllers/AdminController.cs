using AutoMapper.Configuration.Conventions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul0_Autentifikacija.Models;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext contex;
        public AdminController(ApplicationDbContext contex)
        {
            this.contex = contex;
        }


        public class AdminVM
        {
            public int id { get; set; }
            public string ime { get; set; }
            public string prezime { get; set; }
            public string email { get; set; }
            public string? brojTelefona { get; set; }
            public string? spolOpis { get; set; }
            public int? spolId { get; set; }
            public string username { get; set; }
            public string lozinka { get; set; }
            public string datumRegistracije { get; set; }
        }

        [HttpPut("lozinka")]
        public ActionResult EditAdminLozinka(string novaLozinka, int id)
        {
            KorisnickiNalog? a = contex.KorisnickiNalog.Find(id);

            if (a != null)
            {
                a.Lozinka = novaLozinka;

                contex.Update(a);
                contex.SaveChanges();

            }

            return Ok(a);
        }

        [HttpPut("korIme")]

        public ActionResult EditAdminUsername(string novoKorIme, int id)
        {
            KorisnickiNalog? a = contex.KorisnickiNalog.Find(id);

            if (a != null)
            {
                a.Username = novoKorIme;

                contex.Update(a);
                contex.SaveChanges();

            }

            return Ok(a);
        }


        [HttpPut]
        public ActionResult EditAdmin(AdminVM x)
        {
            KorisnickiNalog? a = contex.KorisnickiNalog.Find(x.id);

            if (a != null)
            {
                a.Ime = x.ime;
                a.Prezime = x.prezime;
                a.Email = x.email;
                a.BrojTelefona = x.brojTelefona;
                a.SpolId = x.spolId;

                contex.Update(a);
                contex.SaveChanges();

            }

            return Ok(a);
        }

        [HttpGet]
        public IQueryable<AdminVM> GetAdmin(int id)
        {

            var data = contex.KorisnickiNalog.Where(x => x.Id == id).Select(a => new AdminVM
            {
                id = a.Id,
                ime = a.Ime,
                prezime = a.Prezime,
                email = a.Email,
                brojTelefona = a.BrojTelefona,
                username = a.Username,
                lozinka = a.Lozinka,
                spolId = a.SpolId,
                spolOpis = a.Spol.Naziv,
                datumRegistracije = a.DatumRegistracije.ToString("dd/MM/yyyy")
            }).ToList().AsQueryable();

            return data;

        }


        [HttpGet("spolovi")]
        public List<Spol> GetSpolove()
        {
            return contex.Spol.ToList();
        }

        [HttpGet("korImena")]
        public List<string> GetKorisnickaImena()
        {
            return contex.KorisnickiNalog.Select(x => x.Username).ToList();
        }

        [HttpGet("emailovi")]
        public List<string> GetEmailove()
        {
            return contex.KorisnickiNalog.Select(x => x.Email).ToList();
        }

        public class Bestseller
        {
            public int ProizvodId { get; set; }
            public ProizvodVM proizvod { get; set; }
            public int Kolicina { get; set; }
            public string datum_kreiranja { get; set; }
        }


        [HttpGet("bestsellers")]
        public IEnumerable<Bestseller> GetBestellers()
        {
            var proizvodi_id = contex.Proizvod.Select(x => x.Id).ToList().Distinct();
           
            var proizvodi_kolicine = new List<Bestseller>();

            foreach (var p_id in proizvodi_id)
            {
                var _proizvod = contex.Proizvod.Where(x => x.Id == p_id).Select(x => new ProizvodVM
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
                    slika_postojeca=x.slika_postojeca
                }).ToList()[0];

                var kolicine_proizvodaId = 
                    contex.KorpaStavka.Where(x => x.ProizvodId == p_id).Sum(x => x.Kolicina);

                proizvodi_kolicine.Add(new Bestseller { ProizvodId = p_id, proizvod=_proizvod, Kolicina = kolicine_proizvodaId, datum_kreiranja=_proizvod.datum_kreiranja.ToString("dd/MM/yyyy") });
            }
           
            var top3=proizvodi_kolicine.OrderByDescending(x => x.Kolicina).Take(3);

            return top3;

        }

        public class BestProdavnice
        {
            public int? ProdavnicaId { get; set; }
            public ProdavnicaVM prodavnica { get; set; }
            public double? Ocjena { get; set; }
        }

        [HttpGet("best_prodavnice")]
        public IEnumerable<BestProdavnice> GetBestProdavnice()
        {
            var prodavnice_int = contex.Ocjena.Select(x => x.ProdavnicaId).Distinct().ToList();

            var prodavnice_ocjene = new List<BestProdavnice>();

            foreach (var prod in prodavnice_int)
            {
                var _prodavnica = contex.Prodavnica.Where(x => x.Id == prod).Select(x=>new ProdavnicaVM
                {
                    Id = x.Id,
                    Naziv = x.Naziv,
                    Povrsina = x.Povrsina,
                    BrojTelefona = x.BrojTelefona,
                    Adresa = x.Adresa,
                    GradId = x.gradId,
                    gradOpis = x.grad.Naziv
                }).ToList()[0];

                var ocjena = contex.Ocjena.Where(x => x.ProdavnicaId == prod).Average(x => x.OcjenaBrojcano);

                prodavnice_ocjene.Add(new BestProdavnice { ProdavnicaId = prod, prodavnica = _prodavnica, Ocjena = ocjena });
            }

            var top3 = prodavnice_ocjene.OrderByDescending(x => x.Ocjena).Take(3);

            return top3;
        }


        //statistika

        public class Statistika
        {
            public int brReg { get; set; }
            public int brPretpl { get; set; }
            public int brNarDnevno { get; set; }
            public int brNarMjesecno { get; set; }
            public int brNarudzbiUkupno { get; set; }
            public int brKupaca { get; set; }
        }

        [HttpGet("statistika")]
        public Statistika StatistikaPodaci()
        {
            var brojRegistriranihOsoba = contex.KorisnickiNalog.Select(x=>x.Id).Distinct().Count();
            var brojPretplacenihKorisnika = contex.Kupac.Where(x => x.isPretplacen).Select(x => x.Id).Distinct().Count();
           
            var currentDate = DateTime.Now;

            var brojNarudzbiDanas = contex.Narudzba.Where(x => x.DatumKreiranja.Day == currentDate.Day &&
            x.DatumKreiranja.Month == currentDate.Month && x.DatumKreiranja.Year == currentDate.Year).Select(x=>x.Id).
            Distinct().Count();

            var brojNarudzbiLastMonth = contex.Narudzba.Where(x => x.DatumKreiranja.Month == (currentDate.Month - 1))
                .Select(x => x.Id).Distinct().Count();

            var brojNarudzbi = contex.Narudzba.Select(x => x.Id).Count();

            var brojKupaca = contex.Narudzba.Select(x => x.KupacId).Distinct().Count();

            return new Statistika
            {
                brReg = brojRegistriranihOsoba,
                brPretpl = brojPretplacenihKorisnika,
                brNarDnevno = brojNarudzbiDanas,
                brNarMjesecno = brojNarudzbiLastMonth,
                brNarudzbiUkupno = brojNarudzbi,
                brKupaca=brojKupaca
            };
        }

    }
}
