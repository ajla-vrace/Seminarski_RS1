using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SezonaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public SezonaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class SezonaVM
        {
            public int Id { get; set; }
            public string Naziv { get; set; }
            public string Doba { get; set; }
            public string Godina { get; set; }
        }

        [HttpGet("getKolekcije")] 
        public List<Kolekcija> GetKolekcijeBySezonaID(int id)
        {
            return context.Kolekcija.Where(x => x.sezonaId == id).ToList();
        }

        [HttpGet("sezone")]
        public List<SezonaVM> GetAll()
        {
            return context.Sezona.Select(x => new SezonaVM
            {
                Id=x.Id,
                Naziv=x.Naziv,
                Doba=x.Doba,
                Godina=x.Godina
            }).ToList();
        }
        
    }
}
