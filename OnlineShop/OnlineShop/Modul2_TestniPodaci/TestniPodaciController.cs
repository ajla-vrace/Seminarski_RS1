﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper;
using OnlineShop.Migrations;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Modul2_TestniPodaci
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class TestniPodaciController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public TestniPodaciController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]
        public ActionResult Count()
        {
            Dictionary<string, int> data = new Dictionary<string, int>();
            data.Add("Odjel", _dbContext.Odjel.Count());
            data.Add("Kategorija", _dbContext.Kategorija.Count());
            data.Add("Podkategorija", _dbContext.Podkategorija.Count());
            data.Add("Grad", _dbContext.Grad.Count());
            data.Add("Spol", _dbContext.Spol.Count());
            data.Add("Sezona", _dbContext.Sezona.Count());
            data.Add("Kolekcija", _dbContext.Kolekcija.Count());
            data.Add("Boja", _dbContext.Boja.Count());
            data.Add("Proizvod", _dbContext.Proizvod.Count());
            data.Add("SpecijalnaPonuda", _dbContext.SpecijalnaPonuda.Count());
            data.Add("SpecijalnaPonudaProizvod", _dbContext.SpecijalnaPonudaProizvod.Count());
            data.Add("Popust", _dbContext.Popust.Count());

            return Ok(data);
        }

        [HttpPost]
        public ActionResult Generisi()
        {
            var odjel = new List<Odjel>();
            var kategorija = new List<Kategorija>();
            var podkategorija = new List<Podkategorija>();
            var boja = new List<Boja>();
            var grad = new List<Grad>();
            var sezona = new List<Sezona>();
            var kolekcija = new List<Kolekcija>();
            var proizvod = new List<Proizvod>();
            var specijalnaPonuda = new List<SpecijalnaPonuda>();
            var popust = new List<Popust>();
            var specijalnaPonudaProizvod = new List<SpecijalnaPonudaProizvod>();

            boja.Add(new Boja { Naziv = "plava" });
            boja.Add(new Boja { Naziv = "zelena" });
            boja.Add(new Boja { Naziv = "crvena" });
            boja.Add(new Boja { Naziv = "crna" });

            grad.Add(new Grad { Naziv = "Mostar" });
            grad.Add(new Grad { Naziv = "Sarajevo" });
            

            kategorija.Add(new Kategorija { Naziv = "Majice", });
            kategorija.Add(new Kategorija { Naziv = "Hlače" });
            kategorija.Add(new Kategorija { Naziv = "Košulje" });

            podkategorija.Add(new Podkategorija { Naziv = "Kratke", Kategorija = kategorija[0] });
            podkategorija.Add(new Podkategorija { Naziv = "Duge", Kategorija = kategorija[0] });
            podkategorija.Add(new Podkategorija { Naziv = "nesto", Kategorija = kategorija[0] });


            sezona.Add(new Sezona { Naziv = "Jesen Zima 22/23", Doba="jesen", Godina="2022"});
            sezona.Add(new Sezona { Naziv = "Proljece Ljeto 22", Doba="proljece", Godina="2022" });

           kolekcija.Add(new Kolekcija { Naziv = "kolekcija 1", Godina = "2022", sezona = sezona[0] });
           kolekcija.Add(new Kolekcija { Naziv = "kolekcija 2", Godina = "2022", sezona = sezona[0] });
           kolekcija.Add(new Kolekcija { Naziv = "kolekcija 3", Godina = "2022", sezona = sezona[0] });


            odjel.Add(new Odjel { Naziv = "Zenski" });
            odjel.Add(new Odjel { Naziv = "Muski"});


            proizvod.Add(
                new Proizvod
                {
                    Sifra = 123,
                    Naziv = "Majica sa izrezom",
                    Cijena = 30,
                    Opis = "Pamucna zenska majica, velicine M" ,
                    datum_kreiranja = DateTime.Now,
                    datum_modifikacije = DateTime.Now,
                    Aktivan = true,
                    boja = boja[0],                 
                    odjel = odjel[0],                   
                    kategorija = kategorija[0],                  
                    podkategorija = podkategorija[0],                   
                    kolekcija = kolekcija[0],                  
                    sezona = sezona[0],                   
                });

            proizvod.Add(
             new Proizvod
             {
                 Sifra = 133,
                 Naziv = "Hlace kratke",
                 Cijena = 20,
                 Opis = "Zenske kratke hlace velicine S",
                 datum_kreiranja = DateTime.Now,
                 datum_modifikacije = DateTime.Now,
                 Aktivan = true,
                 boja = boja[2],
                 odjel = odjel[0],
                 kategorija = kategorija[1],
                 podkategorija = podkategorija[2],
                 kolekcija = kolekcija[2],
                 sezona = sezona[1],
             });

            popust.Add(new Popust { Opis = "0.5" });
            popust.Add(new Popust { Opis = "0.4" });
            popust.Add(new Popust { Opis = "0.3" });
            popust.Add(new Popust { Opis = "0.2" });
            popust.Add(new Popust { Opis = "0.1" });

            specijalnaPonuda.Add(new SpecijalnaPonuda { Naziv = "Drama dan", datum_pocetka = DateTime.Now, datum_zavrsetka = DateTime.Now });
            specijalnaPonuda.Add(new SpecijalnaPonuda { Naziv = "Crni petak", datum_pocetka = DateTime.Now, datum_zavrsetka = DateTime.Now });
            specijalnaPonuda.Add(new SpecijalnaPonuda { Naziv = "Luna slavi rođendan", datum_pocetka = DateTime.Now, datum_zavrsetka = DateTime.Now });

            specijalnaPonudaProizvod.Add(new SpecijalnaPonudaProizvod { popust = popust[0], proizvod = proizvod[0], specijalnaPonuda = specijalnaPonuda[0] });
            specijalnaPonudaProizvod.Add(new SpecijalnaPonudaProizvod { popust = popust[2], proizvod = proizvod[1], specijalnaPonuda = specijalnaPonuda[2] });

            Random rnd = new Random();

           /* for (int i = 0; i < 100; i++)
            {
                studenti.Add(new Student
                {
                    broj_indeksa = $"IB200{i:d}",
                    created_time = DateTime.Now,
                    ime = TokenGenerator.GenerisiIme(5),
                    prezime = TokenGenerator.GenerisiIme(5),
                    korisnickoIme = TokenGenerator.GenerisiIme(5),
                    lozinka = "test",
                    opstina_rodjenja = opstine.GetRandomElements(1)[0],
                    slika_korisnika = Config.SlikeURL + "empty.png"
                });
            }
           */
            _dbContext.AddRange(odjel);
            _dbContext.AddRange(sezona);
            _dbContext.AddRange(kolekcija);
            _dbContext.AddRange(kategorija);
            _dbContext.AddRange(podkategorija);
            _dbContext.AddRange(grad);
            _dbContext.AddRange(boja);
            _dbContext.AddRange(proizvod);
            _dbContext.AddRange(popust);
            _dbContext.AddRange(specijalnaPonuda);
            _dbContext.AddRange(specijalnaPonudaProizvod);

            _dbContext.SaveChanges();

            return Count();
        }
    }
}
