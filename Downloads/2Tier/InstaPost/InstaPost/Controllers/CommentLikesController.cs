using Core.DTOs;
using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentLikesController : ControllerBase
    {
        private readonly ICommentLikesService commentLikesService;

        public CommentLikesController(ICommentLikesService commentLikesService)
        {
            this.commentLikesService = commentLikesService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await commentLikesService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            return Ok(await commentLikesService.GetById(id));
        }
        [HttpGet("getByUserId/{userId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] string userId)
        {
            return Ok(await commentLikesService.GetByUserId(userId));
        }
        [HttpGet("getByCommentId/{commentId}")]
        public async Task<IActionResult> GetByCommentId([FromRoute] int commentId)
        {
            return Ok(await commentLikesService.GetByCommentId(commentId));
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommentLikeDTO commentLike)
        {
            await commentLikesService.Create(commentLike);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] CommentLikeDTO commentLike)
        {
            await commentLikesService.Edit(commentLike);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await commentLikesService.Delete(id);
            return Ok();
        }
    }
}
