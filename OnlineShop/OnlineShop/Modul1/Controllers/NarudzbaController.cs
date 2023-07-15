using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using System.Security.Cryptography;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class NarudzbaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public NarudzbaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] NarudzbaVM x)
        {
            Narudzba? objekat;
            
            // objekat.Id = x.Id;
            
            if (x.Id == 0)
            {
                objekat = new Narudzba();
                _dbContext.Add(objekat);
                objekat.Status = "Nova";
            }
            else
            {
                objekat = _dbContext.Narudzba.Find(x.Id);
                objekat.Status = x.Status;
            }
            objekat.KupacId = x.KupacId;
            objekat.DatumKreiranja = DateTime.Now;
            objekat.ProdavnicaId = x.ProdavnicaId;
            /*objekat.DatumPreuzimanja = (DateTime)x.DatumPreuzimanja;*/
            int? kupacid = x.KupacId;
            /*List<Korpa> korpa = _dbContext.Korpa
                .Where(s => s.KupacId == x.KupacId).ToList();
            for (int i = 0; i < korpa.Count; i++)
            {
                objekat.Ukupno = korpa[i].Total;
                objekat.UkupnoProizvoda = korpa[i].UkupnoProizvoda;
            }*/
            Korpa? korpa = _dbContext.Korpa.FirstOrDefault(s => s.KupacId == kupacid);
            if (korpa != null)
            {
                objekat.Ukupno = korpa.Total;
                objekat.UkupnoProizvoda = korpa.UkupnoProizvoda;
            }
            /*objekat.Ukupno = (float)x.Ukupno;
            objekat.UkupnoProizvoda = (int)x.UkupnoProizvoda;*/
            objekat.Evidentirao = x.Evidentirao;
            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
            float totalSvega = default;
            int brojProizvoda = 0;
            List<NarudzbaStavka> stavkeTeNarudzbe = _dbContext.NarudzbaStavka.ToList();
            for (int i = 0; i < stavkeTeNarudzbe.Count; i++)
            {
                totalSvega += stavkeTeNarudzbe[i].Total;
                brojProizvoda += stavkeTeNarudzbe[i].Kolicina;
            }

            var data = _dbContext.Narudzba
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    Id = s.Id,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    Prodavnica=s.Prodavnica.Naziv,
                    DatumKreiranja = s.DatumKreiranja,
                    DatumPreuzimanja = s.DatumPreuzimanja,
                   // Total = s.Ukupno,
                    //UkupnoProizvoda = s.UkupnoProizvoda,
                    Evidentirao=s.Evidentirao,
                    Status=s.Status 
                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpGet]
        public ActionResult GetByIdNarudzbe(int narudzbaId)
        {
            float totalSvega = default;
            int brojProizvoda = 0;
            List<NarudzbaStavka> stavkeTeNarudzbe = _dbContext.NarudzbaStavka
                .Where(s=>s.NarudzbaId==narudzbaId)
                .ToList();
            for (int i = 0; i < stavkeTeNarudzbe.Count; i++)
            {
                totalSvega += stavkeTeNarudzbe[i].Total;
                brojProizvoda += stavkeTeNarudzbe[i].Kolicina;
            }

            var data = _dbContext.Narudzba
                .OrderByDescending(s => s.Id)
                .Where(s=>s.Id==narudzbaId)
                .Select(s => new
                {
                    Id = s.Id,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    Prodavnica = s.Prodavnica.Naziv,
                    DatumKreiranja = s.DatumKreiranja,
                    DatumPreuzimanja = s.DatumPreuzimanja,
                    Total = totalSvega,
                    UkupnoProizvoda = brojProizvoda,
                    Evidentirao = s.Evidentirao,
                    Status = s.Status
                })
                .AsQueryable();


            return Ok(data.ToList());
        }

        [HttpGet]
        public ActionResult GetByIdKupca(int kupacId)
        {
            
            float totalSvega = default;
            int brojProizvoda = 0;
           /* List<Narudzba> KupacNarudzbe = _dbContext.Narudzba
                .Where(s => s.KupacId == kupacId)
                .ToList();*/
            /*for (int i = 0; i < KupacNarudzbe.Count; i++)
            {
                totalSvega += KupacNarudzbe[i].Total;
                brojProizvoda += KupacNarudzbe[i].Kolicina;
            }*/

            var data = _dbContext.Narudzba
                .OrderByDescending(s => s.Id)
                .Where(s=>s.KupacId==kupacId)
                .Select(s => new
                {
                    Id = s.Id,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    Prodavnica = s.Prodavnica.Naziv,
                    ProdavnicaAdresa=s.Prodavnica.Adresa,
                    DatumKreiranja = s.DatumKreiranja,
                    DatumPreuzimanja = s.DatumPreuzimanja,
                    Total = s.Ukupno,
                    UkupnoProizvoda = s.UkupnoProizvoda,
                    Evidentirao = s.Evidentirao,
                    Status = s.Status 
                })
                .AsQueryable();


            return Ok(data.ToList());
        }




        [HttpGet]
        public IQueryable<NarudzbaVM> Sve()
        {
            var _narudzbe = _dbContext.Narudzba.Select(x=>x.Id).Distinct().ToList();
            var _narudzbeLista = new List<NarudzbaVM>();

            foreach (var nid in _narudzbe)
            {
                var total = _dbContext.NarudzbaStavka.Where(x => x.NarudzbaId == nid).Select(x => x.Total).Sum();
                var ukupnoPr=_dbContext.NarudzbaStavka.Where(x=>x.NarudzbaId==nid).Select(x=>x.Kolicina).Sum(); 
                var narudzba = _dbContext.Narudzba.Where(x => x.Id == nid).Select(x => new NarudzbaVM
                {
                    Id = x.Id,
                    DatumKreiranja = x.DatumKreiranja,
                    DatumPreuzimanja = x.DatumPreuzimanja,
                    Ukupno = total,
                    UkupnoProizvoda = ukupnoPr,
                    Evidentirao = x.Evidentirao,
                    KupacId = x.KupacId,
                    KupacNaziv = x.Kupac.Ime + " " + x.Kupac.Prezime,
                    ProdavnicaId = x.ProdavnicaId,
                    nazivProdavnice = x.Prodavnica.Naziv,
                    Status = x.Status
                }).ToList()[0];

                _narudzbeLista.Add(narudzba);
            }

            return _narudzbeLista.OrderByDescending(x=>x.Id).AsQueryable();
        
        }

        public class DetaljiKupacNarudzba
        {
            public Kupac kupac { get; set; }
            public NarudzbaVM narudzba { get; set; }
            public List<NarudzbaStavkaVM> narudzbaStavka { get; set; }
        }

        [HttpGet]
        public DetaljiKupacNarudzba GetKupcaIDetaljeNarudzbe(int narudzba_id)
        {
            var _kupac = _dbContext.Narudzba.Where(x => x.Id == narudzba_id).Select(x=>x.Kupac).ToList()[0];

            //var kupac = new KupacVM
            //{
            //    Id=_kupac.Id,
            //    Ime=_kupac.Ime,
            //    Prezime=_kupac.Prezime,
            //    Email=_kupac.Email,
            //    BrojTelefona=_kupac.BrojTelefona,
            //    DatumPretplate=_kupac.DatumPretplate,   
            //    DatumPrveNarudzbe=_kupac.DatumPrveNarudzbe,
            //    DatumRegistracije=_kupac.DatumRegistracije,
            //    AdresaIsporuke=_kupac.AdresaIsporuke,
            //    spolOpis=_kupac.Spol.Naziv,
            //    isPretplacen=_kupac.isPretplacen,
            //    Username=_kupac.Username
            //};
           
            var total = _dbContext.NarudzbaStavka.Where(x => x.NarudzbaId == narudzba_id).Select(x => x.Total).Sum();
            var ukupnoPr = _dbContext.NarudzbaStavka.Where(x => x.NarudzbaId == narudzba_id).Select(x => x.Kolicina).Sum();

            var narudzba = _dbContext.Narudzba.Where(x => x.Id == narudzba_id).Select(x=>new NarudzbaVM
            {
                Id = x.Id,
                DatumKreiranja = x.DatumKreiranja,
                DatumPreuzimanja = x.DatumPreuzimanja,
                Ukupno = total,
                UkupnoProizvoda = ukupnoPr,
                Evidentirao = x.Evidentirao,
                KupacId = x.KupacId,
                KupacNaziv = x.Kupac.Ime + " " + x.Kupac.Prezime,
                ProdavnicaId = x.ProdavnicaId,
                nazivProdavnice = x.Prodavnica.Adresa,
                Status = x.Status,
                PrethodniStatus=x.PrethodniStatus,
                jel_kliknuo_otkazana=x.jel_kliknuo_otkazana
            }).ToList()[0];

            var stavke = _dbContext.NarudzbaStavka.Where(x => x.NarudzbaId == narudzba_id)
                .Select(x=>new NarudzbaStavkaVM
                {
                    Id=x.Id,
                    Cijena=x.Cijena,
                    Kolicina=x.Kolicina,
                    Total=x.Total,
                    NarudzbaId=x.NarudzbaId,
                    ProizvodId=x.ProizvodId,
                    ProizvodNaziv=x.Proizvod.Naziv,
                    SifraProizvoda=x.Proizvod.Sifra,
                    Velicina=x.Velicina
                }).ToList();

            var objekat = new DetaljiKupacNarudzba { kupac = _kupac, narudzba = narudzba, narudzbaStavka = stavke };

            return objekat;
        }

        //[HttpPost]
        //public ActionResult Snimi(int id_narudzbe, string evidentirao)
        //{
        //    var narudzba = _dbContext.Narudzba.Find(id_narudzbe);

        //    if (narudzba != null)
        //    {
        //        narudzba.Evidentirao = evidentirao;
        //        _dbContext.Update(narudzba);
        //        _dbContext.SaveChanges();
        //    }
        //    return Ok(narudzba);
        //} 

        public class SetStatus
        {
            public int narudzbaId { get; set; }
            public string status { get; set; }
            public string evidentirao { get; set; }
        }

        [HttpPost] 
        public ActionResult PromijeniStatus(SetStatus s)
        {
            var narudzba = _dbContext.Narudzba.Find(s.narudzbaId);
           
            if (narudzba != null)
            {
                narudzba.PrethodniStatus = narudzba.Status;
                narudzba.Status = s.status;
                narudzba.Evidentirao = s.evidentirao;
                narudzba.jel_promijenjen_status = true;
                narudzba.jel_poslana_prouka = false;
                _dbContext.Update(narudzba);
                _dbContext.SaveChanges();
            }
            return Ok(narudzba);
        }

        [HttpPost]
        public ActionResult PosaljiPoruku(int narId)
        {
            var narudzba = _dbContext.Narudzba.Find(narId);

            if (narudzba != null)
            { 
                narudzba.jel_promijenjen_status = false;
                narudzba.jel_poslana_prouka = true;
                _dbContext.Update(narudzba);
                _dbContext.SaveChanges();
            }
            return Ok(narudzba);
        }

        [HttpGet]
        public ActionResult zaEmail (int narId)
        {
            var narudzba = _dbContext.Narudzba.Find(narId);

            if (narudzba != null)
            {
                return Ok(new
                {
                    jel_promijenjen_status = narudzba.jel_promijenjen_status,
                    jel_poslana_poruka = narudzba.jel_poslana_prouka
                });
            }
            return Ok("nema tog narId");
        }

        [HttpGet]
        public ActionResult BrojNovihNarudzbi()
        {
            var broj = _dbContext.Narudzba.Where(x => x.Status == "Nova").ToList().Count();
            var brojOtk = _dbContext.Narudzba.Where(x => x.jel_kliknuo_otkazana==false && x.Status=="Otkazana").ToList().Count();
            string poruka = broj > 0 ? $"Imate {broj} novih narudžbi!" : "Trenutno nemate novih narudžbi.";
            string poruka2 = brojOtk > 0 ? $"Imate {brojOtk} otkazanih narudžbi!" : "Trenutno nemate otkazanih narudžbi.";
            return Ok(new { BrojNovih = broj, PorukaNove = poruka, BrojOtk=brojOtk, PorukaOtk=poruka2 });
        }


        [HttpPut("otkazana")]
        public ActionResult PostOtkazana(int narId)
        {
            var nar = _dbContext.Narudzba.Find(narId);
            if (nar != null && nar.Status=="Otkazana" && nar.jel_kliknuo_otkazana!=true) 
            {
                nar.jel_kliknuo_otkazana = true;
                _dbContext.Update(nar);
                _dbContext.SaveChanges();
            }
            return Ok();
        }




        [HttpGet]
        public ActionResult BrojStatusa()
        {
            var narudzbe = _dbContext.Narudzba.ToList();
            var nova = narudzbe.Where(s => s.Status == "Nova").Count();
            var spremna = narudzbe.Where(s => s.Status == "Spremna").Count();
            var otkazana = narudzbe.Where(s => s.Status == "Otkazana").Count();
            var preuzeta = narudzbe.Where(s => s.Status == "Preuzeta").Count();
           // var istekla = narudzbe.Where(s => s.Status == "Istekla").Count();
            var ponistena = narudzbe.Where(s => s.Status == "Ponistena").Count();
            return Ok(new
            {
                _nova = nova,
                _spremna = spremna,
                _otkazana = otkazana,
                _preuzeta = preuzeta,
               // _istekla = istekla,
                _ponistena = ponistena
            });
        }

        [HttpGet]
        public ActionResult SortByStatus(string status)
        {
            List<NarudzbaVM> podaci = new List<NarudzbaVM>();
            if (status == "Sve")
                podaci = _dbContext.Narudzba.OrderByDescending(x => x.Id).Select(x => new NarudzbaVM
                {
                    Id = x.Id,
                    DatumKreiranja = x.DatumKreiranja,
                    DatumPreuzimanja = x.DatumPreuzimanja,
                    Ukupno = x.Ukupno,
                    UkupnoProizvoda = x.UkupnoProizvoda,
                    Evidentirao = x.Evidentirao,
                    KupacId = x.KupacId,
                    KupacNaziv = x.Kupac.Ime + " " + x.Kupac.Prezime,
                    ProdavnicaId = x.ProdavnicaId,
                    nazivProdavnice = x.Prodavnica.Adresa,
                    Status = x.Status,
                    PrethodniStatus=x.PrethodniStatus,
                    jel_kliknuo_otkazana=x.jel_kliknuo_otkazana,
                    jel_promijenjen_status=x.jel_promijenjen_status
                }).ToList(); 
            else if (status !="Sve")
                podaci = _dbContext.Narudzba.OrderByDescending(x => x.Id).Where(x => x.Status == status).Select(x => new NarudzbaVM
                {
                    Id = x.Id,
                    DatumKreiranja = x.DatumKreiranja,
                    DatumPreuzimanja = x.DatumPreuzimanja,
                    Ukupno = x.Ukupno,
                    UkupnoProizvoda = x.UkupnoProizvoda,
                    Evidentirao = x.Evidentirao,
                    KupacId = x.KupacId,
                    KupacNaziv = x.Kupac.Ime + " " + x.Kupac.Prezime,
                    ProdavnicaId = x.ProdavnicaId,
                    nazivProdavnice = x.Prodavnica.Adresa,
                    Status = x.Status,
                    PrethodniStatus = x.PrethodniStatus,
                    jel_kliknuo_otkazana = x.jel_kliknuo_otkazana,
                    jel_promijenjen_status = x.jel_promijenjen_status
                }).ToList();
            return Ok(podaci);
        }
    }
}
