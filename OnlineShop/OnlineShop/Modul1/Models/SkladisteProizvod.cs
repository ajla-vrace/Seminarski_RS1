﻿using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class SkladisteProizvod
    {
        public int Id { get; set; }

        [ForeignKey("proizvodId")]
        public int? proizvodId { get; set; }
        public Proizvod proizvod { get; set; }

        [ForeignKey("skladisteId")]
        public int? skladisteId { get; set; }
        public Skladiste skladiste { get; set; }

        public int kolicina { get; set; }

        public DateTime datum_kreiranja { get; set; }
        public DateTime? datum_modifikacije { get; set; }
        public string? evidentirao { get; set; }

        public string? velicina { get; set; }
        public string? modifikovao { get; set; }

    }
}
