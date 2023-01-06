using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class korpaIdUKorpaStavka : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KorpaId",
                table: "KorpaStavka",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_KorpaStavka_KorpaId",
                table: "KorpaStavka",
                column: "KorpaId");

            migrationBuilder.AddForeignKey(
                name: "FK_KorpaStavka_Korpa_KorpaId",
                table: "KorpaStavka",
                column: "KorpaId",
                principalTable: "Korpa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KorpaStavka_Korpa_KorpaId",
                table: "KorpaStavka");

            migrationBuilder.DropIndex(
                name: "IX_KorpaStavka_KorpaId",
                table: "KorpaStavka");

            migrationBuilder.DropColumn(
                name: "KorpaId",
                table: "KorpaStavka");
        }
    }
}
