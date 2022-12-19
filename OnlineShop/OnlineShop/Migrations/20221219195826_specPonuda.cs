using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class specPonuda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Popust",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Popust", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SpecijalnaPonudaProizvod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    specijalnaPonudaId = table.Column<int>(type: "int", nullable: true),
                    proizvodId = table.Column<int>(type: "int", nullable: true),
                    popustId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecijalnaPonudaProizvod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpecijalnaPonudaProizvod_Popust_popustId",
                        column: x => x.popustId,
                        principalTable: "Popust",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SpecijalnaPonudaProizvod_Proizvod_proizvodId",
                        column: x => x.proizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SpecijalnaPonudaProizvod_SpecijalnaPonuda_specijalnaPonudaId",
                        column: x => x.specijalnaPonudaId,
                        principalTable: "SpecijalnaPonuda",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SpecijalnaPonudaProizvod_popustId",
                table: "SpecijalnaPonudaProizvod",
                column: "popustId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecijalnaPonudaProizvod_proizvodId",
                table: "SpecijalnaPonudaProizvod",
                column: "proizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecijalnaPonudaProizvod_specijalnaPonudaId",
                table: "SpecijalnaPonudaProizvod",
                column: "specijalnaPonudaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SpecijalnaPonudaProizvod");

            migrationBuilder.DropTable(
                name: "Popust");
        }
    }
}
