using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class korisnickiNalogizmjenaNaziva : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutentifikacijaToken_Korisnik_KorisnickiNalogId",
                table: "AutentifikacijaToken");

            migrationBuilder.DropForeignKey(
                name: "FK_Korisnik_Spol_SpolId",
                table: "Korisnik");

            migrationBuilder.DropForeignKey(
                name: "FK_Kupac_Korisnik_Id",
                table: "Kupac");

            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_Korisnik_Id",
                table: "Zaposlenik");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Korisnik",
                table: "Korisnik");

            migrationBuilder.RenameTable(
                name: "Korisnik",
                newName: "KorisnickiNalog");

            migrationBuilder.RenameIndex(
                name: "IX_Korisnik_SpolId",
                table: "KorisnickiNalog",
                newName: "IX_KorisnickiNalog_SpolId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KorisnickiNalog",
                table: "KorisnickiNalog",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AutentifikacijaToken_KorisnickiNalog_KorisnickiNalogId",
                table: "AutentifikacijaToken",
                column: "KorisnickiNalogId",
                principalTable: "KorisnickiNalog",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KorisnickiNalog_Spol_SpolId",
                table: "KorisnickiNalog",
                column: "SpolId",
                principalTable: "Spol",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kupac_KorisnickiNalog_Id",
                table: "Kupac",
                column: "Id",
                principalTable: "KorisnickiNalog",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_KorisnickiNalog_Id",
                table: "Zaposlenik",
                column: "Id",
                principalTable: "KorisnickiNalog",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutentifikacijaToken_KorisnickiNalog_KorisnickiNalogId",
                table: "AutentifikacijaToken");

            migrationBuilder.DropForeignKey(
                name: "FK_KorisnickiNalog_Spol_SpolId",
                table: "KorisnickiNalog");

            migrationBuilder.DropForeignKey(
                name: "FK_Kupac_KorisnickiNalog_Id",
                table: "Kupac");

            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_KorisnickiNalog_Id",
                table: "Zaposlenik");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KorisnickiNalog",
                table: "KorisnickiNalog");

            migrationBuilder.RenameTable(
                name: "KorisnickiNalog",
                newName: "Korisnik");

            migrationBuilder.RenameIndex(
                name: "IX_KorisnickiNalog_SpolId",
                table: "Korisnik",
                newName: "IX_Korisnik_SpolId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Korisnik",
                table: "Korisnik",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AutentifikacijaToken_Korisnik_KorisnickiNalogId",
                table: "AutentifikacijaToken",
                column: "KorisnickiNalogId",
                principalTable: "Korisnik",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnik_Spol_SpolId",
                table: "Korisnik",
                column: "SpolId",
                principalTable: "Spol",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kupac_Korisnik_Id",
                table: "Kupac",
                column: "Id",
                principalTable: "Korisnik",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_Korisnik_Id",
                table: "Zaposlenik",
                column: "Id",
                principalTable: "Korisnik",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
