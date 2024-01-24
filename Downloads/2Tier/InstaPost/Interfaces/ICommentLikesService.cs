using Core.DTOs;

namespace Core.Interfaces
{
    public interface ICommentLikesService
    {
        Task<IEnumerable<CommentLikeDTO>> GetAll();
        Task<CommentLikeDTO?> GetById(int id);
        Task<IEnumerable<CommentLikeDTO>> GetByUserId(string userId);
        Task<IEnumerable<CommentLikeDTO>> GetByCommentId(int commentId);
        Task Create(CommentLikeDTO commentLike);
        Task Edit(CommentLikeDTO commentLike);
        Task Delete(int id);
    }
}
