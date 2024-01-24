using Core.Entities;
using Core.Interfaces;
using Core.Services;
using Infrastructure;
using Microsoft.Extensions.FileProviders;
using WebAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddJWT(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext(builder.Configuration.GetConnectionString("LocalDb"));
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepository<Follow>, Repository<Follow>>();
builder.Services.AddScoped<IRepository<Post>, Repository<Post>>();
builder.Services.AddScoped<IRepository<Comment>, Repository<Comment>>();
builder.Services.AddScoped<IRepository<PostLike>, Repository<PostLike>>();
builder.Services.AddScoped<IRepository<CommentLike>, Repository<CommentLike>>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IPostsService, PostsService>();
builder.Services.AddScoped<ICommentsService, CommentsService>();
builder.Services.AddScoped<IPostLikesService, PostLikesService>();
builder.Services.AddScoped<ICommentLikesService, CommentLikesService>();
builder.Services.AddScoped<IFollowsService, FollowsService>();
builder.Services.AddScoped<IFileService,FileService>();
builder.Services.AddIdentity();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
