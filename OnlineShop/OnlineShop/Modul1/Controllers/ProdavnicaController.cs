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
        private readonly ApplicationDbContext context;

        public ProdavnicaController(ApplicationDbContext _context)
        {
            this.context = _context;
        }
        [HttpPost]
        public ActionResult Add([FromBody] ProdavnicaVM x)
        {
            Prodavnica objekat;
            objekat = new Prodavnica();
            // objekat.Id = x.Id;
            context.Add(objekat);
            
            objekat.Naziv = x.Naziv;
            objekat.Adresa = x.Adresa;
            objekat.BrojTelefona = x.BrojTelefona;
            objekat.Povrsina = x.Povrsina;
            objekat.gradId = x.gradId;

            context.SaveChanges();
            return Ok(objekat);
        }
        public class CmbStavke
        {
            public int Id { get; set; }
            public string adresa { get; set; }
        }

        /*[HttpGet]
        public List<CmbStavke> GetCmbStavkeProdavnice()
        {
            var data = context.Prodavnica.OrderBy(x => x.Adresa)
                .Select(x => new CmbStavke
                {
                    Id = x.Id,
                    adresa = x.Adresa
                }).ToList();

            return data;
        }
        */
        [HttpGet]
        public ActionResult GetByAll()
        {
            var data = context.Prodavnica
                .OrderBy(s => s.Id)
                .Select(s => new
                {
                    id = s.Id,
                    naziv = s.Naziv,
                    adresa=s.Adresa,
                    brojTelefona=s.BrojTelefona,
                    grad=s.grad.Naziv
                })
                .AsQueryable();
            return Ok(data.ToList());
        }

        public class ProdavnicaGetAllVM
        {
            public int id { get; set; }
            public string naziv { get; set; }
            public string adresa { get; set; }
            public string? brojTelefona { get; set; }
            public int? gradId { get; set; }
            public string? gradOpis { get; set; }
        }

        /*[HttpGet("all")]
        public List<ProdavnicaGetAllVM> GetAllProdavnice()
        {
            return context.Prodavnica.Select(x => new ProdavnicaGetAllVM
            {
                id = x.Id,
                naziv = x.Naziv,
                adresa = x.Adresa,
                brojTelefona = x.BrojTelefona,
                //povrsina = x.Povrsina,
                gradId = x.gradId,
                gradOpis = x.grad.Naziv
            }).AsQueryable().ToList();
        }*/
    }
}
