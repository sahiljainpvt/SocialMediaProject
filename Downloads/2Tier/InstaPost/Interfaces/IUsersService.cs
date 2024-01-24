using Core.DTOs;

namespace Core.Interfaces
{
    public interface IUsersService
    {
        Task<IEnumerable<UserDTO>> GetAll();
        Task<UserDTO> GetById(string id);
        Task<UserDTO> GetByUserName(string userName);
        Task<IEnumerable<UserDTO>> GetByCity(string city);
        Task<IEnumerable<UserDTO>> GetFollowersByUserId(string id);
        Task<IEnumerable<UserDTO>> GetFollowingByUserId(string id);
        Task<IEnumerable<UserDTO>> GetLikedUsersByCommentId(int id);
        Task<IEnumerable<UserDTO>> GetLikedUsersByPostId(int id);

        Task<LoginResponseDto> Login(LoginDTO loginDTO);
        Task Register(RegisterDTO registerDTO);
        Task Logout();
        Task Delete(string id);
        Task Edit(UserDTO user);
    }
}