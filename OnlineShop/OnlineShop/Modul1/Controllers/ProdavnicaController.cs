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
    public class ProdavnicaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ProdavnicaController(ApplicationDbContext context)
        {
            this._dbContext = context;
        }

        public class CmbStavke
        {
            public int Id { get; set; }
            public string adresa { get; set; }
        }

        [HttpGet]
        public List<CmbStavke> GetCmbStavkeProdavnice()
        {
            var data = _dbContext.Prodavnica.OrderBy(x => x.Adresa)
                .Select(x => new CmbStavke
                {
                    Id = x.Id,
                    adresa = x.Adresa,

                }).ToList();

            return data;
        }

        [HttpPost]
        public ActionResult Add([FromBody] ProdavnicaVM x)
        {
            Prodavnica objekat;
            objekat = new Prodavnica();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
           
            objekat.Adresa = x.Adresa;
            objekat.Naziv = x.Naziv;
            objekat.BrojTelefona = x.BrojTelefona;
            objekat.Povrsina = x.Povrsina;
            objekat.gradId = x.GradId;

            _dbContext.SaveChanges();
            return Ok(objekat);
        }






        [HttpGet("id")] 
        public List<Prodavnica> GetAll1()
        {
            var priprema = _dbContext.Prodavnica.ToList();

            return priprema;
        }
        [HttpGet]
        public ActionResult GetByAll()
        {
            var data = _dbContext.Prodavnica
                .OrderBy(s => s.Id)
                .Select(s => new
                {
                    id = s.Id,
                    naziv = s.Naziv,
                    adresa = s.Adresa,
                    brojTelefona = s.BrojTelefona,
                    grad = s.grad.Naziv
                })
                .AsQueryable();
            return Ok(data.ToList());
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Prodavnica
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    id=s.Id,
                     naziv= s.Naziv,
                    adresa = s.Adresa,
                    brojTelefona = s.BrojTelefona,
                    povrsina = s.Povrsina,
                    //gradId=s.gradId,
                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        public class ProdavnicaGetAllVM
        {
            public int id { get; set; }
            public string naziv { get; set; }
            public string adresa { get; set; }
            public string brojTelefona { get; set; }
            public string povrsina { get; set; }
            public int? gradId { get; set; }
            public string gradOpis { get; set; }
        }

        [HttpGet("all")]
        public List<ProdavnicaGetAllVM> GetAllProdavnice()
        {
            return _dbContext.Prodavnica.Select(x => new ProdavnicaGetAllVM
            {
                id = x.Id,
                naziv = x.Naziv,
                adresa = x.Adresa,
                brojTelefona = x.BrojTelefona,
                povrsina = x.Povrsina,
                gradId = x.gradId,
                gradOpis = x.grad.Naziv
            }).AsQueryable().ToList();
        }
    }
}
