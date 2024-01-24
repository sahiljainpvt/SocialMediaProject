using Core.DTOs;
using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowsController : ControllerBase
    {
        private readonly IFollowsService followsService;

        public FollowsController(IFollowsService followsService)
        {
            this.followsService = followsService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await followsService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            return Ok(await followsService.GetById(id));
        }
        [HttpGet("getByFollowerId/{userId}")]
        public async Task<IActionResult> GetByFollowerId([FromRoute] string userId)
        {
            return Ok(await followsService.GetByFollowerId(userId));
        }
        [HttpGet("getByFollowedUserId/{userId}")]
        public async Task<IActionResult> GetByFollowedUserId([FromRoute] string userId)
        {
            return Ok(await followsService.GetByFollowedUserId(userId));
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FollowDTO follow)
        {
            await followsService.Create(follow);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] FollowDTO follow)
        {
            await followsService.Edit(follow);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await followsService.Delete(id);
            return Ok();
        }
    }
}
