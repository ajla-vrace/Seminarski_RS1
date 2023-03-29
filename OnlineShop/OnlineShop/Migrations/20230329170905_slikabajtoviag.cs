using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class slikabajtoviag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Boja",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boja", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Grad",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grad", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kategorija",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datumkreiranja = table.Column<DateTime>(name: "datum_kreiranja", type: "datetime2", nullable: false),
                    datummodifikacije = table.Column<DateTime>(name: "datum_modifikacije", type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategorija", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Odjel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Odjel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Popust",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Popust", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sezona",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Doba = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Godina = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sezona", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SpecijalnaPonuda",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datumpocetka = table.Column<DateTime>(name: "datum_pocetka", type: "datetime2", nullable: false),
                    datumzavrsetka = table.Column<DateTime>(name: "datum_zavrsetka", type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecijalnaPonuda", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Spol",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spol", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Prodavnica",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Povrsina = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gradId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prodavnica", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Prodavnica_Grad_gradId",
                        column: x => x.gradId,
                        principalTable: "Grad",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Podkategorija",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datumkreiranja = table.Column<DateTime>(name: "datum_kreiranja", type: "datetime2", nullable: false),
                    datummodifikacije = table.Column<DateTime>(name: "datum_modifikacije", type: "datetime2", nullable: true),
                    KategorijaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Podkategorija", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Podkategorija_Kategorija_KategorijaId",
                        column: x => x.KategorijaId,
                        principalTable: "Kategorija",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Kolekcija",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Godina = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sezonaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kolekcija", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kolekcija_Sezona_sezonaId",
                        column: x => x.sezonaId,
                        principalTable: "Sezona",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KorisnickiNalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lozinka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatumRegistracije = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isAdmin = table.Column<bool>(type: "bit", nullable: true),
                    isZaposlenik = table.Column<bool>(type: "bit", nullable: true),
                    isKupac = table.Column<bool>(type: "bit", nullable: true),
                    SpolId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnickiNalog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KorisnickiNalog_Spol_SpolId",
                        column: x => x.SpolId,
                        principalTable: "Spol",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Skladiste",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Povrsina = table.Column<float>(type: "real", nullable: false),
                    gradId = table.Column<int>(type: "int", nullable: false),
                    prodavnicaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skladiste", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Skladiste_Grad_gradId",
                        column: x => x.gradId,
                        principalTable: "Grad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Skladiste_Prodavnica_prodavnicaId",
                        column: x => x.prodavnicaId,
                        principalTable: "Prodavnica",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Proizvod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sifra = table.Column<int>(type: "int", nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cijena = table.Column<float>(type: "real", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datumkreiranja = table.Column<DateTime>(name: "datum_kreiranja", type: "datetime2", nullable: false),
                    datummodifikacije = table.Column<DateTime>(name: "datum_modifikacije", type: "datetime2", nullable: true),
                    Aktivan = table.Column<bool>(type: "bit", nullable: false),
                    bojaId = table.Column<int>(type: "int", nullable: false),
                    odjelId = table.Column<int>(type: "int", nullable: true),
                    kategorijaId = table.Column<int>(type: "int", nullable: true),
                    podkategorijaId = table.Column<int>(type: "int", nullable: true),
                    kolekcijaId = table.Column<int>(type: "int", nullable: true),
                    sezonaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Proizvod_Boja_bojaId",
                        column: x => x.bojaId,
                        principalTable: "Boja",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Proizvod_Kategorija_kategorijaId",
                        column: x => x.kategorijaId,
                        principalTable: "Kategorija",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Proizvod_Kolekcija_kolekcijaId",
                        column: x => x.kolekcijaId,
                        principalTable: "Kolekcija",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Proizvod_Odjel_odjelId",
                        column: x => x.odjelId,
                        principalTable: "Odjel",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Proizvod_Podkategorija_podkategorijaId",
                        column: x => x.podkategorijaId,
                        principalTable: "Podkategorija",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Proizvod_Sezona_sezonaId",
                        column: x => x.sezonaId,
                        principalTable: "Sezona",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AutentifikacijaToken",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vrijednost = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnickiNalogId = table.Column<int>(type: "int", nullable: false),
                    vrijemeEvidentiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ipAdresa = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutentifikacijaToken", x => x.id);
                    table.ForeignKey(
                        name: "FK_AutentifikacijaToken_KorisnickiNalog_KorisnickiNalogId",
                        column: x => x.KorisnickiNalogId,
                        principalTable: "KorisnickiNalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Kupac",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    DatumPrveNarudzbe = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DatumPretplate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    isPretplacen = table.Column<bool>(type: "bit", nullable: false),
                    AdresaIsporuke = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kupac", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kupac_KorisnickiNalog_Id",
                        column: x => x.Id,
                        principalTable: "KorisnickiNalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Zaposlenik",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    DatumZaposlenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumOtkaza = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AdresaStanovanja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    JMBG = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProdavnicaId = table.Column<int>(type: "int", nullable: false),
                    slikaZaposlenikaBajtovi = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zaposlenik", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zaposlenik_KorisnickiNalog_Id",
                        column: x => x.Id,
                        principalTable: "KorisnickiNalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Zaposlenik_Prodavnica_ProdavnicaId",
                        column: x => x.ProdavnicaId,
                        principalTable: "Prodavnica",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "NarudzbaStavka",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cijena = table.Column<float>(type: "real", nullable: false),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    ProizvodId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NarudzbaStavka", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NarudzbaStavka_Proizvod_ProizvodId",
                        column: x => x.ProizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "ProizvodSlika",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    proizvodId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProizvodSlika", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProizvodSlika_Proizvod_proizvodId",
                        column: x => x.proizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SkladisteProizvod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    proizvodId = table.Column<int>(type: "int", nullable: true),
                    skladisteId = table.Column<int>(type: "int", nullable: true),
                    kolicina = table.Column<int>(type: "int", nullable: false),
                    datumkreiranja = table.Column<DateTime>(name: "datum_kreiranja", type: "datetime2", nullable: false),
                    datummodifikacije = table.Column<DateTime>(name: "datum_modifikacije", type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkladisteProizvod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SkladisteProizvod_Proizvod_proizvodId",
                        column: x => x.proizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SkladisteProizvod_Skladiste_skladisteId",
                        column: x => x.skladisteId,
                        principalTable: "Skladiste",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SpecijalnaPonudaProizvod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    specijalnaPonudaId = table.Column<int>(type: "int", nullable: true),
                    proizvodId = table.Column<int>(type: "int", nullable: true),
                    popustId = table.Column<int>(type: "int", nullable: true),
                    CijenaSaPopustom = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecijalnaPonudaProizvod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpecijalnaPonudaProizvod_Popust_popustId",
                        column: x => x.popustId,
                        principalTable: "Popust",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SpecijalnaPonudaProizvod_Proizvod_proizvodId",
                        column: x => x.proizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SpecijalnaPonudaProizvod_SpecijalnaPonuda_specijalnaPonudaId",
                        column: x => x.specijalnaPonudaId,
                        principalTable: "SpecijalnaPonuda",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Favorit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    datumkreiranja = table.Column<DateTime>(name: "datum_kreiranja", type: "datetime2", nullable: false),
                    KupacId = table.Column<int>(type: "int", nullable: false),
                    ProizvodId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favorit_Kupac_KupacId",
                        column: x => x.KupacId,
                        principalTable: "Kupac",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Favorit_Proizvod_ProizvodId",
                        column: x => x.ProizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Komentar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumKreiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumModifikacije = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KupacId = table.Column<int>(type: "int", nullable: false),
                    ProdavnicaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Komentar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Komentar_Kupac_KupacId",
                        column: x => x.KupacId,
                        principalTable: "Kupac",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Komentar_Prodavnica_ProdavnicaId",
                        column: x => x.ProdavnicaId,
                        principalTable: "Prodavnica",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Korpa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datumkreiranja = table.Column<DateTime>(name: "datum_kreiranja", type: "datetime2", nullable: false),
                    datummodifikacije = table.Column<DateTime>(name: "datum_modifikacije", type: "datetime2", nullable: false),
                    UkupnoProizvoda = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    KupacId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korpa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Korpa_Kupac_KupacId",
                        column: x => x.KupacId,
                        principalTable: "Kupac",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Ocjena",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OcjenaBrojcano = table.Column<int>(type: "int", nullable: false),
                    DatumKreiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KupacId = table.Column<int>(type: "int", nullable: true),
                    ProdavnicaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ocjena", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ocjena_Kupac_KupacId",
                        column: x => x.KupacId,
                        principalTable: "Kupac",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ocjena_Prodavnica_ProdavnicaId",
                        column: x => x.ProdavnicaId,
                        principalTable: "Prodavnica",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Zvjezdica",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OcjenaBrojcano = table.Column<int>(type: "int", nullable: false),
                    DatumKreiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KupacId = table.Column<int>(type: "int", nullable: false),
                    ProizvodId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zvjezdica", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zvjezdica_Kupac_KupacId",
                        column: x => x.KupacId,
                        principalTable: "Kupac",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Zvjezdica_Proizvod_ProizvodId",
                        column: x => x.ProizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Narudzba",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DatumKreiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumPreuzimanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Ukupno = table.Column<float>(type: "real", nullable: false),
                    UkupnoProizvoda = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KupacId = table.Column<int>(type: "int", nullable: false),
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Narudzba", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Narudzba_Kupac_KupacId",
                        column: x => x.KupacId,
                        principalTable: "Kupac",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Narudzba_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "KorpaStavka",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cijena = table.Column<float>(type: "real", nullable: false),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    Velicina = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    ProizvodId = table.Column<int>(type: "int", nullable: false),
                    KorpaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorpaStavka", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KorpaStavka_Korpa_KorpaId",
                        column: x => x.KorpaId,
                        principalTable: "Korpa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_KorpaStavka_Proizvod_ProizvodId",
                        column: x => x.ProizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutentifikacijaToken_KorisnickiNalogId",
                table: "AutentifikacijaToken",
                column: "KorisnickiNalogId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorit_KupacId",
                table: "Favorit",
                column: "KupacId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorit_ProizvodId",
                table: "Favorit",
                column: "ProizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_Kolekcija_sezonaId",
                table: "Kolekcija",
                column: "sezonaId");

            migrationBuilder.CreateIndex(
                name: "IX_Komentar_KupacId",
                table: "Komentar",
                column: "KupacId");

            migrationBuilder.CreateIndex(
                name: "IX_Komentar_ProdavnicaId",
                table: "Komentar",
                column: "ProdavnicaId");

            migrationBuilder.CreateIndex(
                name: "IX_KorisnickiNalog_SpolId",
                table: "KorisnickiNalog",
                column: "SpolId");

            migrationBuilder.CreateIndex(
                name: "IX_Korpa_KupacId",
                table: "Korpa",
                column: "KupacId");

            migrationBuilder.CreateIndex(
                name: "IX_KorpaStavka_KorpaId",
                table: "KorpaStavka",
                column: "KorpaId");

            migrationBuilder.CreateIndex(
                name: "IX_KorpaStavka_ProizvodId",
                table: "KorpaStavka",
                column: "ProizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_Narudzba_KupacId",
                table: "Narudzba",
                column: "KupacId");

            migrationBuilder.CreateIndex(
                name: "IX_Narudzba_ZaposlenikId",
                table: "Narudzba",
                column: "ZaposlenikId");

            migrationBuilder.CreateIndex(
                name: "IX_NarudzbaStavka_ProizvodId",
                table: "NarudzbaStavka",
                column: "ProizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_Ocjena_KupacId",
                table: "Ocjena",
                column: "KupacId");

            migrationBuilder.CreateIndex(
                name: "IX_Ocjena_ProdavnicaId",
                table: "Ocjena",
                column: "ProdavnicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Podkategorija_KategorijaId",
                table: "Podkategorija",
                column: "KategorijaId");

            migrationBuilder.CreateIndex(
                name: "IX_Prodavnica_gradId",
                table: "Prodavnica",
                column: "gradId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_bojaId",
                table: "Proizvod",
                column: "bojaId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_kategorijaId",
                table: "Proizvod",
                column: "kategorijaId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_kolekcijaId",
                table: "Proizvod",
                column: "kolekcijaId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_odjelId",
                table: "Proizvod",
                column: "odjelId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_podkategorijaId",
                table: "Proizvod",
                column: "podkategorijaId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_sezonaId",
                table: "Proizvod",
                column: "sezonaId");

            migrationBuilder.CreateIndex(
                name: "IX_ProizvodSlika_proizvodId",
                table: "ProizvodSlika",
                column: "proizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_Skladiste_gradId",
                table: "Skladiste",
                column: "gradId");

            migrationBuilder.CreateIndex(
                name: "IX_Skladiste_prodavnicaId",
                table: "Skladiste",
                column: "prodavnicaId");

            migrationBuilder.CreateIndex(
                name: "IX_SkladisteProizvod_proizvodId",
                table: "SkladisteProizvod",
                column: "proizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_SkladisteProizvod_skladisteId",
                table: "SkladisteProizvod",
                column: "skladisteId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecijalnaPonudaProizvod_popustId",
                table: "SpecijalnaPonudaProizvod",
                column: "popustId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecijalnaPonudaProizvod_proizvodId",
                table: "SpecijalnaPonudaProizvod",
                column: "proizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecijalnaPonudaProizvod_specijalnaPonudaId",
                table: "SpecijalnaPonudaProizvod",
                column: "specijalnaPonudaId");

            migrationBuilder.CreateIndex(
                name: "IX_Zaposlenik_ProdavnicaId",
                table: "Zaposlenik",
                column: "ProdavnicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Zvjezdica_KupacId",
                table: "Zvjezdica",
                column: "KupacId");

            migrationBuilder.CreateIndex(
                name: "IX_Zvjezdica_ProizvodId",
                table: "Zvjezdica",
                column: "ProizvodId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AutentifikacijaToken");

            migrationBuilder.DropTable(
                name: "Favorit");

            migrationBuilder.DropTable(
                name: "Komentar");

            migrationBuilder.DropTable(
                name: "KorpaStavka");

            migrationBuilder.DropTable(
                name: "Narudzba");

            migrationBuilder.DropTable(
                name: "NarudzbaStavka");

            migrationBuilder.DropTable(
                name: "Ocjena");

            migrationBuilder.DropTable(
                name: "ProizvodSlika");

            migrationBuilder.DropTable(
                name: "SkladisteProizvod");

            migrationBuilder.DropTable(
                name: "SpecijalnaPonudaProizvod");

            migrationBuilder.DropTable(
                name: "Zvjezdica");

            migrationBuilder.DropTable(
                name: "Korpa");

            migrationBuilder.DropTable(
                name: "Zaposlenik");

            migrationBuilder.DropTable(
                name: "Skladiste");

            migrationBuilder.DropTable(
                name: "Popust");

            migrationBuilder.DropTable(
                name: "SpecijalnaPonuda");

            migrationBuilder.DropTable(
                name: "Proizvod");

            migrationBuilder.DropTable(
                name: "Kupac");

            migrationBuilder.DropTable(
                name: "Prodavnica");

            migrationBuilder.DropTable(
                name: "Boja");

            migrationBuilder.DropTable(
                name: "Kolekcija");

            migrationBuilder.DropTable(
                name: "Odjel");

            migrationBuilder.DropTable(
                name: "Podkategorija");

            migrationBuilder.DropTable(
                name: "KorisnickiNalog");

            migrationBuilder.DropTable(
                name: "Grad");

            migrationBuilder.DropTable(
                name: "Sezona");

            migrationBuilder.DropTable(
                name: "Kategorija");

            migrationBuilder.DropTable(
                name: "Spol");
        }
    }
}
