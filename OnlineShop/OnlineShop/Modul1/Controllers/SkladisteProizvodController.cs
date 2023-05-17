using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
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
            public string? velicina { get; set; }
            public string? odjel { get; set; }
        }

        [HttpGet]
        //[Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> GetAll()
        {
            var sortiranje = "id opadajuci";

            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao = x.evidentirao,
                velicina = x.velicina,
                odjel=x.proizvod.odjel.Naziv
            }).ToList().AsQueryable();
            return data;
        }

        [HttpGet("kol_pr_opadajuci")]
        //[Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolProizvodOpadajuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao,
                velicina=x.velicina,
                odjel = x.proizvod.odjel.Naziv
            }).ToList().AsQueryable().OrderByDescending(x=>x.kolicina).ThenByDescending(x => x.proizvodOpis);
            return data;
        }

        [HttpGet("kol_pr_rastuci")]
       // [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolProizvodRastuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao,
                velicina=x.velicina,
                odjel = x.proizvod.odjel.Naziv
            }).ToList().AsQueryable().OrderBy(x => x.kolicina).ThenBy(x => x.proizvodOpis);
            return data;
        }

        [HttpGet("kol_rastuci_pr_opadajuci")]
        //[Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolRastuci_Pr_Opadajuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao,
                velicina=x.velicina,
                odjel = x.proizvod.odjel.Naziv
            }).ToList().AsQueryable().OrderBy(x => x.kolicina).ThenByDescending(x => x.proizvodOpis);
            return data;
        }


        [HttpGet("kol_opadajuci_pr_rastuci")]
      //  [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolOpadajuci_Pr_Rastuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao=x.evidentirao,
                velicina=x.velicina,
                odjel = x.proizvod.odjel.Naziv
            }).ToList().AsQueryable().OrderByDescending(x => x.kolicina).ThenBy(x=>x.proizvodOpis);
            return data;
        }


        [HttpGet("kol_opadajuci")]
        //  [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolOpadajuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao = x.evidentirao,
                velicina = x.velicina,
                odjel = x.proizvod.odjel.Naziv
            }).ToList().AsQueryable().OrderByDescending(x => x.kolicina);
            return data;
        }

        [HttpGet("kol_rastuci")]
        //  [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> SortirajPoKolRastuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao = x.evidentirao,
                velicina = x.velicina,
                odjel = x.proizvod.odjel.Naziv
            }).ToList().AsQueryable().OrderBy(x => x.kolicina);
            return data;
        }

        [HttpGet("pr_rastuci")]
        //  [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> SortirajPoPr_Rastuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao = x.evidentirao,
                velicina = x.velicina,
                odjel = x.proizvod.odjel.Naziv
            }).ToList().AsQueryable().OrderBy(x => x.proizvodOpis);
            return data;
        }

        [HttpGet("pr_opadajuci")]
        //  [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
        public IQueryable<SkladisteProizvodVM> SortirajPoPr_Opadajuci()
        {
            var data = context.SkladisteProizvod.Select(x => new SkladisteProizvodVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv + " - " + x.proizvod.Sifra,
                skladisteId = x.skladisteId,
                skladisteOpis = x.skladiste.Adresa,
                kolicina = x.kolicina,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                evidentirao = x.evidentirao,
                velicina = x.velicina,
                odjel = x.proizvod.odjel.Naziv
            }).ToList().AsQueryable().OrderByDescending(x => x.proizvodOpis);
            return data;
        }
        [HttpPost]
        [Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
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
            s.velicina = x.velicina;

            context.SaveChanges();

            return Ok(s);
        }


        [HttpDelete]
        //[Autorizacija(Kupac: false, Zaposlenik: true, Admin: true)]
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


        public class VelKol
        {
            public string velicina { get; set; }
            public int kolicina { get; set; }
        }

        [HttpGet("provjeri_stanje")]
        public ActionResult ProvjeriStanjeNaSkladistu(int proizvodId)
        {
            var skladiste = context.SkladisteProizvod.Where(x => x.proizvodId == proizvodId).ToList();
            var sk = new List<VelKol>();
            //ako ga ima na skladistu
            if (skladiste.Count() > 0)
            {
                sk = skladiste.Where(x=>x.kolicina>0).Select(x => new VelKol
                {
                    velicina=x.velicina,
                    kolicina=x.kolicina
                }).ToList();

            }
            //ako proizvoda nema na skladistu vratit cemo prazan niz
            //ako je kolicina 0 - to se ne prikaziva

            return Ok(sk);
        }


        //ova metoda se poziva:
        ///nakon kreiranja narudzbe
        ///nakon otkazivanja narudzbe
        ///nakon mijenjanja statusa na Odgodjena

        [HttpGet("update_stanje")]
        public ActionResult UpdateStanjeNaSkladistu(int narudzbaId)
        {
            Narudzba? nar = context.Narudzba.Find(narudzbaId);
            List<NarudzbaStavka>? stavke = context.NarudzbaStavka.Where(x => x.NarudzbaId == narudzbaId).ToList();

            if (nar != null)
            {
                if (nar.Status == "Nova")
                {
                    //smanjiva se stanje na skladistu
                    //moramo paziti da je kolicina u stavci manja ili jednaka kolicini na skladistu (ne smije 
                    //biti veca)
                }
                else if(nar.Status=="Otkazana" || nar.Status=="Odgodjena" )
                {
                    //povecava se stanje na skladistu
                }
              
            }

            return Ok();
        }

     
    }
}
