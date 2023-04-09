using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidacijaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public ValidacijaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class Email
        {
            public int id { get; set; }
            public string email { get; set; }
        }

        public class Telefon
        {
            public int id { get; set; }
            public string? telefon { get; set; }
        }

        [HttpGet("emails")]
        public List<Email> GetEmails()
        {
            var data = context.KorisnickiNalog.Select(x=>new Email
            {
                id=x.Id,
                email=x.Email
            }).ToList();

            return data;
        }

        [HttpGet("tels")]
        public List<Telefon> GetBrojeveTelefona()
        {
            var data = context.KorisnickiNalog.Where(x=>x.BrojTelefona!="").Select(x => new Telefon
            {
                id=x.Id,
                telefon=x.BrojTelefona.Replace("-","")
            }).ToList();

            return data;
        }
    }
}
