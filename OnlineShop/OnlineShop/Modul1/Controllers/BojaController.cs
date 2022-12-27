using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BojaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public BojaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Boja> GetAll()
        {
            return context.Boja.ToList();
        }
    }
}
