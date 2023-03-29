using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

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
        public ActionResult Add([FromBody] Narudzba x)
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
            objekat.ZaposlenikId=x.ZaposlenikId;
            objekat.DatumKreiranja = DateTime.Now;
            objekat.DatumPreuzimanja = x.DatumPreuzimanja;
            objekat.Ukupno = x.Ukupno;
            objekat.UkupnoProizvoda = x.UkupnoProizvoda;
            
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
                    ZaposlenikId=s.ZaposlenikId,
                    ZeposlenikIme=s.Zaposlenik.Ime,
                    KupacId = s.KupacId,
                    Kupac = s.Kupac.Username,
                    DatumKreiranja = s.DatumKreiranja,
                    DatumPreuzimanja = s.DatumPreuzimanja,
                    Total = totalSvega,
                    UkupnoProizvoda = brojProizvoda,

                })
                .AsQueryable();


            return Ok(data.ToList());
        }
    }
}
