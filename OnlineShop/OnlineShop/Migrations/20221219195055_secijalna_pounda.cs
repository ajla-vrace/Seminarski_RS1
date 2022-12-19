using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class secijalnapounda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    datummodifikacije = table.Column<DateTime>(name: "datum_modifikacije", type: "datetime2", nullable: false),
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
                        onDelete: ReferentialAction.Cascade);
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Proizvod");

            migrationBuilder.DropTable(
                name: "SpecijalnaPonuda");
        }
    }
}
