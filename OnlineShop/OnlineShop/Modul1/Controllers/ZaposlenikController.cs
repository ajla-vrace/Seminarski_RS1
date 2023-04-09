using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using OnlineShop.Data;
using OnlineShop.Helper;
using OnlineShop.Modul0_Autentifikacija.Models;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;

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
            public DateTime? DatumOtkaza { get; set; }
            public string AdresaStanovanja { get; set; }
            public string? DatumRodjenja { get; set; }
            public string jmbg { get; set; }
        
            public string prodavnicaOpis { get; set; }
            public int? ProdavnicaId { get; set; }

            public string? slika_zaposlenika_nova_base64 { get; set; }  //za post-anje

            public byte[]? slika_zaposlenika_postojeca_DB { get; set; }  //za get-anje
            public byte[]? slika_zaposlenika_postojeca_FS { get; set; }  //za get-anje

        }


        public class ZaposlenikVMSnimi
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

            public DateTime DatumZaposlenja { get; set; }
            public DateTime? DatumOtkaza { get; set; }
            public string AdresaStanovanja { get; set; }
            public DateTime DatumRodjenja { get; set; }
            public string jmbg { get; set; }

            public string prodavnicaOpis { get; set; }
            public int? ProdavnicaId { get; set; }

            public string? slika_zaposlenika_nova_base64 { get; set; }  //za post-anje

            public byte[]? slika_zaposlenika_postojeca_DB { get; set; }  //za get-anje
            public byte[]? slika_zaposlenika_postojeca_FS { get; set; }  //za get-anje

        }


        public class SlikaZaposlenika
        {
            public int idZaposl { get; set; }
            public string? slika_nova { get; set; }
            public byte[]? slika_zaposlenika_postojeca_DB { get; set; }  //za get-anje
        }

        [HttpGet("id_fs")]  //id korisnika trebamo poslati da bismo dobili njegovu sliku
        public FileContentResult GetSlikaFS(int id)
        {
            byte[] bajtovi_slike = Fajlovi.Ucitaj("slike_korisnika/" + id + ".jpg")
                                  ?? Fajlovi.Ucitaj("wwwroot/images/no_image.jpg");

            return File(bajtovi_slike, "image/jpg");
        }

        [HttpGet("id_db")]
        public ActionResult GetSlikaDB(int id) //promijeniti putanju
        {
            byte[] bajtovi_slike = context.Zaposlenik.Find(id)?.slikaZaposlenikaBajtovi
                                   ?? Fajlovi.Ucitaj("wwwroot/profile_images/empty.png");

            return File(bajtovi_slike, "image/png");
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
                    //slika se snima u db
                    byte[] slika_bajtovi = x.slika_nova.ParsirajBase64();
                    z.slikaZaposlenikaBajtovi = slika_bajtovi;

                    //slika se snima u file sistem
                    //byte[] slika_bajtovi = x.slika_nova.ParsirajBase64();
                    Fajlovi.Snimi(slika_bajtovi, "slike_korisnika/" + z.Id + ".jpg");

                    x.slika_zaposlenika_postojeca_DB = slika_bajtovi;
                    
                }

                context.SaveChanges();

               
            }

            return Ok();
        }

        [HttpGet("slikaKorisnika")]
        public List<FileContentResult> Slika(int id)
        {
            var z = context.Zaposlenik.Where(x => x.Id == id).ToList()[0];

            //if (z == null)
            //    return BadRequest("ne postoji ovaj zaposlenik");

            List<FileContentResult> prikaz = new List<FileContentResult>();
            /* foreach (var z_id in z)
             {
                 byte[] bajtovi_slike = Fajlovi.Ucitaj("slike_korisnika/" + z_id + ".jpg");

                 if (bajtovi_slike != null)
                 {
                     var slika_prikaz = File(bajtovi_slike, "image/jpg");
                     prikaz.Add(slika_prikaz);
                 }

             }*/
            if (z != null)
            {
                byte[] bajtovi = z.slikaZaposlenikaBajtovi;
                if (bajtovi != null)
                {
                    var slika_prikaz = File(bajtovi, "image/jpg");
                    prikaz.Add(slika_prikaz);
                }
            }
            return prikaz;

        }



        //ako nekog zaposlenika ne mozemo da gettamo, provjerimo jel u bazi imamo dva ista zaposlenika.
        //savjet je da se prije dodavanja novog zaposlenika vrsi validacija.

        [HttpGet("id")]
        public ZaposlenikVM GetById(int id)
        {

            if (context.Zaposlenik.Where(x => x.Id == id).ToList().Count() > 0)
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
                    DatumRegistracije = x.DatumRegistracije.ToString("yyyy-MM-dd"),
                    SpolId = x.SpolId,
                    spolOpis = x.Spol.Naziv,
                    DatumZaposlenja = x.DatumZaposlenja.ToString("yyyy-MM-dd"),
                    DatumOtkaza = x.DatumOtkaza,
                    AdresaStanovanja = x.AdresaStanovanja,
                    DatumRodjenja = x.DatumRodjenja.ToString("yyyy-MM-dd"),
                    jmbg = x.JMBG,
                    ProdavnicaId = x.ProdavnicaId,
                    prodavnicaOpis = x.Prodavnica.Naziv,
                    slika_zaposlenika_postojeca_DB=x.slikaZaposlenikaBajtovi,
                    slika_zaposlenika_postojeca_FS=x.slikaZaposlenikaBajtovi
                }).ToList()[0];


                return z;
            }
            else
            {
                return new ZaposlenikVM()
                {
                    Id = 0,
                    Ime = "-",
                    Prezime = "-",
                    Username = "-",
                    Lozinka = "-",
                    Email = "-",
                    BrojTelefona = "-",
                    DatumRegistracije = DateTime.Now.ToString("yyyy-MM-dd"),
                    SpolId = 1,
                    DatumZaposlenja = DateTime.Now.ToString("yyyy-MM-dd"),
                    DatumOtkaza = DateTime.Now,
                    AdresaStanovanja = "-",
                    DatumRodjenja = DateTime.Now.ToString("yyyy-MM-dd"),
                    jmbg = "-",
                    ProdavnicaId = 1,
                    spolOpis = "-",
                    prodavnicaOpis = "-"
                };
            }

            //var z = context.Zaposlenik.Where(x => x.Id == id).Select(x => new ZaposlenikVM
            //{
            //    Id = x.Id,
            //    Ime = x.Ime,
            //    Prezime = x.Prezime,
            //    Username = x.Username,
            //    Lozinka = x.Lozinka,
            //    Email = x.Email,
            //    BrojTelefona = x.BrojTelefona,
            //    DatumRegistracije = x.DatumRegistracije.ToShortDateString(),
            //    SpolId = x.SpolId,
            //    spolOpis = x.Spol.Naziv,
            //    DatumZaposlenja = x.DatumZaposlenja,
            //    DatumOtkaza = x.DatumOtkaza,
            //    AdresaStanovanja = x.AdresaStanovanja,
            //    DatumRodjenja = x.DatumRodjenja,
            //    jmbg = x.JMBG,
            //    ProdavnicaId = x.ProdavnicaId,
            //    prodavnicaOpis = x.Prodavnica.Naziv
            //}).ToList()[0];

            //return z;


            //var zaposlenik = context.Zaposlenik.Find(id);
            //return Ok(zaposlenik);

        }

        [HttpGet("sve")]
        public IQueryable<ZaposlenikVM> GetAll()
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
                DatumRegistracije = x.DatumRegistracije.ToString("yyyy-MM-dd"),
                SpolId = x.SpolId,
                spolOpis = x.Spol.Naziv,
                DatumZaposlenja = x.DatumZaposlenja.ToString("yyyy-MM-dd"),
                DatumOtkaza = x.DatumOtkaza,
                AdresaStanovanja = x.AdresaStanovanja,
                DatumRodjenja = x.DatumRodjenja.ToString("yyyy-MM-dd"),
                jmbg = x.JMBG,
                ProdavnicaId = x.ProdavnicaId,
                prodavnicaOpis = x.Prodavnica.Naziv,
                slika_zaposlenika_postojeca_DB=x.slikaZaposlenikaBajtovi,
                slika_zaposlenika_postojeca_FS=x.slikaZaposlenikaBajtovi
            }).ToList().OrderByDescending(x=>x.Id).AsQueryable();

            return z;

        }

        [HttpPost]   
        public ActionResult Snimi(ZaposlenikVMSnimi x)
        {
            Zaposlenik? k;
           
            if (x.Id == 0)
            {
                k = new Zaposlenik();
                k.DatumRegistracije = DateTime.Now;

                List<Zaposlenik> list = context.Zaposlenik.ToList();
                context.Add(k);

                if (x.Ime == "" || x.Prezime == "" || x.Email == "" || x.Username == "" || x.Lozinka == ""
                    || x.DatumZaposlenja==null || x.DatumRodjenja==null || x.jmbg=="" || x.AdresaStanovanja=="")
                    return BadRequest("Niste upisali podatak u obavezno polje.");

                for (int i = 0; i < list.Count; i++)
                {
                    if (list[i].Username == x.Username)
                    {
                        return BadRequest("Vec postoji takav username");
                    }
                }

               // context.Add(k);              
            }
            else
            {
                k = context.Zaposlenik.FirstOrDefault(k => k.Id == x.Id);
                if (k == null)
                    return BadRequest("pogresan id");
            }

            k.Ime = x.Ime;
            k.Prezime = x.Prezime;
            k.Username = x.Username;
            k.Lozinka = x.Lozinka;
            k.Email = x.Email;
            k.BrojTelefona = x.BrojTelefona;
            k.isKupac = false;
            k.isZaposlenik = true;
            k.SpolId= x.SpolId;

            k.DatumZaposlenja = x.DatumZaposlenja;
            k.DatumOtkaza = x.DatumOtkaza;
            k.DatumRodjenja = x.DatumRodjenja;
            k.AdresaStanovanja = x.AdresaStanovanja;
            k.JMBG = x.jmbg;
            k.ProdavnicaId = x.ProdavnicaId;
            
            context.SaveChanges();
      
            return Ok(k);
        }

        [HttpDelete]
        public ActionResult DeleteZaposlenik(int id)
        {
            Zaposlenik? z = context.Zaposlenik.Find(id);

            if(z!=null)
            {
                context.Remove(z);
                context.SaveChanges();
            }
            return Ok();
        }

        [HttpGet("ukupno")]
        public int UkupnoZaposlenika()
        {
            return context.Zaposlenik.ToList().Count();
        }
    }
}
