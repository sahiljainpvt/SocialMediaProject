using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UploadImage.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostsService postsService;
        private IWebHostEnvironment _hostingEnvironment;
        private bool success;


        public PostsController(IPostsService postsService, IWebHostEnvironment hostEnvironment)
        {
            this.postsService = postsService;
            _hostingEnvironment = hostEnvironment;
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await postsService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            return Ok(await postsService.GetById(id));
        }
        [HttpGet("getByUserId/{userId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] string userId)
        {
            return Ok(await postsService.GetByUserId(userId));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] PostDTO post)
        {
            if (ModelState.IsValid)
            {
                if (post.Image != null)
                {
                    string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "images");
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + post.Image.FileName;
                    string uploadFilePath = Path.Combine(uploadFolder, uniqueFileName);
                    post.Profile = uniqueFileName;
                    post.Image.CopyTo(new FileStream(uploadFilePath, FileMode.Create));
                }
                await postsService.Create(post);
            }
            object? status = null;
            return Ok(status);

        }
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] PostDTO post)
        {
            await postsService.Edit(post);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await postsService.Delete(id);
            return Ok();
        }
    }
}
