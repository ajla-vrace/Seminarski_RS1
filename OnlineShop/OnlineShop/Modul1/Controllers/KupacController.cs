﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Modul1.Models;
using OnlineShop.Modul1.ViewModels;

namespace OnlineShop.Modul1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class KupacController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public KupacController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult Add([FromBody] KupacVM x)
        {
            Kupac objekat;
            objekat = new Kupac();
            // objekat.Id = x.Id;
            _dbContext.Add(objekat);
           
            objekat.Ime=x.Ime;
            objekat.Prezime = x.Prezime;
            objekat.Email = x.Email;
            objekat.Username = x.Username;
            objekat.Lozinka = x.Lozinka;
            objekat.isKupac = x.isKupac;
            //objekat.SpolId = x.SpolId;
            objekat.DatumPretplate = x.DatumPretplate;
            objekat.DatumPrveNarudzbe = x.DatumPrveNarudzbe;
            objekat.AdresaIsporuke = x.AdresaIsporuke;
            objekat.isPretplacen = x.isPretplacen;
            objekat.DatumRegistracije=x.DatumRegistracije;
            _dbContext.SaveChanges();
            return Ok(objekat);
        }



        [HttpGet]
        public ActionResult GetAll()
        {
            var data = _dbContext.Kupac
                .OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    id = s.Id,
                   ime=s.Ime,
                   prezime=s.Prezime,
                   email=s.Email,
                   username=s.Username,
                   lozinka=s.Lozinka,
                   datumPretplate=s.DatumPretplate,
                   datumPrveNarudzbe = s.DatumPrveNarudzbe,
                   //spol=s.Spol,
                   spolId=s.SpolId,
                   adresaIsporuke=s.AdresaIsporuke,
                   isKupac=s.isKupac,
                   isPretplacan=s.isPretplacen,
                   datumRegistracije=s.DatumRegistracije

                })
                .AsQueryable();


            return Ok(data.ToList());
        }
        [HttpGet]
        public ActionResult GetById(int id)
        {
            var data = _dbContext.Kupac.Find(id);
            return Ok(data);
                /*.OrderByDescending(s => s.Id)
                .Select(s => new
                {
                    id = s.Id,
                    ime = s.Ime,
                    prezime = s.Prezime,
                    email = s.Email,
                    username = s.Username,
                    lozinka = s.Lozinka,
                    datumPretplate = s.DatumPretplate,
                    datumPrveNarudzbe = s.DatumPrveNarudzbe,
                    //spol=s.Spol,
                    spolId = s.SpolId,
                    adresaIsporuke = s.AdresaIsporuke,
                    isKupac = s.isKupac,
                    isPretplacan = s.isPretplacen

                })
                .AsQueryable();


            return Ok(data.ToList());*/
        }




    }
}