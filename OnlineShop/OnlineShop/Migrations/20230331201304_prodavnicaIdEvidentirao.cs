using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class prodavnicaIdEvidentirao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Evidentirao",
                table: "Narudzba",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProdavnicaId",
                table: "Narudzba",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Narudzba_ProdavnicaId",
                table: "Narudzba",
                column: "ProdavnicaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Narudzba_Prodavnica_ProdavnicaId",
                table: "Narudzba",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Narudzba_Prodavnica_ProdavnicaId",
                table: "Narudzba");

            migrationBuilder.DropIndex(
                name: "IX_Narudzba_ProdavnicaId",
                table: "Narudzba");

            migrationBuilder.DropColumn(
                name: "Evidentirao",
                table: "Narudzba");

            migrationBuilder.DropColumn(
                name: "ProdavnicaId",
                table: "Narudzba");
        }
    }
}
