using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZaposlenikController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public ZaposlenikController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class ZaposlenikVM
        {
            public int Id { get; set; }
            public string Ime { get; set; }
            public string Prezime { get; set; }
            public string Username { get; set; }

            public string Lozinka { get; set; }
            public string Email { get; set; }
            public string? BrojTelefona { get; set; }
            public string DatumRegistracije { get; set; }

            public int? SpolId { get; set; }
            public string spolOpis { get; set; }

            public string DatumZaposlenja { get; set; }
            public string? DatumOtkaza { get; set; }
            public string AdresaStanovanja { get; set; }
            public string DatumRodjenja { get; set; }
            public string jmbg { get; set; }
        
            public string prodavnicaOpis { get; set; }
            public int? ProdavnicaId { get; set; }

        }

        public class SlikaZaposlenika
        {
            public int idZaposl { get; set; }
            public string slika_nova { get; set; }
        }

        [HttpGet("id_fs")]  //id korisnika trebamo poslati da bismo dobili njegovu sliku
        public FileContentResult GetSlikaFS(int id)
        {
            byte[] bajtovi_slike = Fajlovi.Ucitaj("slike_korisnika/" + id + ".jpg")
                                  ?? Fajlovi.Ucitaj("wwwroot/images/no_image.jpg");

            return File(bajtovi_slike, "image/jpg");
        }

        [HttpPost("promijeni_sliku")]
        public ActionResult PromijeniSlikuZaposlenika(SlikaZaposlenika x)
        {
            Zaposlenik? z;

            if (x.idZaposl == null || x.idZaposl==0)
            {
                return BadRequest("pogresan id korisnika.");
            }
            else
            {
                z = context.Zaposlenik.Find(x.idZaposl);

                if (x.slika_nova != null)
                {
                    byte[] slika_bajtovi = x.slika_nova.ParsirajBase64();
                    Fajlovi.Snimi(slika_bajtovi, "slike_korisnika/" + z.Id + ".jpg");
                }

                context.SaveChanges();
            }

            return Ok();
        }

        [HttpGet("slikaKorisnika")]
        public List<FileContentResult> Slika(int id)
        {
            var z = context.Zaposlenik.Where(x => x.Id == id).ToList();
            List<FileContentResult> prikaz = new List<FileContentResult>();
            foreach (var z_id in z)
            {
                byte[] bajtovi_slike = Fajlovi.Ucitaj("slike_korisnika/" + z_id + ".jpg");
                if (bajtovi_slike != null)
                {
                    var slika_prikaz = File(bajtovi_slike, "image/jpg");
                    prikaz.Add(slika_prikaz);
                }

            }

            return prikaz;

        }

        [HttpGet("id")]
        public ZaposlenikVM GetById(int id)
        {
            var z = context.Zaposlenik.Where(x => x.Id == id).Select(x => new ZaposlenikVM
            {
                Id = x.Id,
                Ime = x.Ime,
                Prezime = x.Prezime,
                Username = x.Username,
                Lozinka = x.Lozinka,
                Email = x.Email,
                BrojTelefona = x.BrojTelefona,
                DatumRegistracije = x.DatumRegistracije.ToShortDateString(),
                SpolId = x.SpolId,
                spolOpis = x.Spol.Naziv,
                DatumZaposlenja = x.DatumZaposlenja.ToShortDateString(),
                DatumOtkaza = x.DatumOtkaza.ToString(),
                AdresaStanovanja = x.AdresaStanovanja,
                DatumRodjenja = x.DatumRodjenja.ToShortDateString(),
                jmbg = x.JMBG,
                ProdavnicaId = x.ProdavnicaId,
                prodavnicaOpis = x.Prodavnica.Naziv
            }).ToList()[0];

            return z;
         
        }

        [HttpGet("sve")]
        public List<ZaposlenikVM> GetAll()
        {
            var z = context.Zaposlenik.Select(x => new ZaposlenikVM
            {
                Id = x.Id,
                Ime = x.Ime,
                Prezime = x.Prezime,
                Username = x.Username,
                Lozinka = x.Lozinka,
                Email = x.Email,
                BrojTelefona = x.BrojTelefona,
                DatumRegistracije = x.DatumRegistracije.ToShortDateString(),
                SpolId = x.SpolId,
                spolOpis = x.Spol.Naziv,
                DatumZaposlenja = x.DatumZaposlenja.ToShortDateString(),
                DatumOtkaza = x.DatumOtkaza.ToString(),
                AdresaStanovanja = x.AdresaStanovanja,
                DatumRodjenja = x.DatumRodjenja.ToShortDateString(),
                jmbg = x.JMBG,
                ProdavnicaId = x.ProdavnicaId,
                prodavnicaOpis = x.Prodavnica.Naziv
            }).ToList();

            return z;

        }



    }
}
