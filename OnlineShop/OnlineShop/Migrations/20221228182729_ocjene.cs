using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class ocjene : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prodavnica_Grad_gradId",
                table: "Prodavnica");

            migrationBuilder.DropColumn(
                name: "DatumModifikacije",
                table: "Zvjezdica");

            migrationBuilder.DropColumn(
                name: "DatumModifikacije",
                table: "Ocjena");

            migrationBuilder.AlterColumn<int>(
                name: "gradId",
                table: "Prodavnica",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Prodavnica_Grad_gradId",
                table: "Prodavnica",
                column: "gradId",
                principalTable: "Grad",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prodavnica_Grad_gradId",
                table: "Prodavnica");

            migrationBuilder.AddColumn<DateTime>(
                name: "DatumModifikacije",
                table: "Zvjezdica",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "gradId",
                table: "Prodavnica",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DatumModifikacije",
                table: "Ocjena",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Prodavnica_Grad_gradId",
                table: "Prodavnica",
                column: "gradId",
                principalTable: "Grad",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
