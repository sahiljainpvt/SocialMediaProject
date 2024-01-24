using Ardalis.Specification;
using Core.Entities;

namespace Core.Specifications
{
    public static class Comments
    {
        public class ById : Specification<Comment>
        {
            public ById(int id)
            {
                Query
                    .Where(c => c.Id == id)
                    .Include(c => c.CommentLikes);
            }
        }
        public class OrderedByLikes : Specification<Comment>
        {
            public OrderedByLikes()
            {
                Query
                    .OrderBy(x => x.CommentLikes.Count)
                    .Include(x => x.CommentLikes);
            }
        }
        public class ByUserId : Specification<Comment>
        {
            public ByUserId(string userId)
            {
                Query
                    .Where(c => c.UserId == userId)
                    .Include(c => c.CommentLikes);
            }
        }
        public class ByPostId : Specification<Comment>
        {
            public ByPostId(int postId)
            {
                Query
                    .Where(c => c.PostId == postId)
                    .Include(c => c.CommentLikes);
            }
        }
    }
}
