using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                objekat.Status = "Pravi se";
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
            objekat.Ukupno = (float)x.Ukupno;
            objekat.UkupnoProizvoda = (int)x.UkupnoProizvoda;
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
                    Total = totalSvega,
                    UkupnoProizvoda = brojProizvoda,
                    Evidentirao=s.Evidentirao,
                    Status=s.Status 
                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpGet("{NarudzbaId}")]
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
        public List<NarudzbaVM> Sve()
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

            return _narudzbeLista;
        
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
                nazivProdavnice = x.Prodavnica.Naziv,
                Status = x.Status
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
                    ProizvodNaziv=x.Proizvod.Naziv
                }).ToList();

            var objekat = new DetaljiKupacNarudzba { kupac = _kupac, narudzba = narudzba, narudzbaStavka = stavke };

            return objekat;
        }
    }
}
