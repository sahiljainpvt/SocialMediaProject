using Ardalis.Specification;
using Core.Entities;

namespace Core.Specifications
{
    public static class CommentLikes
    {
        public class ById : Specification<CommentLike>
        {
            public ById(int id)
            {
                Query
                    .Where(c => c.Id == id);
            }
        }
        public class ByUserId : Specification<CommentLike>
        {
            public ByUserId(string userId)
            {
                Query
                    .Where(c => c.UserId == userId);
            }
        }
        public class ByCommentId : Specification<CommentLike>
        {
            public ByCommentId(int commentId)
            {
                Query
                    .Where(c => c.CommentId == commentId);
            }
        }
    }
}
