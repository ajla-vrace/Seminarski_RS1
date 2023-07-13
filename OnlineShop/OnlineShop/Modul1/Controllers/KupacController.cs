using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using static OnlineShop.Modul1.Controllers.ZaposlenikController;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class KupacController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public KupacController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }


        // Model za prijenos slike sa frontend-a
        public class SlikaKupcaDTO
        {
            public int IdKupca { get; set; }
            public string SlikaBase64 { get; set; }
        }

        [HttpPost("upload-slika")]
        public ActionResult UploadSlikaKupca(SlikaKupcaDTO slikaDTO)
        {
            if (slikaDTO == null || string.IsNullOrEmpty(slikaDTO.SlikaBase64))
            {
                return BadRequest("Niste odabrali sliku.");
            }

            byte[] slikaBajtovi = Convert.FromBase64String(slikaDTO.SlikaBase64);

            // Spremanje slike u bazu ili file sistem
            // ... implementirajte kod za spremanje slike ...

            var kupac = _dbContext.Kupac.FirstOrDefault(k => k.Id == slikaDTO.IdKupca);
            if (kupac != null)
            {
                kupac.SlikaKupca = slikaBajtovi;
                _dbContext.SaveChanges();
            }

            return Ok();
        }


        [HttpGet("slika")]
        public ActionResult GetSlika(int id)
        {
            var kupac = _dbContext.Kupac.FirstOrDefault(k => k.Id == id);
            if (kupac == null || kupac.SlikaKupca == null)
            {
                return NotFound(); // Vratite odgovarajući status ako nema slike ili korisnika
            }

            return File(kupac.SlikaKupca, "image/jpg"); // Pretpostavljam da je slika spremljena kao JPEG format
        }









































































        public class SlikaKupca
        {
            public int idKupac { get; set; }
            public string? slika_nova { get; set; }
            public byte[]? slika_kupca_postojeca_DB { get; set; }  //za get-anje
        }









        /*

        [HttpPost("upload-slika")]
        public ActionResult UploadSlikaKupca(IFormFile file, int idKupca)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Niste odabrali sliku.");
            }

            byte[] slikaBajtovi;
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                slikaBajtovi = memoryStream.ToArray();
            }

            // Spremanje slike u bazu ili file sistem
            // ... implementirajte kod za spremanje slike ...

            var kupac = _dbContext.Kupac.FirstOrDefault(k => k.Id == idKupca);
            if (kupac != null)
            {
                kupac.SlikaKupca = slikaBajtovi;
                _dbContext.SaveChanges();
            }

            return Ok();
        }

        */


        /*[HttpPost("upload-slika")]
        public ActionResult UploadSlikaKupca(SlikaKupcaDTO slikaDTO, int idKupca)
        {
            if (slikaDTO == null || string.IsNullOrEmpty(slikaDTO.SlikaBase64))
            {
                return BadRequest("Niste odabrali sliku.");
            }

            byte[] slikaBajtovi = Convert.FromBase64String(slikaDTO.SlikaBase64);

            // Spremanje slike u bazu ili file sistem
            // ... implementirajte kod za spremanje slike ...

            var kupac = _dbContext.Kupac.FirstOrDefault(k => k.Id == idKupca);
            if (kupac != null)
            {
                kupac.SlikaKupca = slikaBajtovi;
                _dbContext.SaveChanges();
            }

            return Ok();
        }





        [HttpGet("slika")]
        public IActionResult GetSlika(int id)
        {
            var kupac = _dbContext.Kupac.FirstOrDefault(k => k.Id == id);
            if (kupac == null || kupac.SlikaKupca == null)
            {
                return NotFound();
            }

            return File(kupac.SlikaKupca, "image/jpg"); // Promijenite tip slike ako je drugačiji
        }
        */







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
            byte[] bajtovi_slike = _dbContext.Kupac.Find(id)?.SlikaKupca
                                   ?? Fajlovi.Ucitaj("wwwroot/profile_images/empty.png");

            return File(bajtovi_slike, "image/png");
        }


        [HttpPost("promijeni_sliku")]
        public ActionResult PromijeniSlikuKupca(SlikaKupca x)
        {
            Kupac? kupac;

            if (x.idKupac == null || x.idKupac == 0)
            {
                return BadRequest("pogresan id korisnika.");
            }
            else
            {
                kupac = _dbContext.Kupac.Find(x.idKupac);

                if (x.slika_nova != null)
                {
                    //slika se snima u db
                    byte[] slika_bajtovi = x.slika_nova.ParsirajBase64();
                    kupac.SlikaKupca = slika_bajtovi;

                    //slika se snima u file sistem
                    //byte[] slika_bajtovi = x.slika_nova.ParsirajBase64();
                    Fajlovi.Snimi(slika_bajtovi, "slike_korisnika/" + kupac.Id + ".jpg");

                    x.slika_kupca_postojeca_DB = slika_bajtovi;

                }

               // _dbContext.SaveChanges();


            }
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpGet("slikaKorisnika")]
        public List<FileContentResult> Slika(int id)
        {
            var z = _dbContext.Kupac.Where(k => k.Id == id).ToList()[0];

            /*if (z == null)
               return BadRequest("ne postoji ovaj kupac");
            */
            List<FileContentResult> prikaz = new List<FileContentResult>();
            
           if (z != null)
            {
                byte[] bajtovi = z.SlikaKupca;
                if (bajtovi != null)
                {
                    var slika_prikaz = File(bajtovi, "image/jpg");
                    prikaz.Add(slika_prikaz);
                }
            }
           
            return prikaz;

        }








        [HttpPost]
        public ActionResult Add([FromBody] KupacVM x)
        {
            Kupac objekat;
            if(x.Id == 0)
            {
                objekat = new Kupac();
                _dbContext.Add(objekat);
            }
            else
            {
                objekat = _dbContext.Kupac.Find(x.Id);
            }
            List<Kupac> list = _dbContext.Kupac.ToList();
            // objekat.Id = x.Id;
            
            if (x.Ime == "" || x.Prezime == "" || x.Email == "" ||
                 x.Username == "" || x.Lozinka == "")
                return BadRequest("obavezna polja");
            for(int i = 0; i < list.Count; i++)
            {
                if (list[i].Username == x.Username)
                {
                    return BadRequest("Vec postoji takav username");
                }
            }
            objekat.Ime=x.Ime;
            objekat.Prezime = x.Prezime;
            objekat.Email = x.Email;
            objekat.Username = x.Username;
            objekat.Lozinka = x.Lozinka;
            objekat.isKupac = x.isKupac;
            objekat.BrojTelefona = x.BrojTelefona;
            //objekat.SpolId = x.SpolId;
            objekat.DatumPretplate = x.DatumPretplate;
            objekat.DatumPrveNarudzbe = x.DatumPrveNarudzbe;
            objekat.AdresaIsporuke = x.AdresaIsporuke;
            objekat.isPretplacen = x.isPretplacen;
            objekat.DatumRegistracije=DateTime.Now;
           // objekat.SlikaKupca =Ekstenzije.ParsirajBase64(x.slika_kupca_nova_base64);
            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Kupac
                .OrderBy(s => s.Id)
                .Select(s => new
                {
                    id = s.Id,
                    ime = s.Ime,
                    prezime = s.Prezime,
                    email = s.Email,
                    username = s.Username,
                    lozinka = s.Lozinka,
                    datumPretplate = s.DatumPretplate,
                    datumPrveNarudzbe = s.DatumPrveNarudzbe,
                    brojTelefona = s.BrojTelefona,
                    //spol=s.Spol,
                    spolId = s.SpolId,
                    adresaIsporuke = s.AdresaIsporuke,
                    isKupac = s.isKupac,
                    isPretplacan = s.isPretplacen,
                    datumRegistracije = s.DatumRegistracije,
                    //slikaKupca = s.SlikaKupca.ToBase64()

                    slika_zaposlenika_postojeca_DB = s.SlikaKupca,
                    slika_zaposlenika_postojeca_FS = s.SlikaKupca
                });
                


            return Ok(data.ToList());
        }

        [HttpGet]
        public ActionResult GetAllDescending()
        {
            var data = _dbContext.Kupac
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    id = s.Id,
                    ime = s.Ime,
                    prezime = s.Prezime,
                    email = s.Email,
                    username = s.Username,
                    lozinka = s.Lozinka,
                    datumPretplate = s.DatumPretplate,
                    datumPrveNarudzbe = s.DatumPrveNarudzbe,
                    brojTelefona=s.BrojTelefona,
                    //spol=s.Spol,
                    spolId = s.SpolId,
                    adresaIsporuke = s.AdresaIsporuke,
                    isKupac = s.isKupac,
                    isPretplacan = s.isPretplacen,
                    datumRegistracije = s.DatumRegistracije

                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpPut("{id}")]
        public ActionResult EditTelefon(int id, string brojTelefona)
        {
            Kupac? objekat = _dbContext.Kupac.Find(id);
            if (objekat != null)
            {
                objekat.BrojTelefona = brojTelefona;
            }
            _dbContext.SaveChanges();
            return Ok(objekat);

        }
        [HttpPut("{id}")]
        public ActionResult EditIme(int id, string ime)
        {
            Kupac? objekat = _dbContext.Kupac.Find(id);
            if (objekat != null)
            {
                objekat.Ime = ime;
            }
            _dbContext.SaveChanges();
            return Ok(objekat);

        }
        [HttpPut("{id}")]
        public ActionResult EditPrezime(int id, string prezime)
        {
            Kupac? objekat = _dbContext.Kupac.Find(id);
            if (objekat != null)
            {
                objekat.Prezime = prezime;
                _dbContext.Update(objekat);
                _dbContext.SaveChanges();
            }
            
            return Ok(objekat);

        }
        [HttpPut("{id}")]
        public ActionResult EditLozinka(int id, string lozinka)
        {
            Kupac? objekat = _dbContext.Kupac.Find(id);
            if (objekat != null)
            {
                objekat.Lozinka = lozinka;
                _dbContext.Update(objekat);
                _dbContext.SaveChanges();
            }

            return Ok(objekat);

        }
        [HttpGet]
        public ActionResult GetByIdS(int id)
        {
            var data = _dbContext.Kupac
                 .OrderBy(s => s.Id)
                 .Where(s=>s.Id==id)
                 .Select(s => new
                 {
                     id = s.Id,
                     ime = s.Ime,
                     prezime = s.Prezime,
                     email = s.Email,
                     username = s.Username,
                     lozinka = s.Lozinka,
                     datumPretplate = s.DatumPretplate,
                     datumPrveNarudzbe = s.DatumPrveNarudzbe,
                     brojTelefona = s.BrojTelefona,
                     //spol=s.Spol,
                     spolId = s.SpolId,
                     adresaIsporuke = s.AdresaIsporuke,
                     isKupac = s.isKupac,
                     isPretplacan = s.isPretplacen,
                     datumRegistracije = s.DatumRegistracije,
                     //slikaKupca = s.SlikaKupca.ToBase64()

                     slika_kupca_postojeca_DB = s.SlikaKupca,
                     slika_kupca_postojeca_FS = s.SlikaKupca
                 });



            return Ok(data);
        }
       

        [HttpGet]
        public ActionResult GetById(int id)
        {
            var data = _dbContext.Kupac.Find(id);
            return Ok(data); 
        }



        [HttpGet]
        public ActionResult GetByIdKupca(int kupacId)
        {
            var data = _dbContext.Kupac
                 .OrderBy(s => s.Id)
                 .Where(s => s.Id == kupacId)
                 .Select(s => new
                 {
                     id = s.Id,
                     ime = s.Ime,
                     prezime = s.Prezime,
                     email = s.Email,
                     username = s.Username,
                     lozinka = s.Lozinka,
                     datumPretplate = s.DatumPretplate,
                     datumPrveNarudzbe = s.DatumPrveNarudzbe,
                     brojTelefona = s.BrojTelefona,
                     //spol=s.Spol,
                     spolId = s.SpolId,
                     adresaIsporuke = s.AdresaIsporuke,
                     isKupac = s.isKupac,
                     isPretplacan = s.isPretplacen,
                     datumRegistracije = s.DatumRegistracije,
                     //slikaKupca = s.SlikaKupca.ToBase64()

                     slika_zaposlenika_postojeca_DB = s.SlikaKupca,
                     slika_zaposlenika_postojeca_FS = s.SlikaKupca
                 });



            return Ok(data.ToList());
        }
        [HttpGet]
        public IQueryable<KupacVM> GetAll1() { 
        
            var z = _dbContext.Kupac.Select(s => new KupacVM
            {
                Id = s.Id,
                Ime = s.Ime,
                Prezime = s.Prezime,
                Email = s.Email,
                Username = s.Username,
                Lozinka = s.Lozinka,
                DatumPretplate = s.DatumPretplate,
                DatumPrveNarudzbe = s.DatumPrveNarudzbe,
                BrojTelefona = s.BrojTelefona,
                SpolId = s.SpolId,
                AdresaIsporuke = s.AdresaIsporuke,
                isKupac = s.isKupac,
                isPretplacen = s.isPretplacen,
                DatumRegistracije = s.DatumRegistracije,
             // slika_zaposlenika_postojeca_DB = s.SlikaKupca,
               // slika_zaposlenika_postojeca_FS = s.SlikaKupca
            }).ToList().OrderByDescending(x => x.Id).AsQueryable();

            return z;

        }


    }
}
