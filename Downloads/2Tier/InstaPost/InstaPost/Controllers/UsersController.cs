using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.DTOs;
using System.Text.Json.Serialization;
using System.Text.Json;
using Core.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await usersService.GetAll());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] string id)
        {
            return Ok(await usersService.GetById(id));
        }
        [HttpGet("getByUserName/{userName}")]
        public async Task<IActionResult> GetByUserName([FromRoute] string userName)
        {
            return Ok(await usersService.GetByUserName(userName));
        }
        [HttpGet("getByCity/{city}")]
        public async Task<IActionResult> GetByCity([FromRoute] string city)
        {
            return Ok(await usersService.GetByCity(city));
        }
        [HttpGet("getFollowersByUserId/{userId}")]
        public async Task<IActionResult> GetFollowersByUserId([FromRoute] string userId)
        {
            return Ok(await usersService.GetFollowersByUserId(userId));
        }
        [HttpGet("getFollowingByUserId/{userId}")]
        public async Task<IActionResult> GetFollowingByUserId([FromRoute] string userId)
        {
            return Ok(await usersService.GetFollowingByUserId(userId));
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO register)
        {
            await usersService.Register(register);
            return Ok();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO login)
        {
            var response = await usersService.Login(login);
            return Ok(response);
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await usersService.Logout();
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            await usersService.Delete(id);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] UserDTO user)
        {
            await usersService.Edit(user);
            return Ok();
        }
    }
}
