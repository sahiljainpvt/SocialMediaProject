using Core.DTOs;
using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Core.Resources;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net;
using AutoMapper;
using System.Drawing.Printing;
using Core.Specifications;
namespace Core.Services
{
    public class UsersService : IUsersService
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;
        private readonly IRepository<Follow> followsRepo;


        public UsersService(UserManager<User> userManager,
                            SignInManager<User> signInManager,
                            IMapper mapper,
                            IJwtService jwtService,
                            IRepository<Follow> followsRepo)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.jwtService = jwtService;
            this.followsRepo = followsRepo;
        }
  
        public async Task<IEnumerable<UserDTO>> GetAll()
        {
            var users = await userManager.Users.ToListAsync();
            return mapper.Map<IEnumerable<UserDTO>>(users);
        }
      

        public async Task<UserDTO> GetById(string id)
        {
            var user = await userManager.Users.Where(u => u.Id == id)
                .FirstOrDefaultAsync();
                
            if (user == null)
                throw new HttpException(ErrorMessages.UserByIdNotFound, HttpStatusCode.NotFound);
            return mapper.Map<UserDTO>(user);
        }
        public async Task<UserDTO> GetByUserName(string userName)
        {
            var user = await userManager.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();
            if (user == null)
                throw new HttpException(ErrorMessages.UserByUserNameNotFound, HttpStatusCode.NotFound);
            return mapper.Map<UserDTO>(user);
        }
        public async Task<IEnumerable<UserDTO>> GetByCity(string serchcity)
        {
            var city = await userManager.Users.Where(u=>u.City == serchcity).ToListAsync();
            return mapper.Map<IEnumerable<UserDTO>>(city);
        }
        public async Task<LoginResponseDto> Login(LoginDTO login)
        {
            var user = await userManager.FindByNameAsync(login.Username);
            if (user == null || !await userManager.CheckPasswordAsync(user, login.Password))
                throw new HttpException(ErrorMessages.InvalidCreds, HttpStatusCode.BadRequest);
            await signInManager.SignInAsync(user, true);

            return new LoginResponseDto()
            {
                Token = jwtService.CreateToken(jwtService.GetClaims(user)),
                UserId = user.Id,
            };
        }

        public async Task Logout()
        {
            await signInManager.SignOutAsync();
        }

        public async Task Register(RegisterDTO register) 
        {
            User user = new()
            {
                DisplayUsername = register.DisplayUsername,
                UserName = register.Username,
                Email = register.Email,
                PhoneNumber = register.PhoneNumber,
                DateRegistrated = DateTime.Now,
                City = register.City
            };

            var result = await userManager.CreateAsync(user, register.Password);

            if (!result.Succeeded)
            {
                string message = string.Join(", ", result.Errors.Select(x => x.Description));

                throw new HttpException(message, HttpStatusCode.BadRequest);
            }
        }

        public async Task Delete(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
                throw new HttpException(ErrorMessages.UserByIdNotFound, HttpStatusCode.NotFound);

            var result = await userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                string message = string.Join(", ", result.Errors.Select(x => x.Description));
                throw new HttpException(message, HttpStatusCode.BadRequest);
            }
        }

        public async Task Edit(UserDTO userDto)
        {
            var user = await userManager.FindByIdAsync(userDto.Id);
            if (user == null)
                throw new HttpException(ErrorMessages.UserByIdNotFound, HttpStatusCode.NotFound);
            mapper.Map(userDto, user);
            await userManager.UpdateAsync(user);
        }

        public async Task<IEnumerable<UserDTO>> GetFollowersByUserId(string userId)
        {
            var follows = await followsRepo.GetAllBySpec(new Follows.ByFollowedUserId(userId));
            var followersIds = follows.Select(f => f.FollowerId).Distinct();
            var followers = await userManager.Users.Where(u => followersIds.Contains(u.Id)).ToListAsync();
            return mapper.Map<IEnumerable<UserDTO>>(followers);
        }

        public async Task<IEnumerable<UserDTO>> GetFollowingByUserId(string userId)
        {
            var follows = await followsRepo.GetAllBySpec(new Follows.ByFollowerId(userId));
            var followingIds = follows.Select(f => f.FollowedUserId).Distinct();
            var followings = await userManager.Users.Where(u => followingIds.Contains(u.Id)).ToListAsync(); 
            return mapper.Map<IEnumerable<UserDTO>>(followings);
        }
        public async Task<IEnumerable<UserDTO>> GetLikedUsersByCommentId(int id)
        {
            var users = await userManager.Users
                .Where(x => x.CommentLikes.Any(x => x.CommentId == id)).ToListAsync();
            return mapper.Map<IEnumerable<UserDTO>>(users);
        }
        public async Task<IEnumerable<UserDTO>> GetLikedUsersByPostId(int id)
        {
            var users = await userManager.Users
                .Where(x => x.PostLikes.Any(x => x.PostId == id)).ToListAsync();
            return mapper.Map<IEnumerable<UserDTO>>(users);
        }

    }
}