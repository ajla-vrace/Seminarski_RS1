using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper;
using OnlineShop.Modul1.Models;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProizvodSlikaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public ProizvodSlikaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class SlikaProizvodaVM
        {
            public int Id { get; set; }
            public int? proizvodId { get; set; }
            public string proizvodOpis { get; set; } 

            public string slika_nova { get; set; }  //za dodavanje
            //public FileContentResult? slika_postojeca { get; set; } //za gettanje
        }


        [HttpGet("id_fs")]
        public FileContentResult GetSlikaFS(int id)
        {
            byte[] bajtovi_slike = Fajlovi.Ucitaj("slike_proizvoda/" + id + ".jpg")
                                  ?? Fajlovi.Ucitaj("wwwroot/images/no_image.jpg");

            return File(bajtovi_slike, "image/jpg");
        }


        /*
        [HttpGet]
        public IQueryable<SlikaProizvodaVM> GetAll()
        {
            var data = context.ProizvodSlika.Select(x => new SlikaProizvodaVM
            {
                Id = x.Id,
                proizvodId = x.proizvodId,
                proizvodOpis = x.proizvod.Naziv,
                slika_postojeca = GetSlikaFS(x.Id)

            }).OrderByDescending(x => x.Id);

            return data;
        }
        */

        [HttpPost]
        public ActionResult Snimi (SlikaProizvodaVM x)
        {
            ProizvodSlika? ps;

            if (x.Id == 0)
            {
                ps = new ProizvodSlika();
                context.Add(ps);
            }
            else
            {
                ps = context.ProizvodSlika.FirstOrDefault(p => p.Id == x.Id);
            }

            ps.proizvodId = x.proizvodId;

            context.SaveChanges();

            if (x.slika_nova != null)
            {
                byte[] slika_bajtovi = x.slika_nova.ParsirajBase64();
                Fajlovi.Snimi(slika_bajtovi, "slike_proizvoda/" + ps.Id + ".jpg");
            }

            context.SaveChanges();

            return Ok();
        }


        [HttpGet("slikaByProizvodId")]
        public List<FileContentResult> GetSlikeByProizvodId(int id = 0)
        {
            var data = context.ProizvodSlika.Where(x => x.proizvodId == id).Select(s => s.Id);

            List<FileContentResult> prikaz = new List<FileContentResult>();

            foreach (var s_id in data)
            {
                byte[] bajtovi_slike = Fajlovi.Ucitaj("slike_proizvoda/" + s_id + ".jpg");
                if (bajtovi_slike != null)
                {
                    var slika_prikaz = File(bajtovi_slike, "image/jpg");
                    prikaz.Add(slika_prikaz);
                }

            }

            return prikaz;
        }


    }
}
