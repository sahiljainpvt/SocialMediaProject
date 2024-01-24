using Core.DTOs;

namespace Core.Interfaces
{
    public interface IPostsService
    {
        Task<IEnumerable<PostDTO>> GetPostsFromFollowedUsers(IEnumerable<string> followedUserIds);
        Task<IEnumerable<PostDTO>> GetAll();
        Task<PostDTO?> GetById(int id);
        Task<IEnumerable<PostDTO>> GetByUserId(string userId);
        Task Create(PostDTO post);
        Task Edit(PostDTO post);
        Task Delete(int id);
        

    }
}
