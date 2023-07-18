using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Data;
using OnlineShop.Helper;
using OnlineShop.Helper.AutentifikacijaAutorizacija;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProizvodController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ProizvodController(ApplicationDbContext context)
        {
            this.context = context;
        }

       

        public class ProizvodSnimi2VM
        {
            public int Id { get; set; }
            public int Sifra { get; set; }
            public string Naziv { get; set; }
            public float Cijena { get; set; }
            public string Opis { get; set; }
            public DateTime datum_kreiranja { get; set; }
            public DateTime? datum_modifikacije { get; set; }
            public bool Aktivan { get; set; }

            public int bojaId { get; set; }
            public string bojaOpis { get; set; }

            public int? odjelId { get; set; }
            public string odjelOpis { get; set; }

            public int? kategorijaId { get; set; }
            public string kategorijaOpis { get; set; }

            public int? podkategorijaId { get; set; }
            public string podkategorijaOpis { get; set; }

            public int? kolekcijaId { get; set; }
            public string kolekcijaOpis { get; set; }

            public int? sezonaId { get; set; }
            public string sezonaOpis { get; set; }

            public int skladisteId { get; set; }
            public int kolicina { get; set; }
        }


        [HttpGet("proizvodId")]
        public ProizvodVM GetProizvod(int proizvod_id)
        {
            var data = context.Proizvod.Where(x => x.Id == proizvod_id).Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId = x.bojaId,
                bojaOpis = x.boja.Naziv,
                odjelId = x.odjelId,
                odjelOpis = x.odjel.Naziv,
                kategorijaId = x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId = x.kolekcijaId,
                kolekcijaOpis = x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv,
                slika_postojeca = x.slika_postojeca,
                evidentirao=x.evidentirao,
                modifikovao=x.modifikovao
            }).ToList()[0];

            return data;
        }


        [HttpPost("drugiNacin")]
        public ActionResult Snimi2(ProizvodSnimi2VM x)
        {
            Proizvod? p;

            if (x.Id == 0)
            {
                p = new Proizvod();

                p.datum_kreiranja = DateTime.Now;
                p.Sifra = x.Sifra;

                context.Add(p);
            }
            else
            {
                p = context.Proizvod.Find(x.Id);
                if (p == null)
                    return BadRequest("pogrešan ID");
                p.datum_modifikacije = DateTime.Now;
            }

            p.Naziv = x.Naziv;
            p.Cijena = x.Cijena;
            p.Opis = x.Opis;
            p.Aktivan = x.Aktivan;
            p.bojaId = x.bojaId;
            p.odjelId = x.odjelId;
            p.kategorijaId = x.kategorijaId;
            p.podkategorijaId = x.podkategorijaId;
            p.sezonaId = x.sezonaId;
            p.kolekcijaId = x.kolekcijaId;
           
            context.SaveChanges();

            if (x.Id == 0)
            {
                SkladisteProizvod? sp = new SkladisteProizvod
                {
                    proizvodId = p.Id,
                    skladisteId = x.skladisteId,
                    kolicina = x.kolicina,
                    datum_kreiranja = DateTime.Now
                };
                context.Add(sp);
                context.SaveChanges();
            }

            return Ok();

        }


        [HttpPost]
        [Autorizacija(Kupac:false,Zaposlenik:true,Admin:true)]
        public ActionResult Snimi (ProizvodVM x)
        {
            Proizvod? p;

            if(x.Id==0)
            {
                p = new Proizvod();
                
                p.datum_kreiranja = DateTime.Now;
                p.Sifra = x.Sifra;
                p.evidentirao = x.evidentirao;

                context.Add(p);
            }
            else
            {
                p = context.Proizvod.Find(x.Id);
                if (p == null)
                    return BadRequest("pogrešan ID");
                p.datum_modifikacije = DateTime.Now;
                p.modifikovao = x.modifikovao;
            }

            p.Naziv = x.Naziv;
            p.Cijena = x.Cijena;
            p.Opis = x.Opis;
            p.Aktivan = x.Aktivan;
            p.bojaId = x.bojaId;
            p.odjelId = x.odjelId;
            p.kategorijaId = x.kategorijaId;
            p.podkategorijaId = x.podkategorijaId;
            p.sezonaId = x.sezonaId;
            p.kolekcijaId = x.kolekcijaId;

            context.SaveChanges();

            return Ok(p);

        }

        public class SetSezonuIKolekciju
        {
            public int proizvod_id { get; set; }
            public int? kolekcijaId { get; set; }
            public int? sezonaId { get; set; }
            public string? modifikovao { get; set; }
         
        }

        [HttpPost("sezkol")]
        public ActionResult DodajSezIKol(SetSezonuIKolekciju x)
        {
            Proizvod? p=context.Proizvod.Find(x.proizvod_id);

            if (p == null)
                return BadRequest("pogrešan ID");
            p.datum_modifikacije = DateTime.Now;

            p.sezonaId = x.sezonaId;
            p.kolekcijaId = x.kolekcijaId;
            p.modifikovao = x.modifikovao;

            context.Update(p);
            context.SaveChanges();

            return Ok(p);
        }

        [HttpGet]
        public List<ProizvodVM> Get()
        {
            var data = context.Proizvod.Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja=x.datum_kreiranja,
                datum_modifikacije=x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId=x.bojaId,
                bojaOpis=x.boja.Naziv,
                odjelId=x.odjelId,
                odjelOpis=x.odjel.Naziv,
                kategorijaId=x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId=x.kolekcijaId,
                kolekcijaOpis=x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                sezonaId=x.sezonaId,
                sezonaOpis=x.sezona.Naziv,          
                slika_postojeca=x.slika_postojeca,
                evidentirao = x.evidentirao,
                modifikovao=x.modifikovao
            });

            return data.OrderByDescending(x=>x.Id).ToList();
        }


        [HttpGet("naziv_asc")]
        public List<ProizvodVM> GetRastuciNaziv()
        {
            var data = context.Proizvod.Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId = x.bojaId,
                bojaOpis = x.boja.Naziv,
                odjelId = x.odjelId,
                odjelOpis = x.odjel.Naziv,
                kategorijaId = x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId = x.kolekcijaId,
                kolekcijaOpis = x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv,
                slika_postojeca = x.slika_postojeca,
                evidentirao = x.evidentirao,
                modifikovao = x.modifikovao
            });

            return data.OrderBy(x => x.Naziv).ToList();
        }


        [HttpGet("datumRastuci")]
        public List<ProizvodVM> GetProizvodeDatumRastuci()
        {
            var data = context.Proizvod.Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId = x.bojaId,
                bojaOpis = x.boja.Naziv,
                odjelId = x.odjelId,
                odjelOpis = x.odjel.Naziv,
                kategorijaId = x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId = x.kolekcijaId,
                kolekcijaOpis = x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv,
                slika_postojeca = x.slika_postojeca,
                evidentirao = x.evidentirao,
                modifikovao = x.modifikovao
            });

            return data.OrderBy(x=>x.datum_kreiranja).ToList();
        }


        [HttpGet("datumOpadajuci")]
        public List<ProizvodVM> GetProizvodeDatumOpadajuci()
        {
            var data = context.Proizvod.Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId = x.bojaId,
                bojaOpis = x.boja.Naziv,
                odjelId = x.odjelId,
                odjelOpis = x.odjel.Naziv,
                kategorijaId = x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId = x.kolekcijaId,
                kolekcijaOpis = x.kolekcija.Naziv,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv,
                slika_postojeca = x.slika_postojeca,
                evidentirao = x.evidentirao,
                modifikovao = x.modifikovao
            });

            return data.OrderByDescending(x => x.datum_kreiranja).ToList();
        }
        [HttpGet("byOdjel")]
        public List<ProizvodVM> GetProizvodeByOdjel(int odjel)
        {
            var data = context.Proizvod.Where(s=>s.odjelId==odjel &&
            s.isSpecijalna==false)
                .Select(x => new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId = x.bojaId,
                bojaOpis = x.boja.Naziv,
                odjelId = x.odjelId,
                odjelOpis = x.odjel.Naziv,
                kategorijaId = x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId = x.kolekcijaId,
                kolekcijaOpis = x.kolekcija.Naziv,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv,
                slika_postojeca = x.slika_postojeca,
                evidentirao = x.evidentirao,
                modifikovao = x.modifikovao
                });

            return data.OrderByDescending(x => x.datum_kreiranja).ToList();
        }
        


        [HttpDelete]
        [Autorizacija(Kupac:false,Zaposlenik:true,Admin:true)]
        public ActionResult ObrisiProizvod (int id)
        {
            Proizvod? p = context.Proizvod.Find(id);
            Proizvod? p_copy = p;


            if (id == 0)
                return BadRequest("pogrešan ID.");

            if (p == null)
                return BadRequest("nema proizvoda u bazi.");


            List<SpecijalnaPonudaProizvod> spp_lista = context.SpecijalnaPonudaProizvod.Where(x => x.proizvodId == id).ToList();

            if (spp_lista.Count() > 0)
            {
                foreach (var sp in spp_lista)
                {
                    context.Remove(sp);
                    context.SaveChanges();
                }
            }

            List<SkladisteProizvod> sp_lista = context.SkladisteProizvod.Where(x => x.proizvodId == id).ToList();

            if (sp_lista.Count() > 0)
            {
                foreach (var sp in sp_lista)
                {
                    context.Remove(sp);
                    context.SaveChanges();
                }
            }

            List<ProizvodSlika> ps_lista = context.ProizvodSlika.Where(x => x.proizvodId == id).ToList();

            if (ps_lista.Count() > 0)
            {
                foreach (var ps in ps_lista)
                {
                    context.Remove(ps);
                    context.SaveChanges();
                }
            }

            context.Remove(p);
            context.SaveChanges();

            return Ok(p_copy);

        }

        [HttpGet("sifra")]  //kako bi onemogucili da se unose sifre koje vec postoje 
        public ActionResult<List<int>> GetSveSifre()
        {
            return context.Proizvod.Select(x => x.Sifra).ToList();
        }

        [HttpGet("odjeli")]
        public List<Odjel> GetOdjele()
        {
            return context.Odjel.ToList();
        }


        public class VelicinaKolicina
        {
            public string velicina { get; set; }
            public int kolicina { get; set; }
        }

        //proizvodi sa najmanjom kolicinom
        public class ProizvodiKolicina
        {
            public ProizvodVM? proizvod { get; set; }
            public int Kolicina { get; set; }
            public string Velicina { get; set; }
            public string datum_kreiranja { get; set; }
            public List<VelicinaKolicina> velKol { get; set; }
        }

        //treba se uzeti proizvodID od ovog, i onda sa metodom GetSlikeByProizvodId dobijamo listu slika,
        //onda idemo for petljom i saljemo jedan item metodi get_slika_FS(item); - angular 

        [HttpGet("proizvodiMinKolicina")]
        public IEnumerable<ProizvodiKolicina> GetProizvodeMinKolicina()
        {
          //  var proizvodi = context.SkladisteProizvod.Select(x => x.proizvodId).Distinct();
            var min_kol = context.SkladisteProizvod.OrderBy(x => x.kolicina).Select(x => x.kolicina).ToList()[0];
            var odabrani = context.SkladisteProizvod.Where(x => x.kolicina == min_kol).OrderBy(x=>x.kolicina).ToList();
            var proizvodi_kolicine = new List<ProizvodiKolicina>();

            foreach (var p in odabrani)
            {
                var velkol = context.SkladisteProizvod.Where(x => x.proizvodId == p.proizvodId).Select(x => new VelicinaKolicina
                {
                    velicina = x.velicina,
                    kolicina = x.kolicina
                }).ToList();

                var kol = velkol.OrderBy(x => x.kolicina).Select(x => x.kolicina).ToList()[0];
                var vel = velkol.OrderBy(x => x.kolicina).Select(x => x.velicina).ToList()[0];

                var _proizvod = context.Proizvod.Where(x => x.Id == p.proizvodId).Select(x=>new ProizvodVM
                {
                    Id = x.Id,
                    Sifra = x.Sifra,
                    Naziv = x.Naziv,
                    Cijena = x.Cijena,
                    Opis = x.Opis,
                    datum_kreiranja = x.datum_kreiranja,
                    datum_modifikacije = x.datum_modifikacije,
                    Aktivan = x.Aktivan,
                    bojaId = x.bojaId,
                    bojaOpis = x.boja.Naziv,
                    odjelId = x.odjelId,
                    odjelOpis = x.odjel.Naziv,
                    kategorijaId = x.kategorijaId,
                    kategorijaOpis = x.kategorija.Naziv,
                    podkategorijaId = x.podkategorijaId,
                    podkategorijaOpis = x.podkategorija.Naziv,
                    kolekcijaId = x.kolekcijaId,
                    kolekcijaOpis = x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                    sezonaId = x.sezonaId,
                    sezonaOpis = x.sezona.Naziv,
                    slika_postojeca = x.slika_postojeca,
                    evidentirao = x.evidentirao,
                    modifikovao = x.modifikovao
                }).ToList()[0];

                proizvodi_kolicine.Add(new ProizvodiKolicina
                {
                    proizvod = _proizvod,
                    Kolicina = kol,
                    Velicina = vel,
                    datum_kreiranja = _proizvod.datum_kreiranja.ToString("dd/MM/yyyy"),
                    velKol = velkol
                });
            }

            return proizvodi_kolicine;
        }


        [HttpGet("proizvodi_bezkolicine")]
        public ActionResult GetProizvodeBezKolicine()
        {
            var rez = new List<dynamic>();
            //oni koji nisu dodani u skladiste a ne oni koji imaju 0 kolicinu
            //ne treba nam velicina - nece svi proizvodi imati sve velicine

            var skladiste = context.SkladisteProizvod.Select(x => x.proizvodId).Distinct().ToList();
            var proizvodi = context.Proizvod.Where(x => !skladiste.Contains(x.Id)).Select(x=>new ProizvodVM
            {
                Id = x.Id,
                Sifra = x.Sifra,
                Naziv = x.Naziv,
                Cijena = x.Cijena,
                Opis = x.Opis,
                datum_kreiranja = x.datum_kreiranja,
                datum_modifikacije = x.datum_modifikacije,
                Aktivan = x.Aktivan,
                bojaId = x.bojaId,
                bojaOpis = x.boja.Naziv,
                odjelId = x.odjelId,
                odjelOpis = x.odjel.Naziv,
                kategorijaId = x.kategorijaId,
                kategorijaOpis = x.kategorija.Naziv,
                podkategorijaId = x.podkategorijaId,
                podkategorijaOpis = x.podkategorija.Naziv,
                kolekcijaId = x.kolekcijaId,
                kolekcijaOpis = x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                sezonaId = x.sezonaId,
                sezonaOpis = x.sezona.Naziv,
                slika_postojeca = x.slika_postojeca,
                evidentirao = x.evidentirao,
                modifikovao = x.modifikovao
            }).ToList();

            for (int i = 0; i < proizvodi.Count(); i++)
            {
                rez.Add(new { proizvod = proizvodi[i] });
            }
            return Ok(rez);
        }

        public class ProizvodDatum
        {
            public int ProizvodId { get; set; }
            public ProizvodVM proizvod { get; set; }
            public string datum_kreiranja { get; set; }
          //  public List<VelicinaKolicina> velKol { get; set; }
        }

        [HttpGet("posljednjeDodaniProizvodi")]
        public ActionResult GetPosljednjeDodaneProizvode()
        {
            //DateTime.Compare(x.datum_kreiranja,posljednji_datum)==0
           /* var posljednji_datum = context.Proizvod.OrderByDescending(x => x.datum_kreiranja).Select(x => x.datum_kreiranja).ToList()/*[0]*/;

            /*var lista = context.Proizvod.Where(x => x.datum_kreiranja.Year == posljednji_datum.Year && x.datum_kreiranja.Month == posljednji_datum.Month && x.datum_kreiranja.Day == posljednji_datum.Day).Select(x=>x.Id).ToList();

            var proizvodi_datumi = new List<ProizvodDatum>();

            foreach (var p in lista)
            { 
                var proizvodVM=context.Proizvod.Where(x=>x.Id==p).Select(x=>new ProizvodVM
                {
                    Id = x.Id,
                    Sifra = x.Sifra,
                    Naziv = x.Naziv,
                    Cijena = x.Cijena,
                    Opis = x.Opis,
                    datum_kreiranja = x.datum_kreiranja,
                    datum_modifikacije = x.datum_modifikacije,
                    Aktivan = x.Aktivan,
                    bojaId = x.bojaId,
                    bojaOpis = x.boja.Naziv,
                    odjelId = x.odjelId,
                    odjelOpis = x.odjel.Naziv,
                    kategorijaId = x.kategorijaId,
                    kategorijaOpis = x.kategorija.Naziv,
                    podkategorijaId = x.podkategorijaId,
                    podkategorijaOpis = x.podkategorija.Naziv,
                    kolekcijaId = x.kolekcijaId,
                    kolekcijaOpis = x.kolekcija.Naziv + " " + x.kolekcija.Godina,
                    sezonaId = x.sezonaId,
                    sezonaOpis = x.sezona.Naziv,
                    slika_postojeca = x.slika_postojeca,
                    evidentirao = x.evidentirao,
                    modifikovao = x.modifikovao
                }).ToList()[0];

                //var velkol = context.SkladisteProizvod.Where(x => x.proizvodId == proizvodVM.Id).Select(x => new VelicinaKolicina
                //{
                //    velicina = x.velicina,
                //    kolicina = x.kolicina
                //}).ToList();

                proizvodi_datumi.Add(new ProizvodDatum { 
                    ProizvodId = p, proizvod = proizvodVM, 
                    datum_kreiranja = proizvodVM.datum_kreiranja.ToString("dd/MM/yyyy"),
                   // velKol=velkol
                });
            }

            //var rez = proizvodi_datumi.Take(5).ToList();

            var rez = proizvodi_datumi;

            return rez;*/
            return Ok();
        }


        [HttpGet("slika_id_db")]
        public ActionResult GetSlikaDB(int id)
        {
            byte[] bajtovi_slike = context.Proizvod.Find(id)?.slika_postojeca
                                   ?? Fajlovi.Ucitaj("wwwroot/images/no_image.jpg");

            return File(bajtovi_slike, "image/jpg");
        }

        [HttpGet("slika_id_fs")]  //id proizvoda trebamo poslati da bismo dobili njegovu sliku
        public FileContentResult GetSlikaFS(int id)
        {
            byte[] bajtovi_slike = Fajlovi.Ucitaj("slike_korisnika/" + id + ".jpg")
                                  ?? Fajlovi.Ucitaj("wwwroot/images/no_image.jpg");

            return File(bajtovi_slike, "image/jpg");
        }


