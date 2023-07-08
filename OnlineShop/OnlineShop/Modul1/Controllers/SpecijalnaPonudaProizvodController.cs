using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecijalnaPonudaProizvodController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public SpecijalnaPonudaProizvodController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public class SpecijalnePonudeVM
        {
            public int Id { get; set; }
            public string Naziv { get; set; }
            public DateTime datum_pocetka { get; set; }
            public DateTime datum_zavrsetka { get; set; }
            public bool? aktivna { get; set; }
        }

        public class SpecijalnePonudeVMGet
        {
            public int Id { get; set; }
            public string Naziv { get; set; }
            public string datum_pocetka { get; set; }
            public string datum_zavrsetka { get; set; }
            public bool? aktivna { get; set; }
        }


        public class SpecijalnePonudeProizvodVM
        {
            public int Id { get; set; }         
            public int? specijalnaPonudaId { get; set; }
            public string specijalnaPonudaOpis { get; set; }        
            public int? proizvodId { get; set; }
          //  public Proizvod? Proizvod { get; set; }
            public string proizvodOpis { get; set; }
            public int? popustId { get; set; }
            public string popustOpis { get; set; }
        }

        public class SpecijalnePonudeProizvodGetVM
        {
            public int Id { get; set; }
            public int? specijalnaPonudaId { get; set; }
            public string specijalnaPonudaOpis { get; set; }
            public int? proizvodId { get; set; }
            public string proizvodOpis { get; set; }
            public int? popustId { get; set; }
            public string popustOpis { get; set; }
            public Proizvod? proizvod { get; set; }
            public Popust? popust { get; set; }
            public float? cijenaSaPopustom { get; set; }
            public float? originalnaCijena { get; set; }
        }

        public class PopustVM
        {
            public int Id { get; set; }
            public float Opis { get; set; }
        }

        [HttpGet("Specijalne_ponude")]
        //[Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public IQueryable<SpecijalnePonudeVM> GetSpecijalnePonude()
        {
            var data = context.SpecijalnaPonuda.Select(x => new SpecijalnePonudeVM
            {
                Id=x.Id,
                Naziv=x.Naziv,
                datum_pocetka=x.datum_pocetka,
                datum_zavrsetka=x.datum_zavrsetka,
                aktivna=x.aktivna
            }).ToList().AsQueryable().OrderByDescending(x => x.Id);
            return data;
        }



        [HttpGet("Specijalne_ponude_opadajuci")]
      //  [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public IQueryable<SpecijalnePonudeVMGet> GetSpecijalnePonudeOpadajuci()
        {
            var data = context.SpecijalnaPonuda.Select(x => new SpecijalnePonudeVMGet
            {
                Id = x.Id,
                Naziv = x.Naziv,
                datum_pocetka = x.datum_pocetka.ToString("yyyy-MM-dd"),
                datum_zavrsetka = x.datum_zavrsetka.ToString("yyyy-MM-dd"),
                aktivna = x.aktivna
            }).ToList().AsQueryable().OrderByDescending(x => x.datum_pocetka).ThenByDescending(x=>x.datum_zavrsetka);
            return data;
        }

        [HttpGet("Specijalne_ponude_rastuci")]
      //  [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public IQueryable<SpecijalnePonudeVMGet> GetSpecijalnePonudeRastuci()
        {
            var data = context.SpecijalnaPonuda.Select(x => new SpecijalnePonudeVMGet
            {
                Id = x.Id,
                Naziv = x.Naziv,
                datum_pocetka = x.datum_pocetka.ToString("yyyy-MM-dd"),
                datum_zavrsetka = x.datum_zavrsetka.ToString("yyyy-MM-dd"),
                aktivna = x.aktivna
            }).ToList().AsQueryable().OrderBy(x => x.datum_pocetka).ThenBy(x => x.datum_zavrsetka);
            return data;
        }


        [HttpGet("Specijalne_ponude_proizvod")]
      //  [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public IQueryable<SpecijalnePonudeProizvodGetVM> GetSpecijalnePonudeProizvod()
        {
            var data = context.SpecijalnaPonudaProizvod.Select(x => new SpecijalnePonudeProizvodGetVM
            {
                Id = x.Id,
                specijalnaPonudaId=x.specijalnaPonudaId,
                specijalnaPonudaOpis=x.specijalnaPonuda.Naziv,
                proizvodId=x.proizvodId,
                //proizvod=x.proizvod,
                proizvodOpis=x.proizvod.Naziv,
                popustId=x.popustId,

                //popustOpis=x.popust.Opis

                popustOpis=x.popust.Opis.ToString(),
                proizvod=x.proizvod,
                popust=x.popust,
                cijenaSaPopustom=x.CijenaSaPopustom,
                originalnaCijena=x.OriginalnaCijena

            }).ToList().AsQueryable().OrderByDescending(x => x.Id);
            return data;      
        }
        

        [HttpGet("Popust")]
        public IQueryable<PopustVM> GetPopuste()
        {
            return context.Popust.Select(x => new PopustVM
            {
                Id = x.Id,
                Opis = x.Opis
            }).ToList().AsQueryable().OrderByDescending(x=>x.Id);
        }


        [HttpPost("post_sp")]
        [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult SnimiSP(SpecijalnePonudeVM x)
        {
            SpecijalnaPonuda? sp;
   
            if (x.Id == 0)
            {
                sp = new SpecijalnaPonuda();
                context.Add(sp);

                if (x.Naziv == "" && x.datum_pocetka == null && x.datum_zavrsetka == null)
                    return BadRequest("Nisu unesena obavezna polja.");
                if (!UslovIspravan(x.datum_pocetka, x.datum_zavrsetka,x.Id).uslovIspravan)
                    return BadRequest("Validacija datuma nije ispravna");

            }
            else
            {
                sp = context.SpecijalnaPonuda.Find(x.Id);
                if (sp == null)
                    return BadRequest("pogresan id");
            }

            
            sp.Naziv = x.Naziv;
            sp.datum_pocetka = x.datum_pocetka;
            sp.datum_zavrsetka = x.datum_zavrsetka;
            sp.aktivna = x.aktivna;
           
            context.SaveChanges();

            return Ok();
        }

        public class SPAktivna
        {
            public int id { get; set; }
            public bool? aktivna { get; set; }
        }

        [HttpPost("post_aktivna_sp")]
        public ActionResult PostAktivna(SPAktivna s)
        {
            SpecijalnaPonuda? sp = context.SpecijalnaPonuda.Find(s.id);
            if (sp != null)
            {
                sp.aktivna = s.aktivna;
                context.Update(sp);
                context.SaveChanges();
            }
            return Ok();
        }

        public class UslovDatum
        {
            public bool uslovIspravan { get; set; }
            public int spId { get; set; }
        }

        [HttpGet("uporediDatume")]
        public UslovDatum UslovIspravan(DateTime datumUnosPocetak,DateTime datumUnosZavrsetak, int sp_id)
        {
            DateTime min_datum_pocetka, max_datum_zavrsetka;

            if (sp_id != 0) //znaci da je editovanje. ne treba razmatrati datume koji se edituju
            {
                min_datum_pocetka = context.SpecijalnaPonuda.Where(x=>x.Id!=sp_id).OrderBy(x => x.datum_pocetka).Select(x => x.datum_pocetka).ToList()[0];
                max_datum_zavrsetka = context.SpecijalnaPonuda.Where(x => x.Id != sp_id).OrderByDescending(x => x.datum_zavrsetka).Select(x => x.datum_zavrsetka).ToList()[0];
            }
            else
            {
                min_datum_pocetka = context.SpecijalnaPonuda.OrderBy(x => x.datum_pocetka).Select(x => x.datum_pocetka).ToList()[0];
                max_datum_zavrsetka = context.SpecijalnaPonuda.OrderByDescending(x => x.datum_zavrsetka).Select(x => x.datum_zavrsetka).ToList()[0];
            }

            var uslov = (datumUnosPocetak.Date >= DateTime.Now.Date && 
                ((datumUnosPocetak.Date < datumUnosZavrsetak.Date && datumUnosZavrsetak.Date < min_datum_pocetka.Date)
                   || (datumUnosZavrsetak.Date > datumUnosPocetak.Date && datumUnosPocetak.Date > max_datum_zavrsetka.Date)));

            return new UslovDatum { uslovIspravan = uslov, spId = sp_id };
        
        }

        [HttpPost("post_spp")]
        [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult SnimiSPP(SpecijalnePonudeProizvodVM x)
        {
            SpecijalnaPonudaProizvod? spp;

            if(context.SpecijalnaPonudaProizvod.Where(s=>s.specijalnaPonudaId==x.specijalnaPonudaId)
                .ToList().Count() >= 5)
            {
                return BadRequest("ne mozete dodavati vise od 5 proizvoda za jednu specijalnu ponudu.");
            }

            var cijena = context.Proizvod.Where(p => p.Id == x.proizvodId).Select(x => x.Cijena).ToList()[0];
            var popust = context.Popust.Where(p => p.Id == x.popustId).Select(x => x.Opis).ToList()[0];

            if (x.Id == 0)
            {
                spp = new SpecijalnaPonudaProizvod();
                spp.OriginalnaCijena = MathF.Round(cijena, 2);
                context.Add(spp);           
            }
            else
            {
                spp = context.SpecijalnaPonudaProizvod.Find(x.Id);
                if (spp == null)
                    return BadRequest("pogresan id");
            }

            spp.specijalnaPonudaId = x.specijalnaPonudaId;
            spp.proizvodId = x.proizvodId;
            spp.popustId = x.popustId;
            spp.CijenaSaPopustom = MathF.Round((cijena - (cijena * popust)),2);
           
            context.SaveChanges();

            return Ok();
        }

        [HttpPost("post_popust")]
        [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult SnimiPopust(PopustVM x)
        {
            Popust? p;

            if (x.Id == 0)
            {
                p = new Popust();
                context.Add(p);

                if (x.Opis == null)
                    return BadRequest("Niste unijeli obavezno polje.");
            }
            else
            {
                p = context.Popust.Find(x.Id);
                if (p == null)
                    return BadRequest("pogresan id");
            }

            p.Opis = x.Opis;

            context.SaveChanges();

            return Ok();
        }

        [HttpDelete("del_sp")]
       // [Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult DeleteSP (int id)
        {
            SpecijalnaPonuda? sp = context.SpecijalnaPonuda.Find(id);

            List<SpecijalnaPonudaProizvod> lista_spp = context.SpecijalnaPonudaProizvod.Where(x => x.specijalnaPonudaId == id).ToList();

            if (lista_spp.Count() > 0)
            {
                foreach (var item in lista_spp)
                {
                    context.Remove(item);
                    context.SaveChanges();
                }
            }

            if (sp != null)
            {
                context.Remove(sp);
                context.SaveChanges();
            }
            return Ok(sp);
        }

        [HttpDelete("del_popust")]
        //[Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult DeleteP(int id)
        {
            Popust? p = context.Popust.Find(id);

            List<SpecijalnaPonudaProizvod> lista_spp=context.SpecijalnaPonudaProizvod.Where(x=>x.popustId==id).ToList();

            if (lista_spp.Count() > 0)
            {
                foreach (var item in lista_spp)
                {
                    context.Remove(item);
                    context.SaveChanges();
                }
            }

            if (p != null)
            {
                context.Remove(p);
                context.SaveChanges();
            }
            return Ok(p);
        }

        [HttpDelete("del_spp")]
        //[Autorizacija(Kupac: false, Zaposlenik: false, Admin: true)]
        public ActionResult DeleteSPP(int id)
        {
            SpecijalnaPonudaProizvod? p = context.SpecijalnaPonudaProizvod.Find(id);
            if (p != null)
            {
                context.Remove(p);
                context.SaveChanges();
            }
            return Ok(p);
        }

    }
}
