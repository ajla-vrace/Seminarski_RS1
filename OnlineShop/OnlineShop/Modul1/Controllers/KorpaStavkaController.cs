using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class KorpaStavkaController : ControllerBase
    {

        private readonly ApplicationDbContext _dbContext;
        public KorpaStavkaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] KorpaStavkaVM x)
        {
            KorpaStavka objekat;
            List<Korpa> korpa;

            List<KorpaStavka> sveStavke = _dbContext.KorpaStavka.ToList();
            for (int i = 0; i < sveStavke.Count; i++)
            {
                if (sveStavke[i].KorpaId == x.KorpaId &&
                    sveStavke[i].ProizvodId == x.ProizvodId &&
                    sveStavke[i].Velicina == x.Velicina)
                {
                    return BadRequest("Već postoji stavka korpe");
                }
            }

            objekat = new KorpaStavka();
            _dbContext.Add(objekat);

            objekat.Kolicina = x.Kolicina;
            objekat.ProizvodId = x.ProizvodId;
            objekat.KorpaId = x.KorpaId;
            objekat.Velicina = x.Velicina;
            var proizvod = _dbContext.Proizvod.Find(x.ProizvodId);

            if (proizvod != null)
            {
                //objekat.Cijena = proizvod.Cijena;

                // Provjerite da li proizvod ima popust i dobijte cijenu s popustom ako postoji
                float cijenaSPopustom = ProvjeriPopustProizvoda(proizvod.Id);

                if (cijenaSPopustom > 0)
                {
                    objekat.Cijena = cijenaSPopustom;
                }
                else
                {
                    objekat.Cijena = proizvod.Cijena;
                }
                objekat.Total = objekat.Cijena * x.Kolicina;
            }
            _dbContext.SaveChanges();
            AzurirajUkupniTotalIKolicinuKorpe((int)x.KorpaId);

            return Ok(objekat);
        }




        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.KorpaStavka
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    Cijena = s.Cijena,
                    Kolicina = s.Kolicina,
                    Total=s.Total,
                   // Total = s.Proizvod.Cijena*s.Kolicina,
                   KorpaIme=s.Korpa.Name,
                    ProizvodId= s.ProizvodId,
                    KorpaId=s.KorpaId,
                    ProizvodIme=s.Proizvod.Naziv,
                    Boja=s.Proizvod.boja.Naziv,
                    Velicina=s.Velicina,
                })
                .AsQueryable();


            return Ok(data.ToList());
        }

        [HttpGet]
        public ActionResult Get5()
        {
            var data = _dbContext.KorpaStavka
                 .OrderByDescending(s => s.Id)
                 .Select(s => new
                 {
                     Id = s.Id,
                     Cijena = s.Cijena,
                     Kolicina = s.Kolicina,
                     Total = s.Total,
                     ProizvodId = s.ProizvodId,
                     KorpaId = s.KorpaId,
                     ProizvodIme = s.Proizvod.Naziv,
                     Boja = s.Proizvod.boja,
                     Velicina= s.Velicina,
                 })
                 .AsQueryable();


            return Ok(data.Take(5).ToList());
        }


        [HttpGet("{ime}")]
        public ActionResult GetByName(string ime)
        {
            var data = _dbContext.KorpaStavka
                .OrderByDescending(s => s.Id)
                .Where(s => s.Korpa.Name == ime)
                .Select(s => new
                {
                    Id = s.Id,
                    Cijena = s.Cijena,
                    Kolicina = s.Kolicina,
                    KorpaId=s.KorpaId,
                    Total = s.Total,
                    KorpaIme = s.Korpa.Name,
                    ProizvodId = s.ProizvodId,
                    ProizvodIme = s.Proizvod.Naziv,
                    //Proizvod=s.Proizvod,
                    Slika=s.Proizvod.slika_postojeca,
                    Boja = s.Proizvod.boja,
                    Velicina=s.Velicina,
                })
                .AsQueryable();


            return Ok(data.ToList());
        }


        [HttpGet("{id}")]
        public ActionResult GetByKupacId(int id)
        {
            var data = _dbContext.KorpaStavka
                .OrderByDescending(s => s.Id)
                .Where(s => s.Korpa.KupacId == id)
                .Select(s => new
                {
                    Id = s.Id,
                    Cijena = s.Cijena,
                    Kolicina = s.Kolicina,
                    KorpaId = s.KorpaId,
                    Total = s.Total,
                    KorpaIme = s.Korpa.Name,
                    ProizvodId = s.ProizvodId,
                    ProizvodIme = s.Proizvod.Naziv,
                    Boja = s.Proizvod.boja,
                    Velicina = s.Velicina,

                })
                .AsQueryable();


            return Ok(data.ToList());
        }



        [HttpPost]
        public ActionResult Update([FromBody] KorpaStavkaVM x)
        {
            KorpaStavka objekat = _dbContext.KorpaStavka.Find(x.Id);
            if (objekat == null)
            {
                return BadRequest("ne postoji takav id");
            }
            /* var proizvod = _dbContext.Proizvod.Find(objekat.ProizvodId);
             float samoCijena;
             if (proizvod != null)
             {
                 samoCijena = proizvod.Cijena;
                 objekat.Total = samoCijena * x.Kolicina;
             }
             objekat.Kolicina = x.Kolicina;
             if(x.Velicina!="")
                 objekat.Velicina = x.Velicina;

             _dbContext.SaveChanges();*/
            var proizvod = _dbContext.Proizvod.Find(objekat.ProizvodId);

            if (proizvod != null)
            {
                //objekat.Cijena = proizvod.Cijena;

                // Provjerite da li proizvod ima popust i dobijte cijenu s popustom ako postoji
                float cijenaSPopustom = ProvjeriPopustProizvoda(proizvod.Id);
                objekat.Kolicina = x.Kolicina;
                objekat.Velicina = x.Velicina;
                if (cijenaSPopustom > 0)
                {
                    objekat.Cijena =(float)Math.Round( cijenaSPopustom,2);
                }
                else
                {
                    objekat.Cijena = (float)Math.Round(proizvod.Cijena,2);
                }
                objekat.Total = (float)Math.Round(objekat.Cijena * x.Kolicina,2);
            }
            
            _dbContext.SaveChanges();
            AzurirajUkupniTotalIKolicinuKorpe((int)x.KorpaId);

            return Ok(objekat);
        }





        [HttpPost("{id}")]
        public ActionResult Brisanje(int id)
        {
            var korpaStavka = _dbContext.KorpaStavka.Find(id);
            if (korpaStavka == null)
            {
                return BadRequest("ne postoji");
            }
            _dbContext.Remove(korpaStavka);
            _dbContext.SaveChanges();
            return Ok(korpaStavka);
        }

        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            KorpaStavka korpaStavka = _dbContext.KorpaStavka.Find(id);

            if (korpaStavka == null)
                return BadRequest("pogresan ID");

            _dbContext.Remove(korpaStavka);

            _dbContext.SaveChanges();
            return Ok(korpaStavka);
        }

        [HttpPost("{idKorpe}")]
        public ActionResult DeleteSveIzKorpe(int idKorpe)
        {
            Korpa korpa = _dbContext.Korpa.Find(idKorpe);
            if (korpa != null)
            {
                List<KorpaStavka> korpaStavka = _dbContext.KorpaStavka.
                Where(s => s.KorpaId == idKorpe).ToList();
                for (int i = 0; i < korpaStavka.Count; i++)
                {
                    _dbContext.Remove(korpaStavka[i]);
                }
            }
            _dbContext.SaveChanges();
            return Ok(korpa);
        }

        [HttpGet]
        public ActionResult GetDostupneVelicine(int proizvodId)
        {
            var proizvod = _dbContext.Proizvod.Find(proizvodId);
            if (proizvod == null)
            {
                return NotFound("Proizvod ne postoji.");
            }

            var dostupneVelicine = _dbContext.SkladisteProizvod
                .Where(s => s.proizvodId == proizvodId &&
                s.kolicina>0)
                .Select(s => s.velicina)
                .ToList();

            return Ok(dostupneVelicine);
        }
        [HttpGet]
        public ActionResult GetDostupnuKolicinu(int proizvodId, string velicina)
        {
            var proizvod = _dbContext.Proizvod.Find(proizvodId);
            if (proizvod == null)
            {
                return NotFound("Proizvod ne postoji.");
            }

            var dostupnaKolicina = _dbContext.SkladisteProizvod
                .Where(s => s.proizvodId == proizvodId &&
                s.velicina==velicina)
                .Select(s => s.kolicina)
                .ToList();

            return Ok(dostupnaKolicina);
        }
        private float ProvjeriPopustProizvoda(int proizvod_id)
        {
            // Provjerite da li proizvod ima popust u tablici SpecijalnaPonudaProizvod
            var specijalnaPonudaProizvod = _dbContext.SpecijalnaPonudaProizvod
                .FirstOrDefault(sp => sp.proizvodId == proizvod_id &&
                sp.specijalnaPonuda.aktivna==true);

            if (specijalnaPonudaProizvod != null)
            {
                // Ako je pronađen popust za proizvod i ponuda je aktivna, vratite vrijednost popusta
                return (float)specijalnaPonudaProizvod.CijenaSaPopustom;
            }

            // Ako proizvod nema popust ili ponuda nije aktivna, vratite 0
            return 0;
        }

        



        private void AzurirajUkupniTotalIKolicinuKorpe(int korpaId)
        {
            var korpa = _dbContext.Korpa.FirstOrDefault(k => k.Id == korpaId);
            if (korpa != null)
            {
                var stavkeKorpe = _dbContext.KorpaStavka
                    .Where(ks => ks.KorpaId == korpaId)
                    .ToList();

                // Izvršite izračune ukupnog totala i broja proizvoda
                float totalSvega = 0;
                int brojProizvoda = 0;
                float totalStavke = 0;
                float popust = 0;
                foreach (var stavka in stavkeKorpe)
                {
                    // Provjerite popust za proizvod
                     popust = ProvjeriPopustProizvoda((int)stavka.ProizvodId);

                    if (popust > 0)
                    {
                        // Ako proizvod ima popust, koristimo cijenu s popustom za izračun totala stavke
                        totalStavke = popust * stavka.Kolicina;
                    }
                    else
                    {
                        // Ako proizvod nema popust, koristimo regularnu cijenu za izračun totala stavke
                        totalStavke = stavka.Cijena * stavka.Kolicina;
                    }

                    totalSvega += totalStavke;
                    brojProizvoda += stavka.Kolicina;
                }

                // Ažurirajte vrijednosti ukupnog totala i broja proizvoda u korpi
                korpa.Total = totalSvega;
                korpa.UkupnoProizvoda = brojProizvoda;

                // Spremite promjene u bazu podataka
                _dbContext.SaveChanges();
            }
        }
        [HttpGet]
        public ActionResult GetCijena(int id)
        {
            var proizvod = _dbContext.Proizvod.Find(id);

            if (proizvod == null)
            {
                return NotFound();
            }

            float cijena;//= proizvod.Cijena;

            var specijalnaPonudaProizvod = _dbContext.SpecijalnaPonudaProizvod
                .FirstOrDefault(sp => sp.proizvodId == id &&
                sp.specijalnaPonuda.aktivna == true);

            if (specijalnaPonudaProizvod != null)
            {
                cijena = (float)specijalnaPonudaProizvod.CijenaSaPopustom;
            }
            else
            {
                cijena = proizvod.Cijena;
            }

            return Ok(cijena);
        }
        [HttpGet]
        
        public ActionResult GetKategorijeByOdjel(int odjel_id)
        {
            var data = _dbContext.Proizvod.Where(x => x.odjelId == odjel_id
            && x.Aktivan==true && x.isSpecijalna==false)
                .Select(x => new
                {
                    id = x.kategorijaId,
                    naziv = x.kategorija.Naziv
                }
                )
                .Distinct().ToList();
            return Ok(data);
        }
        [HttpGet]
        public ActionResult GetPodkategorijeByOdjel(int odjel_id, int kategorija_id)
        {
            var data = _dbContext.Proizvod
                .Where(x => x.odjelId == odjel_id && x.kategorijaId==kategorija_id
                && x.Aktivan==true && x.isSpecijalna==false)
                .Select(x => new
                {
                    id = x.podkategorijaId,
                    naziv = x.podkategorija.Naziv,
                    kategorijaId=x.kategorijaId,
                    kategorijaNaziv=x.kategorija.Naziv
                }
                )
                .Distinct().ToList();
            return Ok(data);
        }
        [HttpGet]
        //[Autorizacija(Kupac:false,Zaposlenik:false, Admin:true)]
        public ActionResult GetKolekcije(int odjel)
        {
            var data = _dbContext.Proizvod
                .Where(x=>x.Aktivan==true && x.isSpecijalna==false
                && x.odjelId==odjel
               )
                .Select(x => new
                {
                    //Id = x.Id,
                    Naziv = x.kolekcija.Naziv,
                    sezonaId = x.sezonaId,
                    sezonaOpis = x.sezona.Naziv,
                    
                }).Distinct().ToList();
            return Ok(data);
        }

    }

}
