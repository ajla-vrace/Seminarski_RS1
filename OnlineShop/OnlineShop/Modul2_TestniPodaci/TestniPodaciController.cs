using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper;
using OnlineShop.Modul0_Autentifikacija.Models;
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
            data.Add("Kupci", _dbContext.Kupac.Count());
            data.Add("Zaposlenici", _dbContext.Zaposlenik.Count());
            data.Add("Admin", _dbContext.KorisnickiNalog.Where(x=>x.isAdmin==true).Count());
            data.Add("Prodavnice", _dbContext.Prodavnica.Count());
            data.Add("Skladiste", _dbContext.Skladiste.Count());
            data.Add("SkladisteProizvod", _dbContext.SkladisteProizvod.Count());
            data.Add("Narudzbe", _dbContext.Narudzba.Count());
            data.Add("NarudzbaStavka", _dbContext.NarudzbaStavka.Count());
            data.Add("Komentar", _dbContext.Komentar.Count());
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
            
            var spol = new List<Spol>();
            var korisnici = new List<Kupac>();
            var zaposlenici = new List<Zaposlenik>();
            var prodavnice = new List<Prodavnica>();
            var skladista = new List<Skladiste>();
            var skladisteProizvod = new List<SkladisteProizvod>();
            var admin = new List<KorisnickiNalog>();

            var proizvodSlika = new List<ProizvodSlika>();

            var narudzbe = new List<Narudzba>();
            var narudzbaStavka = new List<NarudzbaStavka>();


            var komentar = new List<Komentar>();

            boja.Add(new Boja { Naziv = "plava" });
            boja.Add(new Boja { Naziv = "zelena" });
            boja.Add(new Boja { Naziv = "crvena" });
            boja.Add(new Boja { Naziv = "crna" });
            boja.Add(new Boja { Naziv = "bijela" });

            grad.Add(new Grad { Naziv = "Mostar" });
            grad.Add(new Grad { Naziv = "Sarajevo" });
            

            kategorija.Add(new Kategorija { Naziv = "Majice", });
            kategorija.Add(new Kategorija { Naziv = "Hlace" });
            kategorija.Add(new Kategorija { Naziv = "Kosulje" });
            kategorija.Add(new Kategorija { Naziv = "Trenerke" });
            kategorija.Add(new Kategorija { Naziv = "Jakne" });
            kategorija.Add(new Kategorija { Naziv = "Haljine" });

            podkategorija.Add(new Podkategorija { Naziv = "Kratke", Kategorija = kategorija[0] });
            podkategorija.Add(new Podkategorija { Naziv = "Duge", Kategorija = kategorija[0] });
            podkategorija.Add(new Podkategorija { Naziv = "Kratkih rukava", Kategorija = kategorija[0] });
            podkategorija.Add(new Podkategorija { Naziv = "Dugih rukava", Kategorija = kategorija[0] });
            podkategorija.Add(new Podkategorija { Naziv = "Slim fit", Kategorija = kategorija[1] });
            podkategorija.Add(new Podkategorija { Naziv = "Baggy", Kategorija = kategorija[1] });
            podkategorija.Add(new Podkategorija { Naziv = "Kozna", Kategorija = kategorija[4] });
            podkategorija.Add(new Podkategorija { Naziv = "Zimska", Kategorija = kategorija[4] });
            podkategorija.Add(new Podkategorija { Naziv = "Svecana", Kategorija = kategorija[5] });
            podkategorija.Add(new Podkategorija { Naziv = "Kratka", Kategorija = kategorija[5] });

            sezona.Add(new Sezona { Naziv = "Jesen Zima 22/23", Doba="Jesen", Godina="2022", Aktivna=true});
            sezona.Add(new Sezona { Naziv = "Proljece Ljeto 22/23", Doba="Proljece", Godina="2022", Aktivna=false });

            kolekcija.Add(new Kolekcija { Naziv = "Basic kolekcija", Godina = "2022", sezona = sezona[0], Aktivna=true });
            kolekcija.Add(new Kolekcija { Naziv = "Kolekcija poslovne odjece", Godina = "2022", sezona = sezona[0], Aktivna=false });
            kolekcija.Add(new Kolekcija { Naziv = "Kolekcija svecane odjece", Godina = "2022", sezona = sezona[0], Aktivna=true });


            odjel.Add(new Odjel { Naziv = "Zenski" });
            odjel.Add(new Odjel { Naziv = "Muski"});

            spol.Add(new Spol { Naziv = "Zenski" });
            spol.Add(new Spol { Naziv = "Muski" });

            var datum1 = new DateTime(2023, 1, 3);
            var datum2 = new DateTime(2023, 2, 4);
            var datum3 = new DateTime(2023, 3, 12);
            var datum4 = new DateTime(2023, 4, 3);
            var datum5 = new DateTime(2023, 5, 4);
            var datum6 = new DateTime(2023, 6, 12);
            var datum7 = new DateTime(2023, 7, 3);
            var datum8 = new DateTime(2023, 8, 4);
            var datum9 = new DateTime(2023, 9, 12);
            var datum10 = new DateTime(2023, 10, 3);
            var datum11 = new DateTime(2023, 11, 4);
            var datum12 = new DateTime(2023, 12, 12);

            proizvod.Add(
                new Proizvod
                {
                    Sifra = 132,
                    Naziv = "Klasicna zenska majica",
                    Cijena = 30,
                    Opis = "Pamucna zenska majica" ,
                    datum_kreiranja = datum1,
                    datum_modifikacije = datum1,
                    Aktivan = true,
                    boja = boja[4],                 
                    odjel = odjel[0],                   
                    kategorija = kategorija[0],                  
                    podkategorija = podkategorija[0],                   
                    kolekcija = kolekcija[0],                  
                    sezona = sezona[0],  
                    slika_postojeca=Ekstenzije.ParsirajBase64(Slike.slika1),
                    evidentirao="nina",
                    modifikovao="denis",
                    isSpecijalna=true
                });

            proizvod.Add(
             new Proizvod
             {
                 Sifra = 133,
                 Naziv = "Muske hlace",
                 Cijena = 20,
                 Opis = "Muske pamucne hlace",
                 datum_kreiranja = datum2,
                 datum_modifikacije = datum3,
                 Aktivan = true,
                 boja = boja[3],
                 odjel = odjel[1],
                 kategorija = kategorija[1],
                 podkategorija = podkategorija[4],
                 kolekcija = kolekcija[0],
                 sezona = sezona[0],
                 slika_postojeca=Ekstenzije.ParsirajBase64(Slike.slika2),
                 evidentirao = "nina",
                 modifikovao = "denis",
                 isSpecijalna = true
             });

            proizvod.Add(
            new Proizvod
            {
                Sifra = 134,
                Naziv = "Zenska majica",
                Cijena = 20,
                Opis = "Zenske klasicna majica",
                datum_kreiranja = datum2,
                datum_modifikacije = null,
                Aktivan = true,
                boja = boja[3],
                odjel = odjel[0],
                kategorija = kategorija[0],
                podkategorija = podkategorija[0],
                kolekcija = kolekcija[0],
                sezona = sezona[0],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.slika3),
                evidentirao = "nina",
                modifikovao = "",
                isSpecijalna = false
            });


            proizvod.Add(
         new Proizvod
         {
             Sifra = 135,
             Naziv = "Zenska crvena majica",
             Cijena = 25,
             Opis = "Pamucna majica",
             datum_kreiranja = datum2,
             datum_modifikacije = null,
             Aktivan = true,
             boja = boja[2],
             odjel = odjel[0],
             kategorija = kategorija[0],
             podkategorija = podkategorija[0],
             kolekcija = kolekcija[0],
             sezona = sezona[0],
             slika_postojeca = Ekstenzije.ParsirajBase64(Slike.zenskaCrvenaMajica),
             evidentirao = "nina",
             modifikovao = "",
             isSpecijalna = false
         });

            proizvod.Add(
            new Proizvod
            {
                Sifra = 136,
                Naziv = "Zenske klasicne hlace",
                Cijena = 55,
                Opis = "Poslovne hlace",
                datum_kreiranja = datum2,
                datum_modifikacije = datum3,
                Aktivan = true,
                boja = boja[3],
                odjel = odjel[0],
                kategorija = kategorija[1],
                podkategorija = podkategorija[4],
                kolekcija = kolekcija[1],
                sezona = sezona[0],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.zenskeCrnePantale),
                evidentirao = "nina",
                modifikovao = "denis",
                isSpecijalna = true
            });

            proizvod.Add(
            new Proizvod
            {
                Sifra = 137,
                Naziv = "Muska majica",
                Cijena = 45,
                Opis = "Pamucna majica",
                datum_kreiranja = datum2,
                datum_modifikacije = null,
                Aktivan = true,
                boja = boja[0],
                odjel = odjel[1],
                kategorija = kategorija[0],
                podkategorija = podkategorija[0],
                kolekcija = kolekcija[0],
                sezona = sezona[0],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.muskaPlavaMajica),
                evidentirao = "nina",
                modifikovao = "",
                isSpecijalna = false
            });

            proizvod.Add(
            new Proizvod
            {
                Sifra = 138,
                Naziv = "Svecana haljina",
                Cijena = 120,
                Opis = "Haljina za svecane prilike",
                datum_kreiranja = datum3,
                datum_modifikacije = null,
                Aktivan = true,
                boja = boja[0],
                odjel = odjel[0],
                kategorija = kategorija[5],
                podkategorija = podkategorija[8],
                kolekcija = kolekcija[2],
                sezona = sezona[0],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.svecanaPlavaHaljina),
                evidentirao = "nina",
                modifikovao = "",
                isSpecijalna = false
            });

            proizvod.Add(
            new Proizvod
            {
                Sifra = 139,
                Naziv = "Kratka haljina",
                Cijena = 60,
                Opis = "Kratka ljetna haljina",
                datum_kreiranja = datum3,
                datum_modifikacije = null,
                Aktivan = true,
                boja = boja[1],
                odjel = odjel[0],
                kategorija = kategorija[5],
                podkategorija = podkategorija[9],
                kolekcija = kolekcija[2],
                sezona = sezona[0],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.zelenaHaljina),
                evidentirao = "nina",
                modifikovao = "",
                isSpecijalna = false
            });

            proizvod.Add(
            new Proizvod
            {
                Sifra = 140,
                Naziv = "Muske farmerke",
                Cijena = 50,
                Opis = "Udobne farmerke",
                datum_kreiranja = datum3,
                datum_modifikacije = null,
                Aktivan = true,
                boja = boja[0],
                odjel = odjel[1],
                kategorija = kategorija[1],
                podkategorija = podkategorija[5],
                kolekcija = kolekcija[0],
                sezona = sezona[0],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.zenskeFarmerke),
                evidentirao = "nina",
                modifikovao = "",
                isSpecijalna = false
            });


            proizvod.Add(
            new Proizvod
            {
                Sifra = 141,
                Naziv = "Kratka majica",
                Cijena = 15.95f,
                Opis = "Pamucna majica",
                datum_kreiranja = datum3,
                datum_modifikacije = null,
                Aktivan = true,
                boja = boja[4],
                odjel = odjel[0],
                kategorija = kategorija[0],
                podkategorija = podkategorija[0],
                kolekcija = kolekcija[0],
                sezona = sezona[0],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.kratkaZenskaMajica),
                evidentirao = "nina",
                modifikovao = "",
                isSpecijalna = false
            });




            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[0],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.slika1)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[1],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.slika2)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[2],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.slika3)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[3],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.zenskaCrvenaMajica)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[4],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.zenskeCrnePantale)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[5],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.muskaPlavaMajica)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[6],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.svecanaPlavaHaljina)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[7],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.zelenaHaljina)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[8],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.zenskeFarmerke)
            });

            proizvodSlika.Add(new ProizvodSlika
            {
                proizvod = proizvod[9],
                slika_postojeca = Ekstenzije.ParsirajBase64(Slike.kratkaZenskaMajica)
            });


            popust.Add(new Popust { Opis = 0.9f });
            popust.Add(new Popust { Opis = 0.8f });
            popust.Add(new Popust { Opis = 0.7f });
            popust.Add(new Popust { Opis = 0.6f });
            popust.Add(new Popust { Opis = 0.5f });
            popust.Add(new Popust { Opis = 0.4f });
            popust.Add(new Popust { Opis = 0.3f });
            popust.Add(new Popust { Opis = 0.2f });
            popust.Add(new Popust { Opis = 0.1f });

           /* var datum4 = new DateTime(2023, 7, 8);
            var datum5 = new DateTime(2023, 7, 20);
            var datum6 = new DateTime(2023, 6, 14);
            var datum7 = new DateTime(2023, 6, 22);
           */

            specijalnaPonuda.Add(new SpecijalnaPonuda { Naziv = "Drama dan", datum_pocetka = DateTime.Now, datum_zavrsetka = DateTime.Now.AddDays(10), aktivna=true });
            specijalnaPonuda.Add(new SpecijalnaPonuda { Naziv = "Crni petak", datum_pocetka = datum6, datum_zavrsetka = datum7, aktivna=false});
          
            specijalnaPonudaProizvod.Add(new SpecijalnaPonudaProizvod { popust = popust[5], proizvod = proizvod[0], specijalnaPonuda = specijalnaPonuda[0], OriginalnaCijena=30, CijenaSaPopustom=18 });
            specijalnaPonudaProizvod.Add(new SpecijalnaPonudaProizvod { popust = popust[6], proizvod = proizvod[1], specijalnaPonuda = specijalnaPonuda[0], OriginalnaCijena=20, CijenaSaPopustom=14 });

            skladista.Add(new Skladiste
            {
                Naziv = "Skladiste 1",
                Adresa = "Ulica Bleiburskih zrtava",
                BrojTelefona = "062333444",
                grad = grad[0],
                Povrsina = 2000,
                //prodavnica = prodavnice[0]
            });

            prodavnice.Add(new Prodavnica
            {
                Naziv = "Luna 1",
                Adresa = "Brace Fejica",
                BrojTelefona = "062555444",
                grad = grad[0],
                Povrsina = "3000",
                skladiste = skladista[0],
                aktivna=true
            });


            prodavnice.Add(new Prodavnica
            {
                Naziv = "Luna 2",
                Adresa = "Marsala Tita",
                BrojTelefona = "062444544",
                grad = grad[1],
                Povrsina = "3000",
                skladiste = skladista[0],
                aktivna=true
            });


            prodavnice.Add(new Prodavnica
            {
                Naziv = "Luna 3",
                Adresa = "Sjeverni logor br 12",
                BrojTelefona = "062555666",
                grad = grad[0],
                Povrsina = "3000",
                skladiste = skladista[0],
                aktivna=true
            });

          
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[0], skladiste = skladista[0], kolicina = 40, datum_kreiranja = DateTime.Now, velicina="M", evidentirao="nina" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[1], skladiste = skladista[0], kolicina = 30, datum_kreiranja = DateTime.Now, velicina="S", evidentirao="nina" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[2], skladiste = skladista[0], kolicina = 20, datum_kreiranja = DateTime.Now, velicina = "L", evidentirao = "nina" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[3], skladiste = skladista[0], kolicina = 33, datum_kreiranja = DateTime.Now, velicina = "S", evidentirao = "denis" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[4], skladiste = skladista[0], kolicina = 25, datum_kreiranja = DateTime.Now, velicina = "XS", evidentirao = "nina" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[5], skladiste = skladista[0], kolicina = 30, datum_kreiranja = DateTime.Now, velicina = "M", evidentirao = "nina" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[6], skladiste = skladista[0], kolicina = 27, datum_kreiranja = DateTime.Now, velicina = "L", evidentirao = "nina" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[7], skladiste = skladista[0], kolicina = 36, datum_kreiranja = DateTime.Now, velicina = "S", evidentirao = "denis" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[6], skladiste = skladista[0], kolicina = 30, datum_kreiranja = DateTime.Now, velicina = "S", evidentirao = "nina" });
            skladisteProizvod.Add(new SkladisteProizvod { proizvod = proizvod[7], skladiste = skladista[0], kolicina = 26, datum_kreiranja = DateTime.Now, velicina = "L", evidentirao = "denis" });



            //admin.Add(new KorisnickiNalog()
            //{
            //    Ime = "Adil",
            //    Prezime = "Joldic",
            //    Email = "adil@gmail.com",
            //    Username = "adil",
            //    Lozinka = "test",
            //    BrojTelefona = "062444333",
            //    DatumRegistracije = DateTime.Now,
            //    Spol = spol[1],
            //    isAdmin = true,
            //    isKupac = false,
            //    isZaposlenik = false
            //});

            admin.Add(new KorisnickiNalog()
            {
                Ime = "Admin",
                Prezime = "Admin",
                Email = "testniemail30@gmail.com",
                Username = "admin",
                Lozinka = "test",
                BrojTelefona = "062444333",
                DatumRegistracije = DateTime.Now,
                Spol = spol[1],
                isAdmin = true,
                isKupac = false,
                isZaposlenik = false
            });

            korisnici.Add(new Kupac()
            {
                Ime = "Iris",
                Prezime = "Memic",
                Email = "testkupac7@gmail.com",
                Username = "kupacdrugi",
                Lozinka = "test",
                BrojTelefona = "062666433",
                DatumRegistracije = DateTime.Now,
                Spol = spol[0],
                isAdmin = false,
                isKupac = true,
                isZaposlenik = false,
                isPretplacen=true,
                AdresaIsporuke="Adresa1",
                DatumPretplate=DateTime.Now
            });

            korisnici.Add(new Kupac()
            {
                Ime = "Kemal",
                Prezime = "Maric",
                Email = "kemal@gmail.com",
                Username = "kupacprvi",
                Lozinka = "test",
                BrojTelefona = "062777333",
                DatumRegistracije = DateTime.Now,
                Spol = spol[1],
                isAdmin = false,
                isKupac = true,
                isZaposlenik = false,
                isPretplacen = false,
                AdresaIsporuke = "Adresa2",
                DatumPretplate = DateTime.Now
            });

            zaposlenici.Add(new Zaposlenik()
            {
                Ime = "Nina",
                Prezime = "Bijedic",
                Email = "nina@gmail.com",
                Username = "nina",
                Lozinka = "test",
                BrojTelefona = "062566222",
                DatumRegistracije = DateTime.Now,
                Spol = spol[0],
                isAdmin = false,
                isKupac = false,
                isZaposlenik = true,
                DatumRodjenja=new DateTime(1999, month: 2, day: 22),
                DatumZaposlenja =DateTime.Now,
                AdresaStanovanja="Trg Ivana Krndelja 1",
                JMBG="3241567483592",
                Prodavnica = prodavnice[0],
                jelObavijesten=false
            });

            zaposlenici.Add(new Zaposlenik()
            {
                Ime = "Denis",
                Prezime = "Music",
                Email = "denis@gmail.com",
                Username = "denis",
                Lozinka = "test",
                BrojTelefona = "062566552",
                DatumRegistracije = DateTime.Now,
                Spol = spol[1],
                isAdmin = false,
                isKupac = false,
                isZaposlenik = true,
                DatumRodjenja = new DateTime(1998, month: 3, day: 15),
                DatumZaposlenja = DateTime.Now,
                AdresaStanovanja = "Alekse Santica 15",
                JMBG = "3241567483777",
                Prodavnica = prodavnice[1],
                jelObavijesten = true
            });





            komentar.Add(new Komentar()
            {
                Opis = "super",
                DatumKreiranja = datum1,
                KupacId = 2,
                ProdavnicaId=2
            }) ;
            komentar.Add(new Komentar()
            {
                Opis = "super prodavnica",
                DatumKreiranja = datum2,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super2",
                DatumKreiranja = datum3,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super prodavnica 1",
                DatumKreiranja = datum4,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super10",
                DatumKreiranja = datum5,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super prodavnica 2",
                DatumKreiranja = datum6,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super3",
                DatumKreiranja = datum6,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super prodavnica 3",
                DatumKreiranja = datum7,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super prodavnica4",
                DatumKreiranja = datum7,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super5",
                DatumKreiranja = datum7,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super6",
                DatumKreiranja = datum8,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super7",
                DatumKreiranja = datum8,
                KupacId = 2,
                ProdavnicaId = 2
            });
            komentar.Add(new Komentar()
            {
                Opis = "super6 prodavnica",
                DatumKreiranja = datum9,
                KupacId = 2,
                ProdavnicaId = 1
            });
            komentar.Add(new Komentar()
            {
                Opis = "super7 prodavnica",
                DatumKreiranja = datum9,
                KupacId = 2,
                ProdavnicaId = 1
            });
            komentar.Add(new Komentar()
            {
                Opis = "super7 prodavnica 7",
                DatumKreiranja = datum9,
                KupacId = 2,
                ProdavnicaId = 1
            });





            /*
            narudzbaStavka.Add(new NarudzbaStavka()
            {

            });

            narudzbe.Add(new Narudzba()
            {

            });

            narudzbe.Add(new Narudzba()
            {

            });
            */

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

            _dbContext.AddRange(spol);
            _dbContext.AddRange(skladista);
            _dbContext.AddRange(prodavnice);
            _dbContext.AddRange(skladisteProizvod);
            _dbContext.AddRange(korisnici);
            _dbContext.AddRange(zaposlenici);
            _dbContext.AddRange(admin);

            _dbContext.AddRange(proizvodSlika);
           
            _dbContext.SaveChanges();

            _dbContext.AddRange(komentar);
            _dbContext.SaveChanges();


            return Count();
        }
    }
}

