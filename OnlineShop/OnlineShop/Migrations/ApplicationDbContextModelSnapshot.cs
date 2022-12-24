﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OnlineShop.Data;

#nullable disable

namespace OnlineShop.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("OnlineShop.Modul1.Models.Boja", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Boja");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Favorit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("KupacId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("ProizvodId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<DateTime>("datum_kreiranja")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("KupacId");

                    b.HasIndex("ProizvodId");

                    b.ToTable("Favorit");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Grad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Grad");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Kategorija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("datum_kreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("datum_modifikacije")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Kategorija");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Kolekcija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Godina")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("sezonaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("sezonaId");

                    b.ToTable("Kolekcija");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Komentar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DatumKreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumModifikacije")
                        .HasColumnType("datetime2");

                    b.Property<int?>("KupacId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProdavnicaId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KupacId");

                    b.HasIndex("ProdavnicaId");

                    b.ToTable("Komentar");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Korisnik", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BrojTelefona")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DatumRegistracije")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lozinka")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SpolId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("isAdmin")
                        .HasColumnType("bit");

                    b.Property<bool?>("isKupac")
                        .HasColumnType("bit");

                    b.Property<bool?>("isZaposlenik")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("SpolId");

                    b.ToTable("Korisnik");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Korpa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("KupacId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Total")
                        .HasColumnType("real");

                    b.Property<int>("UkupnoProizvoda")
                        .HasColumnType("int");

                    b.Property<DateTime>("datum_kreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("datum_modifikacije")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("KupacId");

                    b.ToTable("Korpa");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.KorpaStavka", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<float>("Cijena")
                        .HasColumnType("real");

                    b.Property<int>("Kolicina")
                        .HasColumnType("int");

                    b.Property<int?>("ProizvodId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<float>("Total")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("ProizvodId");

                    b.ToTable("KorpaStavka");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Narudzba", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DatumKreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumPreuzimanja")
                        .HasColumnType("datetime2");

                    b.Property<int?>("KupacId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Ukupno")
                        .HasColumnType("real");

                    b.Property<int>("UkupnoProizvoda")
                        .HasColumnType("int");

                    b.Property<int?>("ZaposlenikId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KupacId");

                    b.HasIndex("ZaposlenikId");

                    b.ToTable("Narudzba");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.NarudzbaStavka", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<float>("Cijena")
                        .HasColumnType("real");

                    b.Property<int>("Kolicina")
                        .HasColumnType("int");

                    b.Property<int?>("ProizvodId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<float>("Total")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("ProizvodId");

                    b.ToTable("NarudzbaStavka");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Ocjena", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DatumKreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumModifikacije")
                        .HasColumnType("datetime2");

                    b.Property<int?>("KupacId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProdavnicaId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KupacId");

                    b.HasIndex("ProdavnicaId");

                    b.ToTable("Ocjena");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Odjel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Odjel");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Podkategorija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("KategorijaId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("datum_kreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("datum_modifikacije")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("KategorijaId");

                    b.ToTable("Podkategorija");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Popust", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Popust");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Prodavnica", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BrojTelefona")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Povrsina")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("gradId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("gradId");

                    b.ToTable("Prodavnica");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Proizvod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Aktivan")
                        .HasColumnType("bit");

                    b.Property<float>("Cijena")
                        .HasColumnType("real");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Sifra")
                        .HasColumnType("int");

                    b.Property<int>("bojaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("datum_kreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("datum_modifikacije")
                        .HasColumnType("datetime2");

                    b.Property<int?>("kategorijaId")
                        .HasColumnType("int");

                    b.Property<int?>("kolekcijaId")
                        .HasColumnType("int");

                    b.Property<int?>("odjelId")
                        .HasColumnType("int");

                    b.Property<int?>("podkategorijaId")
                        .HasColumnType("int");

                    b.Property<int?>("sezonaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("bojaId");

                    b.HasIndex("kategorijaId");

                    b.HasIndex("kolekcijaId");

                    b.HasIndex("odjelId");

                    b.HasIndex("podkategorijaId");

                    b.HasIndex("sezonaId");

                    b.ToTable("Proizvod");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.ProizvodSlika", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("proizvodId")
                        .HasColumnType("int");

                    b.Property<string>("slika")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("proizvodId");

                    b.ToTable("ProizvodSlika");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Sezona", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Doba")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Godina")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Sezona");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Skladiste", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BrojTelefona")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Povrsina")
                        .HasColumnType("real");

                    b.Property<int>("gradId")
                        .HasColumnType("int");

                    b.Property<int?>("prodavnicaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("gradId");

                    b.HasIndex("prodavnicaId");

                    b.ToTable("Skladiste");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.SkladisteProizvod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("kolicina")
                        .HasColumnType("int");

                    b.Property<int?>("proizvodId")
                        .HasColumnType("int");

                    b.Property<int?>("skladisteId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("proizvodId");

                    b.HasIndex("skladisteId");

                    b.ToTable("SkladisteProizvod");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.SpecijalnaPonuda", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("datum_pocetka")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("datum_zavrsetka")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("SpecijalnaPonuda");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.SpecijalnaPonudaProizvod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("popustId")
                        .HasColumnType("int");

                    b.Property<int?>("proizvodId")
                        .HasColumnType("int");

                    b.Property<int?>("specijalnaPonudaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("popustId");

                    b.HasIndex("proizvodId");

                    b.HasIndex("specijalnaPonudaId");

                    b.ToTable("SpecijalnaPonudaProizvod");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Spol", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Spol");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Zvjezdica", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DatumKreiranja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumModifikacije")
                        .HasColumnType("datetime2");

                    b.Property<int?>("KupacId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProizvodId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KupacId");

                    b.HasIndex("ProizvodId");

                    b.ToTable("Zvjezdica");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Kupac", b =>
                {
                    b.HasBaseType("OnlineShop.Modul1.Models.Korisnik");

                    b.Property<string>("AdresaIsporuke")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DatumPretplate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DatumPrveNarudzbe")
                        .HasColumnType("datetime2");

                    b.Property<bool>("isPretplacen")
                        .HasColumnType("bit");

                    b.ToTable("Kupac");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Zaposlenik", b =>
                {
                    b.HasBaseType("OnlineShop.Modul1.Models.Korisnik");

                    b.Property<string>("AdresaStanovanja")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DatumOtkaza")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumRodjenja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumZaposlenja")
                        .HasColumnType("datetime2");

                    b.Property<string>("JMBG")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProdavnicaId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasIndex("ProdavnicaId");

                    b.ToTable("Zaposlenik");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Favorit", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Kupac", "Kupac")
                        .WithMany()
                        .HasForeignKey("KupacId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineShop.Modul1.Models.Proizvod", "Proizvod")
                        .WithMany()
                        .HasForeignKey("ProizvodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kupac");

                    b.Navigation("Proizvod");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Kolekcija", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Sezona", "sezona")
                        .WithMany()
                        .HasForeignKey("sezonaId");

                    b.Navigation("sezona");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Komentar", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Kupac", "Kupac")
                        .WithMany()
                        .HasForeignKey("KupacId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineShop.Modul1.Models.Prodavnica", "Prodavnica")
                        .WithMany()
                        .HasForeignKey("ProdavnicaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kupac");

                    b.Navigation("Prodavnica");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Korisnik", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Spol", "Spol")
                        .WithMany()
                        .HasForeignKey("SpolId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Spol");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Korpa", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Kupac", "Kupac")
                        .WithMany()
                        .HasForeignKey("KupacId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kupac");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.KorpaStavka", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Proizvod", "Proizvod")
                        .WithMany()
                        .HasForeignKey("ProizvodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Proizvod");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Narudzba", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Kupac", "Kupac")
                        .WithMany()
                        .HasForeignKey("KupacId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineShop.Modul1.Models.Zaposlenik", "Zaposlenik")
                        .WithMany()
                        .HasForeignKey("ZaposlenikId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kupac");

                    b.Navigation("Zaposlenik");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.NarudzbaStavka", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Proizvod", "Proizvod")
                        .WithMany()
                        .HasForeignKey("ProizvodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Proizvod");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Ocjena", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Kupac", "Kupac")
                        .WithMany()
                        .HasForeignKey("KupacId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineShop.Modul1.Models.Prodavnica", "Prodavnica")
                        .WithMany()
                        .HasForeignKey("ProdavnicaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kupac");

                    b.Navigation("Prodavnica");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Podkategorija", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Kategorija", "Kategorija")
                        .WithMany()
                        .HasForeignKey("KategorijaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kategorija");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Prodavnica", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Grad", "grad")
                        .WithMany()
                        .HasForeignKey("gradId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("grad");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Proizvod", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Boja", "boja")
                        .WithMany()
                        .HasForeignKey("bojaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineShop.Modul1.Models.Kategorija", "kategorija")
                        .WithMany()
                        .HasForeignKey("kategorijaId");

                    b.HasOne("OnlineShop.Modul1.Models.Kolekcija", "kolekcija")
                        .WithMany()
                        .HasForeignKey("kolekcijaId");

                    b.HasOne("OnlineShop.Modul1.Models.Odjel", "odjel")
                        .WithMany()
                        .HasForeignKey("odjelId");

                    b.HasOne("OnlineShop.Modul1.Models.Podkategorija", "podkategorija")
                        .WithMany()
                        .HasForeignKey("podkategorijaId");

                    b.HasOne("OnlineShop.Modul1.Models.Sezona", "sezona")
                        .WithMany()
                        .HasForeignKey("sezonaId");

                    b.Navigation("boja");

                    b.Navigation("kategorija");

                    b.Navigation("kolekcija");

                    b.Navigation("odjel");

                    b.Navigation("podkategorija");

                    b.Navigation("sezona");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.ProizvodSlika", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Proizvod", "proizvod")
                        .WithMany()
                        .HasForeignKey("proizvodId");

                    b.Navigation("proizvod");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Skladiste", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Grad", "grad")
                        .WithMany()
                        .HasForeignKey("gradId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineShop.Modul1.Models.Prodavnica", "prodavnica")
                        .WithMany()
                        .HasForeignKey("prodavnicaId");

                    b.Navigation("grad");

                    b.Navigation("prodavnica");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.SkladisteProizvod", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Proizvod", "proizvod")
                        .WithMany()
                        .HasForeignKey("proizvodId");

                    b.HasOne("OnlineShop.Modul1.Models.Skladiste", "skladiste")
                        .WithMany()
                        .HasForeignKey("skladisteId");

                    b.Navigation("proizvod");

                    b.Navigation("skladiste");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.SpecijalnaPonudaProizvod", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Popust", "popust")
                        .WithMany()
                        .HasForeignKey("popustId");

                    b.HasOne("OnlineShop.Modul1.Models.Proizvod", "proizvod")
                        .WithMany()
                        .HasForeignKey("proizvodId");

                    b.HasOne("OnlineShop.Modul1.Models.SpecijalnaPonuda", "specijalnaPonuda")
                        .WithMany()
                        .HasForeignKey("specijalnaPonudaId");

                    b.Navigation("popust");

                    b.Navigation("proizvod");

                    b.Navigation("specijalnaPonuda");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Zvjezdica", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Kupac", "Kupac")
                        .WithMany()
                        .HasForeignKey("KupacId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineShop.Modul1.Models.Proizvod", "Proizvod")
                        .WithMany()
                        .HasForeignKey("ProizvodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kupac");

                    b.Navigation("Proizvod");
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Kupac", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Korisnik", null)
                        .WithOne()
                        .HasForeignKey("OnlineShop.Modul1.Models.Kupac", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("OnlineShop.Modul1.Models.Zaposlenik", b =>
                {
                    b.HasOne("OnlineShop.Modul1.Models.Korisnik", null)
                        .WithOne()
                        .HasForeignKey("OnlineShop.Modul1.Models.Zaposlenik", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineShop.Modul1.Models.Prodavnica", "Prodavnica")
                        .WithMany()
                        .HasForeignKey("ProdavnicaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Prodavnica");
                });
#pragma warning restore 612, 618
        }
    }
}
