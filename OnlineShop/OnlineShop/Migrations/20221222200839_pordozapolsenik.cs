using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class pordozapolsenik : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProdavnicaId",
                table: "Zaposlenik",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Zaposlenik_ProdavnicaId",
                table: "Zaposlenik",
                column: "ProdavnicaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_Prodavnica_ProdavnicaId",
                table: "Zaposlenik",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_Prodavnica_ProdavnicaId",
                table: "Zaposlenik");

            migrationBuilder.DropIndex(
                name: "IX_Zaposlenik_ProdavnicaId",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "ProdavnicaId",
                table: "Zaposlenik");
        }
    }
}
