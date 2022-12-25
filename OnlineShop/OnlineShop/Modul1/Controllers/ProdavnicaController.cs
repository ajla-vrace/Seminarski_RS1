using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdavnicaController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ProdavnicaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class CmbStavke
        {
            public int Id { get; set; }
            public string adresa { get; set; }
        }

        [HttpGet]
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

        public class ProdavnicaGetAllVM
        {
            public int id { get; set; }
            public string naziv { get; set; }
            public string adresa { get; set; }
            public string brojTelefona { get; set; }
            public string povrsina { get; set; }
            public int gradId { get; set; }
            public string gradOpis { get; set; }
        }

        [HttpGet("all")]
        public List<ProdavnicaGetAllVM> GetAllProdavnice()
        {
            return context.Prodavnica.Select(x => new ProdavnicaGetAllVM
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
