﻿using OnlineShop.Modul1.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Modul1.ViewModels
{
    public class NarudzbaVM
    {
        public int Id { get; set; }
        public DateTime DatumKreiranja { get; set; }
        public DateTime? DatumPreuzimanja { get; set; }
        public float? Ukupno { get; set; }
        public int? UkupnoProizvoda { get; set; }
        public string? Status { get; set; }
        public int? KupacId { get; set; }
        public string? KupacNaziv { get; set; }
        public int? ProdavnicaId { get; set; }
        public string? nazivProdavnice { get; set; }
        public string? Evidentirao { get; set; }
        public string? PrethodniStatus { get; set; }
        public bool? jel_kliknuo_otkazana { get; set; }
        public bool jel_promijenjen_status { get; set; }
       // public bool? modifikovao { get; set; }
       public bool jel_poslan_mail { get; set; }
    }
}
