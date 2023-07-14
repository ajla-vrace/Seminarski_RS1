using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class prodavnicaskladiste : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Skladiste_Prodavnica_prodavnicaId",
                table: "Skladiste");

            migrationBuilder.DropIndex(
                name: "IX_Skladiste_prodavnicaId",
                table: "Skladiste");

            migrationBuilder.DropColumn(
                name: "prodavnicaId",
                table: "Skladiste");

            migrationBuilder.AddColumn<int>(
                name: "skladisteId",
                table: "Prodavnica",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prodavnica_skladisteId",
                table: "Prodavnica",
                column: "skladisteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prodavnica_Skladiste_skladisteId",
                table: "Prodavnica",
                column: "skladisteId",
                principalTable: "Skladiste",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prodavnica_Skladiste_skladisteId",
                table: "Prodavnica");

            migrationBuilder.DropIndex(
                name: "IX_Prodavnica_skladisteId",
                table: "Prodavnica");

            migrationBuilder.DropColumn(
                name: "skladisteId",
                table: "Prodavnica");

            migrationBuilder.AddColumn<int>(
                name: "prodavnicaId",
                table: "Skladiste",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Skladiste_prodavnicaId",
                table: "Skladiste",
                column: "prodavnicaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Skladiste_Prodavnica_prodavnicaId",
                table: "Skladiste",
                column: "prodavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id");
        }
    }
}
