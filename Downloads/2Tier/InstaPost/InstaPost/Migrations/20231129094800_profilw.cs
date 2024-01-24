using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InstaPost.Migrations
{
    public partial class profilw : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostImage",
                table: "Posts",
                newName: "Profile");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Profile",
                table: "Posts",
                newName: "PostImage");
        }
    }
}
