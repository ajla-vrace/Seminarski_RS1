using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class spol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KorisnickiNalog_Spol_SpolId",
                table: "KorisnickiNalog");

            migrationBuilder.DropIndex(
                name: "IX_KorisnickiNalog_SpolId",
                table: "KorisnickiNalog");

            migrationBuilder.DropColumn(
                name: "SpolId",
                table: "KorisnickiNalog");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SpolId",
                table: "KorisnickiNalog",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_KorisnickiNalog_SpolId",
                table: "KorisnickiNalog",
                column: "SpolId");

            migrationBuilder.AddForeignKey(
                name: "FK_KorisnickiNalog_Spol_SpolId",
                table: "KorisnickiNalog",
                column: "SpolId",
                principalTable: "Spol",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
