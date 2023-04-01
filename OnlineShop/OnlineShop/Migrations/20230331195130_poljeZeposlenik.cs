using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class poljeZeposlenik : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutentifikacijaToken_KorisnickiNalog_KorisnickiNalogId",
                table: "AutentifikacijaToken");

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
                name: "FK_Korpa_Kupac_KupacId",
                table: "Korpa");

            migrationBuilder.DropForeignKey(
                name: "FK_KorpaStavka_Korpa_KorpaId",
                table: "KorpaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_KorpaStavka_Proizvod_ProizvodId",
                table: "KorpaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_Kupac_KorisnickiNalog_Id",
                table: "Kupac");

            migrationBuilder.DropForeignKey(
                name: "FK_Narudzba_Kupac_KupacId",
                table: "Narudzba");

            migrationBuilder.DropForeignKey(
                name: "FK_Narudzba_Zaposlenik_ZaposlenikId",
                table: "Narudzba");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbaStavka_Narudzba_NarudzbaId",
                table: "NarudzbaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbaStavka_Proizvod_ProizvodId",
                table: "NarudzbaStavka");

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
                name: "FK_Zaposlenik_KorisnickiNalog_Id",
                table: "Zaposlenik");

            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_Prodavnica_ProdavnicaId",
                table: "Zaposlenik");

            migrationBuilder.DropForeignKey(
                name: "FK_Zvjezdica_Kupac_KupacId",
                table: "Zvjezdica");

            migrationBuilder.DropForeignKey(
                name: "FK_Zvjezdica_Proizvod_ProizvodId",
                table: "Zvjezdica");

            migrationBuilder.DropIndex(
                name: "IX_Narudzba_ZaposlenikId",
                table: "Narudzba");

            migrationBuilder.DropColumn(
                name: "ZaposlenikId",
                table: "Narudzba");

            migrationBuilder.AddForeignKey(
                name: "FK_AutentifikacijaToken_KorisnickiNalog_KorisnickiNalogId",
                table: "AutentifikacijaToken",
                column: "KorisnickiNalogId",
                principalTable: "KorisnickiNalog",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

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
                name: "FK_Korpa_Kupac_KupacId",
                table: "Korpa",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_KorpaStavka_Korpa_KorpaId",
                table: "KorpaStavka",
                column: "KorpaId",
                principalTable: "Korpa",
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
                name: "FK_Kupac_KorisnickiNalog_Id",
                table: "Kupac",
                column: "Id",
                principalTable: "KorisnickiNalog",
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
                name: "FK_NarudzbaStavka_Narudzba_NarudzbaId",
                table: "NarudzbaStavka",
                column: "NarudzbaId",
                principalTable: "Narudzba",
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
                name: "FK_Podkategorija_Kategorija_KategorijaId",
                table: "Podkategorija",
                column: "KategorijaId",
                principalTable: "Kategorija",
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
                name: "FK_Zaposlenik_KorisnickiNalog_Id",
                table: "Zaposlenik",
                column: "Id",
                principalTable: "KorisnickiNalog",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_Prodavnica_ProdavnicaId",
                table: "Zaposlenik",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
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
                name: "FK_AutentifikacijaToken_KorisnickiNalog_KorisnickiNalogId",
                table: "AutentifikacijaToken");

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
                name: "FK_Korpa_Kupac_KupacId",
                table: "Korpa");

            migrationBuilder.DropForeignKey(
                name: "FK_KorpaStavka_Korpa_KorpaId",
                table: "KorpaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_KorpaStavka_Proizvod_ProizvodId",
                table: "KorpaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_Kupac_KorisnickiNalog_Id",
                table: "Kupac");

            migrationBuilder.DropForeignKey(
                name: "FK_Narudzba_Kupac_KupacId",
                table: "Narudzba");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbaStavka_Narudzba_NarudzbaId",
                table: "NarudzbaStavka");

            migrationBuilder.DropForeignKey(
                name: "FK_NarudzbaStavka_Proizvod_ProizvodId",
                table: "NarudzbaStavka");

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
                name: "FK_Zaposlenik_KorisnickiNalog_Id",
                table: "Zaposlenik");

            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_Prodavnica_ProdavnicaId",
                table: "Zaposlenik");

            migrationBuilder.DropForeignKey(
                name: "FK_Zvjezdica_Kupac_KupacId",
                table: "Zvjezdica");

            migrationBuilder.DropForeignKey(
                name: "FK_Zvjezdica_Proizvod_ProizvodId",
                table: "Zvjezdica");

            migrationBuilder.AddColumn<int>(
                name: "ZaposlenikId",
                table: "Narudzba",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Narudzba_ZaposlenikId",
                table: "Narudzba",
                column: "ZaposlenikId");

            migrationBuilder.AddForeignKey(
                name: "FK_AutentifikacijaToken_KorisnickiNalog_KorisnickiNalogId",
                table: "AutentifikacijaToken",
                column: "KorisnickiNalogId",
                principalTable: "KorisnickiNalog",
                principalColumn: "Id");

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
                name: "FK_Korpa_Kupac_KupacId",
                table: "Korpa",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KorpaStavka_Korpa_KorpaId",
                table: "KorpaStavka",
                column: "KorpaId",
                principalTable: "Korpa",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KorpaStavka_Proizvod_ProizvodId",
                table: "KorpaStavka",
                column: "ProizvodId",
                principalTable: "Proizvod",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Kupac_KorisnickiNalog_Id",
                table: "Kupac",
                column: "Id",
                principalTable: "KorisnickiNalog",
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
                name: "FK_NarudzbaStavka_Narudzba_NarudzbaId",
                table: "NarudzbaStavka",
                column: "NarudzbaId",
                principalTable: "Narudzba",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NarudzbaStavka_Proizvod_ProizvodId",
                table: "NarudzbaStavka",
                column: "ProizvodId",
                principalTable: "Proizvod",
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
                name: "FK_Zaposlenik_KorisnickiNalog_Id",
                table: "Zaposlenik",
                column: "Id",
                principalTable: "KorisnickiNalog",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_Prodavnica_ProdavnicaId",
                table: "Zaposlenik",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
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