/*
        [HttpGet("aktivnibezpopusta")]
        public List<Proizvod> GetAktivniProizvodiBezPopusta(int odjel_id)
        {
            var sviProizvodi = context.Proizvod
                .Where(o => o.odjelId == odjel_id).ToList();

            var specijalnePonude = context.SpecijalnaPonudaProizvod
         .Where(sp => sp.specijalnaPonuda.aktivna == true).ToList();

            var proizvodi = specijalnePonude.Select(sp => sp.proizvodId)
                  .ToList();
            
            var aktivniProizvodi = sviProizvodi.Where(p => p.Aktivan).ToList();
            var aktivniProizvodiBezPopusta = aktivniProizvodi
                .Where(p => !proizvodi.Contains(p.Id)).ToList();
            var rezultat=aktivniProizvodiBezPopusta
                .Select(x => new 
                {
                    Id = x.Id,
                    Sifra = x.Sifra,
                    Naziv = x.Naziv,
                    Cijena = x.Cijena,
                    Opis = x.Opis,
                    datum_kreiranja = x.datum_kreiranja,
                    datum_modifikacije = x.datum_modifikacije,
                    Aktivan = x.Aktivan,
                    bojaId = x.bojaId,
                    bojaOpis = x.boja.Naziv,
                    odjelId = x.odjelId,
                    odjelOpis = x.odjel.Naziv,
                    kategorijaId = x.kategorijaId,
                    kategorijaOpis = x.kategorija.Naziv,
                    podkategorijaId = x.podkategorijaId,
                    podkategorijaOpis = x.podkategorija.Naziv,
                    kolekcijaId = x.kolekcijaId,
                    kolekcijaOpis = x.kolekcija.Naziv,
                    sezonaId = x.sezonaId,
                    sezonaOpis = x.sezona.Naziv,
                    slika_postojeca = x.slika_postojeca,
                    evidentirao = x.evidentirao,
                    modifikovao = x.modifikovao
                }).ToList(); 
                  
            return rezultat/*.AsQueryable().ToList();*/
            //return aktivniProizvodiBezPopusta.OrderByDescending(x => x.datum_kreiranja).ToList();
        //}
    
        private List<Proizvod> GetAktivniProizvodiBezPopusta1(int odjel_id)
        {
            var sviProizvodi = context.Proizvod
                .Where(o => o.odjelId == odjel_id).ToList();
            var specijalnePonude = context.SpecijalnaPonudaProizvod
         .Where(sp => sp.specijalnaPonuda.aktivna == true)
         .Select(sp => sp.proizvodId)
         .ToList();
            var aktivniProizvodiBezPopusta = sviProizvodi.Where(p => p.Aktivan && !specijalnePonude.Contains(p.Id)).ToList();

            return aktivniProizvodiBezPopusta;
        }


        public class PonistiSezKol
        {
            public int proizvod_id { get; set; }
            public string modifikovao { get; set; }
        }

        [HttpPost("ponisti_sezkol")]
        public ActionResult PonistiSezoneKolekcije (PonistiSezKol x)
        {
            Proizvod? p = context.Proizvod.Find(x.proizvod_id);
            if (p != null)
            {
                p.sezonaId = null;
                p.kolekcijaId = null;
                p.modifikovao = x.modifikovao;
                context.Update(p);
                context.SaveChanges();
            }
            return Ok();
        }





       






    }
}
