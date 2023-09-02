using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using static OnlineShop.Modul1.Controllers.ProdavnicaController;

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

        public class ProsjekInfo
        {
            public int ProdavnicaId { get; set; }
            public double Prosjek { get; set; }
        }

        


        [HttpGet]
        public ActionResult GetAllProsjek()
        {
            double suma = 0;
            int brojac = 0;
            var data = _dbContext.Ocjena.ToList();
            var prodavnice = _dbContext.Prodavnica.ToList();
            List<ProsjekInfo> prosjeci = new List<ProsjekInfo>();
            for (int i = 0; i < prodavnice.Count; i++)
            {
                for (int j = 0; j < data.Count; j++)
                {
                    if (data[j].ProdavnicaId == prodavnice[i].Id)
                    {
                        suma = suma + data[j].OcjenaBrojcano;
                        brojac++;
                    }
                }
                if(brojac > 0)
                {
                    double prosjek = suma / brojac;
                    prosjeci.Add(new ProsjekInfo { ProdavnicaId = prodavnice[i].Id, Prosjek = prosjek });     
                }
                else
                {
                    prosjeci.Add(new ProsjekInfo { ProdavnicaId = prodavnice[i].Id, Prosjek = 0.00 }); 
                }
                suma = 0;
                brojac = 0;
                
            }
            return Ok(prosjeci.ToList());
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
            public int? skladisteId { get; set; }
            public string skladisteOpis { get; set; }
            public bool? aktivna { get; set; }
        }

        [HttpPost("Snimi")]
        public ActionResult Snimi(ProdavnicaGetAllVM x)
        {
            Prodavnica? p;

            if (x.id == 0)
            {
                p = new Prodavnica();
                _dbContext.Add(p);
            }
            else
            {
                p = _dbContext.Prodavnica.Find(x.id);
                if (p == null)
                    return BadRequest("pogresan id"); 
            }

            p.Naziv = x.naziv;
            p.Adresa = x.adresa;
            p.BrojTelefona = x.brojTelefona;
            p.Povrsina = x.povrsina;
            p.gradId = x.gradId;
            p.skladisteId = x.skladisteId;
            p.aktivna = x.aktivna;

            _dbContext.SaveChanges();

            return Ok(p);
        }

        //[HttpDelete("prodId")]
        //public ActionResult DeleteProdavnica(int id)
        //{
        //    Prodavnica? p = _dbContext.Prodavnica.Find(id);

        //    List<Skladiste> lista_skladista = _dbContext.Skladiste.Where(x => x.prodavnicaId == id).ToList();

        //    if(lista_skladista.Count > 0){
        //        foreach (var item in lista_skladista)
        //        {
        //            List<SkladisteProizvod> lista_sp = _dbContext.SkladisteProizvod.Where(x => x.skladisteId == item.Id).ToList();

        //            foreach (var sp in lista_sp)
        //            {
        //                _dbContext.Remove(sp);
        //                _dbContext.SaveChanges();
        //            }

        //            _dbContext.Remove(item);
        //            _dbContext.SaveChanges();
        //        }
        //    }

        //    if (id == 0)
        //        return BadRequest("pogresan id=0");

        //    if(p==null)
        //        return BadRequest("pogresan id");

        //    _dbContext.Remove(p);
        //    _dbContext.SaveChanges();

        //    return Ok();
        //}


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
                gradOpis = x.grad.Naziv,
                skladisteId=x.skladisteId,
                skladisteOpis=x.skladiste.Naziv +" - "+x.skladiste.Adresa,
                aktivna=x.aktivna
            }).AsQueryable().OrderByDescending(x=>x.id).ToList();
        }


        public class ProdavnicaGetVM
        {
            public int Id { get; set; }
            public string Adresa { get; set; }
            public float ProsjecnaOcjena { get; set; }      
        }

        [HttpGet("prosjecnaOcjena")]
        public ActionResult GetProsjecnuOcjenu(int prodavnica_id)
        {
            List<Ocjena>? lista_ocjena = _dbContext.Ocjena.Where(x => x.ProdavnicaId == prodavnica_id).ToList();

            float prosjek = 0;
            int suma = 0;

            if (lista_ocjena.Count() > 0)
            {
                foreach (var item in lista_ocjena)
                {
                    suma += item.OcjenaBrojcano;
                }

                prosjek = suma / lista_ocjena.Count();
            }

            return Ok(prosjek);
        }
    }
}
