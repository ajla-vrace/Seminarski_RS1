﻿using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class Kategorija
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        
        public DateTime datum_kreiranja { get; set; }
        public DateTime? datum_modifikacije { get; set; }


        /*
        [ForeignKey("OdjelId")]
        public Odjel Odjel { get; set; }
        public int? OdjelId { get; set; }*/
    }
}
