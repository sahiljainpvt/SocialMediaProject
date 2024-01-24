using Core.DTOs;

namespace Core.Interfaces
{
    public interface ICommentsService
    {
        Task<IEnumerable<CommentDTO>> GetAll();
        Task<CommentDTO?> GetById(int id);
        Task<IEnumerable<CommentDTO>> GetByUserId(string userId);
        Task<IEnumerable<CommentDTO>> GetByPostId(int postId);
        Task Create(CommentDTO comment);
        Task Edit(CommentDTO comment);
        Task Delete(int id);
    }
}
