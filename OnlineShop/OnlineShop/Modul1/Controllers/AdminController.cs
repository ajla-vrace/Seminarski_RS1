using AutoMapper.Configuration.Conventions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul0_Autentifikacija.Models;
using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext contex;
        public AdminController(ApplicationDbContext contex)
        {
            this.contex = contex;
        }


        public class AdminVM
        {
            public int id { get; set; }
            public string ime { get; set; }
            public string prezime { get; set; }
            public string email { get; set; }
            public string? brojTelefona { get; set; }
            public string? spolOpis { get; set; }
            public int? spolId { get; set; }
            public string username { get; set; }
            public string lozinka { get; set; }
            public string datumRegistracije { get; set; }
        }

        [HttpPut("lozinka")]
        public ActionResult EditAdminLozinka(string novaLozinka, int id)
        {
            KorisnickiNalog? a = contex.KorisnickiNalog.Find(id);

            if (a != null)
            {
                a.Lozinka = novaLozinka;

                contex.Update(a);
                contex.SaveChanges();

            }

            return Ok(a);
        }

        [HttpPut("korIme")]

        public ActionResult EditAdminUsername(string novoKorIme, int id)
        {
            KorisnickiNalog? a = contex.KorisnickiNalog.Find(id);

            if (a != null)
            {
                a.Username = novoKorIme;

                contex.Update(a);
                contex.SaveChanges();

            }

            return Ok(a);
        }


        [HttpPut]
        public ActionResult EditAdmin(AdminVM x)
        {
            KorisnickiNalog? a = contex.KorisnickiNalog.Find(x.id);

            if (a != null)
            {
                a.Ime = x.ime;
                a.Prezime = x.prezime;
                a.Email = x.email;
                a.BrojTelefona = x.brojTelefona;
                a.SpolId = x.spolId;

                contex.Update(a);
                contex.SaveChanges();

            }

            return Ok(a);
        }

        [HttpGet]
        public IQueryable<AdminVM> GetAdmin(int id)
        {

            var data = contex.KorisnickiNalog.Where(x => x.Id == id).Select(a => new AdminVM
            {
                id = a.Id,
                ime = a.Ime,
                prezime = a.Prezime,
                email = a.Email,
                brojTelefona = a.BrojTelefona,
                username = a.Username,
                lozinka = a.Lozinka,
                spolId = a.SpolId,
                spolOpis = a.Spol.Naziv,
                datumRegistracije = a.DatumRegistracije.ToShortDateString()
            }).ToList().AsQueryable();

            return data;

        }


        [HttpGet("spolovi")]
        public List<Spol> GetSpolove()
        {
            return contex.Spol.ToList();
        }

        [HttpGet("korImena")]
        public List<string> GetKorisnickaImena()
        {
            return contex.KorisnickiNalog.Select(x => x.Username).ToList();
        }

        [HttpGet("emailovi")]
        public List<string> GetEmailove()
        {
            return contex.KorisnickiNalog.Select(x => x.Email).ToList();
        }

    }
}
