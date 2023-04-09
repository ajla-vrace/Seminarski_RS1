using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PorukeController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public PorukeController(ApplicationDbContext context)
        {
            this.context = context;
        }
    }
}
