﻿using Microsoft.AspNetCore.Http;
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
           /* bool korpaPostoji=false;
            korpa = _dbContext.Korpa.ToList();

            for (int i = 0; i < korpa.Count; i++)
            {
                if (korpa[i].Id == x.KorpaId)
                {
                    korpaPostoji = true;
                   // break;
                }
            }*/
            /*if (!korpaPostoji)
            {
                return BadRequest("Korpa s tim id ne postoji.");
            }*/

            


                List<KorpaStavka> sveStavke = _dbContext.KorpaStavka.ToList();
                for (int i = 0; i < sveStavke.Count; i++)
                {
                    if (sveStavke[i].KorpaId == x.KorpaId &&
                        sveStavke[i].ProizvodId == x.ProizvodId &&
                        sveStavke[i].Velicina == x.Velicina)
                    {
                    return BadRequest("Vec postoji stavka korpe");
                    }
                }
                objekat = new KorpaStavka();
                // objekat.Id = x.Id;
                _dbContext.Add(objekat);

                // objekat.Cijena = x.Cijena;
                /* if (x.Kolicina == 0)
                 {
                     return BadRequest("Kolicina ne moze biti 0!");
                 }*/

                objekat.Kolicina = x.Kolicina;
                objekat.ProizvodId = x.ProizvodId;
                objekat.KorpaId = x.KorpaId;
                objekat.Velicina = x.Velicina;
                var proizvod = _dbContext.Proizvod.Find(x.ProizvodId);

                float samoCijena;
                if (proizvod != null)
                {
                    objekat.Cijena = proizvod.Cijena;
                    samoCijena = proizvod.Cijena;
                    objekat.Total = samoCijena * x.Kolicina;
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
                    Cijena = s.Proizvod.Cijena,
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
                     Cijena = s.Proizvod.Cijena,
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
                    Cijena = s.Proizvod.Cijena,
                    Kolicina = s.Kolicina,
                    KorpaId=s.KorpaId,
                    Total = s.Total,
                    KorpaIme = s.Korpa.Name,
                    ProizvodId = s.ProizvodId,
                    ProizvodIme = s.Proizvod.Naziv,
                    Proizvod=s.Proizvod,
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
                    Cijena = s.Proizvod.Cijena,
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



        [HttpPost("{id}")]
        public ActionResult Update([FromBody] KorpaStavkaVM x)
        {
            KorpaStavka objekat = _dbContext.KorpaStavka.Find(x.Id);
            if (objekat == null)
            {
                return BadRequest("ne postoji takav id");
            }
            var proizvod = _dbContext.Proizvod.Find(objekat.ProizvodId);
            float samoCijena;
            if (proizvod != null)
            {
                samoCijena = proizvod.Cijena;
                objekat.Total = samoCijena * x.Kolicina;
            }
            objekat.Kolicina = x.Kolicina;
            if(x.Velicina!="string")
                objekat.Velicina = x.Velicina;

            _dbContext.SaveChanges();
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
                foreach (var stavka in stavkeKorpe)
                {
                    totalSvega += stavka.Total;
                    brojProizvoda += stavka.Kolicina;
                }

                // Ažurirajte vrijednosti ukupnog totala i broja proizvoda u korpi
                korpa.Total = totalSvega;
                korpa.UkupnoProizvoda = brojProizvoda;

                // Spremite promjene u bazu podataka
                _dbContext.SaveChanges();
            }

        
    }
    }
}
