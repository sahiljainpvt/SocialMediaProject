using Core.DTOs;
using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsService commentsService;


        public CommentsController(ICommentsService commentsService)
        {
            this.commentsService = commentsService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await commentsService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            return Ok(await commentsService.GetById(id));
        }
        [HttpGet("getByUserId/{userId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] string userId)
        {
            return Ok(await commentsService.GetByUserId(userId));
        }
        [HttpGet("getByPostId/{postId}")]
        public async Task<IActionResult> GetByPostId([FromRoute] int postId)
        {
            return Ok(await commentsService.GetByPostId(postId));
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommentDTO comment)
        {
            await commentsService.Create(comment);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] CommentDTO comment)
        {
            await commentsService.Edit(comment);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await commentsService.Delete(id);
            return Ok();
        }
    }
}
