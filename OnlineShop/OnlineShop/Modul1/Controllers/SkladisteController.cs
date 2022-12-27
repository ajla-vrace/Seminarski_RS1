using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkladisteController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public SkladisteController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Skladiste> GetAll()
        {
            return context.Skladiste.ToList();
        }

    }
}
