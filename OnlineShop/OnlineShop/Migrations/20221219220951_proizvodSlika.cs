using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class proizvodSlika : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorit_Kupac_KupacId",
                table: "Favorit");

            migrationBuilder.DropForeignKey(
                name: "FK_Favorit_Proizvod_ProizvodId",
                table: "Favorit");

            migrationBuilder.DropForeignKey(
                name: "FK_Komentar_Kupac_KupacId",
                table: "Komentar");

            migrationBuilder.DropForeignKey(
                name: "FK_Komentar_Prodavnica_ProdavnicaId",
                table: "Komentar");

            migrationBuilder.DropForeignKey(
                name: "FK_Korisnik_Spol_SpolId",
                table: "Korisnik");

            migrationBuilder.DropForeignKey(
                name: "FK_Korpa_Kupac_KupacId",
                table: "Korpa");

            migrationBuilder.DropForeignKey(
                name: "FK_KorpaStavka_Proizvod_ProizvodId",
                table: "KorpaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_Kupac_Korisnik_Id",
                table: "Kupac");

            migrationBuilder.DropForeignKey(
                name: "FK_Narudzba_Kupac_KupacId",
                table: "Narudzba");

            migrationBuilder.DropForeignKey(
                name: "FK_Narudzba_Zaposlenik_ZaposlenikId",
                table: "Narudzba");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbaStavka_Proizvod_ProizvodId",
                table: "NarudzbaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_Ocjena_Kupac_KupacId",
                table: "Ocjena");

            migrationBuilder.DropForeignKey(
                name: "FK_Ocjena_Prodavnica_ProdavnicaId",
                table: "Ocjena");

            migrationBuilder.DropForeignKey(
                name: "FK_Podkategorija_Kategorija_KategorijaId",
                table: "Podkategorija");

            migrationBuilder.DropForeignKey(
                name: "FK_Proizvod_Boja_bojaId",
                table: "Proizvod");

            migrationBuilder.DropForeignKey(
                name: "FK_Skladiste_Grad_gradId",
                table: "Skladiste");

            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_Korisnik_Id",
                table: "Zaposlenik");

            migrationBuilder.DropForeignKey(
                name: "FK_Zvjezdica_Kupac_KupacId",
                table: "Zvjezdica");

            migrationBuilder.DropForeignKey(
                name: "FK_Zvjezdica_Proizvod_ProizvodId",
                table: "Zvjezdica");

            migrationBuilder.AddColumn<int>(
                name: "prodavnicaId",
                table: "Skladiste",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "gradId",
                table: "Prodavnica",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ProizvodSlika",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
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

            migrationBuilder.CreateIndex(
                name: "IX_Skladiste_prodavnicaId",
                table: "Skladiste",
                column: "prodavnicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Prodavnica_gradId",
                table: "Prodavnica",
                column: "gradId");

            migrationBuilder.CreateIndex(
                name: "IX_ProizvodSlika_proizvodId",
                table: "ProizvodSlika",
                column: "proizvodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorit_Kupac_KupacId",
                table: "Favorit",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Favorit_Proizvod_ProizvodId",
                table: "Favorit",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Komentar_Kupac_KupacId",
                table: "Komentar",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Komentar_Prodavnica_ProdavnicaId",
                table: "Komentar",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnik_Spol_SpolId",
                table: "Korisnik",
                column: "SpolId",
                principalTable: "Spol",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Korpa_Kupac_KupacId",
                table: "Korpa",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_KorpaStavka_Proizvod_ProizvodId",
                table: "KorpaStavka",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Kupac_Korisnik_Id",
                table: "Kupac",
                column: "Id",
                principalTable: "Korisnik",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Narudzba_Kupac_KupacId",
                table: "Narudzba",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Narudzba_Zaposlenik_ZaposlenikId",
                table: "Narudzba",
                column: "ZaposlenikId",
                principalTable: "Zaposlenik",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_NarudzbaStavka_Proizvod_ProizvodId",
                table: "NarudzbaStavka",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Ocjena_Kupac_KupacId",
                table: "Ocjena",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Ocjena_Prodavnica_ProdavnicaId",
                table: "Ocjena",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Podkategorija_Kategorija_KategorijaId",
                table: "Podkategorija",
                column: "KategorijaId",
                principalTable: "Kategorija",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Prodavnica_Grad_gradId",
                table: "Prodavnica",
                column: "gradId",
                principalTable: "Grad",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Proizvod_Boja_bojaId",
                table: "Proizvod",
                column: "bojaId",
                principalTable: "Boja",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Skladiste_Grad_gradId",
                table: "Skladiste",
                column: "gradId",
                principalTable: "Grad",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Skladiste_Prodavnica_prodavnicaId",
                table: "Skladiste",
                column: "prodavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_Korisnik_Id",
                table: "Zaposlenik",
                column: "Id",
                principalTable: "Korisnik",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Zvjezdica_Kupac_KupacId",
                table: "Zvjezdica",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Zvjezdica_Proizvod_ProizvodId",
                table: "Zvjezdica",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorit_Kupac_KupacId",
                table: "Favorit");

            migrationBuilder.DropForeignKey(
                name: "FK_Favorit_Proizvod_ProizvodId",
                table: "Favorit");

            migrationBuilder.DropForeignKey(
                name: "FK_Komentar_Kupac_KupacId",
                table: "Komentar");

            migrationBuilder.DropForeignKey(
                name: "FK_Komentar_Prodavnica_ProdavnicaId",
                table: "Komentar");

            migrationBuilder.DropForeignKey(
                name: "FK_Korisnik_Spol_SpolId",
                table: "Korisnik");

            migrationBuilder.DropForeignKey(
                name: "FK_Korpa_Kupac_KupacId",
                table: "Korpa");

            migrationBuilder.DropForeignKey(
                name: "FK_KorpaStavka_Proizvod_ProizvodId",
                table: "KorpaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_Kupac_Korisnik_Id",
                table: "Kupac");

            migrationBuilder.DropForeignKey(
                name: "FK_Narudzba_Kupac_KupacId",
                table: "Narudzba");

            migrationBuilder.DropForeignKey(
                name: "FK_Narudzba_Zaposlenik_ZaposlenikId",
                table: "Narudzba");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbaStavka_Proizvod_ProizvodId",
                table: "NarudzbaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_Ocjena_Kupac_KupacId",
                table: "Ocjena");

            migrationBuilder.DropForeignKey(
                name: "FK_Ocjena_Prodavnica_ProdavnicaId",
                table: "Ocjena");

            migrationBuilder.DropForeignKey(
                name: "FK_Podkategorija_Kategorija_KategorijaId",
                table: "Podkategorija");

            migrationBuilder.DropForeignKey(
                name: "FK_Prodavnica_Grad_gradId",
                table: "Prodavnica");

            migrationBuilder.DropForeignKey(
                name: "FK_Proizvod_Boja_bojaId",
                table: "Proizvod");

            migrationBuilder.DropForeignKey(
                name: "FK_Skladiste_Grad_gradId",
                table: "Skladiste");

            migrationBuilder.DropForeignKey(
                name: "FK_Skladiste_Prodavnica_prodavnicaId",
                table: "Skladiste");

            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_Korisnik_Id",
                table: "Zaposlenik");

            migrationBuilder.DropForeignKey(
                name: "FK_Zvjezdica_Kupac_KupacId",
                table: "Zvjezdica");

            migrationBuilder.DropForeignKey(
                name: "FK_Zvjezdica_Proizvod_ProizvodId",
                table: "Zvjezdica");

            migrationBuilder.DropTable(
                name: "ProizvodSlika");

            migrationBuilder.DropIndex(
                name: "IX_Skladiste_prodavnicaId",
                table: "Skladiste");

            migrationBuilder.DropIndex(
                name: "IX_Prodavnica_gradId",
                table: "Prodavnica");

            migrationBuilder.DropColumn(
                name: "prodavnicaId",
                table: "Skladiste");

            migrationBuilder.DropColumn(
                name: "gradId",
                table: "Prodavnica");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorit_Kupac_KupacId",
                table: "Favorit",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorit_Proizvod_ProizvodId",
                table: "Favorit",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Komentar_Kupac_KupacId",
                table: "Komentar",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Komentar_Prodavnica_ProdavnicaId",
                table: "Komentar",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnik_Spol_SpolId",
                table: "Korisnik",
                column: "SpolId",
                principalTable: "Spol",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Korpa_Kupac_KupacId",
                table: "Korpa",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KorpaStavka_Proizvod_ProizvodId",
                table: "KorpaStavka",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Kupac_Korisnik_Id",
                table: "Kupac",
                column: "Id",
                principalTable: "Korisnik",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Narudzba_Kupac_KupacId",
                table: "Narudzba",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Narudzba_Zaposlenik_ZaposlenikId",
                table: "Narudzba",
                column: "ZaposlenikId",
                principalTable: "Zaposlenik",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NarudzbaStavka_Proizvod_ProizvodId",
                table: "NarudzbaStavka",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ocjena_Kupac_KupacId",
                table: "Ocjena",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ocjena_Prodavnica_ProdavnicaId",
                table: "Ocjena",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Podkategorija_Kategorija_KategorijaId",
                table: "Podkategorija",
                column: "KategorijaId",
                principalTable: "Kategorija",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Proizvod_Boja_bojaId",
                table: "Proizvod",
                column: "bojaId",
                principalTable: "Boja",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Skladiste_Grad_gradId",
                table: "Skladiste",
                column: "gradId",
                principalTable: "Grad",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_Korisnik_Id",
                table: "Zaposlenik",
                column: "Id",
                principalTable: "Korisnik",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Zvjezdica_Kupac_KupacId",
                table: "Zvjezdica",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Zvjezdica_Proizvod_ProizvodId",
                table: "Zvjezdica",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id");
        }
    }
}
