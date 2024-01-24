using Ardalis.Specification;
using Core.Entities;

namespace Core.Specifications
{
    public static class PostLikes
    {
        public class ById : Specification<PostLike>
        {
            public ById(int id)
            {
                Query
                    .Where(c => c.Id == id);
            }
        }
        public class ByUserId : Specification<PostLike>
        {
            public ByUserId(string userId)
            {
                Query
                    .Where(c => c.UserId == userId);
            }
        }
        public class ByPostId : Specification<PostLike>
        {
            public ByPostId(int postId)
            {
                Query
                    .Where(c => c.PostId == postId);
            }
        }
    }
}
