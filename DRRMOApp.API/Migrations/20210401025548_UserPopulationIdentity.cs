using Microsoft.EntityFrameworkCore.Migrations;

namespace DRRMOApp.API.Migrations
{
    public partial class UserPopulationIdentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Population",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Population",
                table: "AspNetUsers");
        }
    }
}
