﻿using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.Models
{
    public class ProizvodSlika
    {
        public int Id { get; set; }
        public string slika { get; set; }

        [ForeignKey("proizvodId")]
        public int? proizvodId { get; set; }
        public Proizvod proizvod { get; set; }
    }
}
