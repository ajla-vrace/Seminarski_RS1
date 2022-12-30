using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class mod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ocjena_Kupac_KupacId",
                table: "Ocjena");

            migrationBuilder.DropForeignKey(
                name: "FK_Ocjena_Prodavnica_ProdavnicaId",
                table: "Ocjena");

            migrationBuilder.AlterColumn<int>(
                name: "ProdavnicaId",
                table: "Ocjena",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "KupacId",
                table: "Ocjena",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ocjena_Kupac_KupacId",
                table: "Ocjena");

            migrationBuilder.DropForeignKey(
                name: "FK_Ocjena_Prodavnica_ProdavnicaId",
                table: "Ocjena");

            migrationBuilder.AlterColumn<int>(
                name: "ProdavnicaId",
                table: "Ocjena",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KupacId",
                table: "Ocjena",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ocjena_Kupac_KupacId",
                table: "Ocjena",
                column: "KupacId",
                principalTable: "Kupac",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ocjena_Prodavnica_ProdavnicaId",
                table: "Ocjena",
                column: "ProdavnicaId",
                principalTable: "Prodavnica",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
