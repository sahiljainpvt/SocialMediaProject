using Ardalis.Specification;
using Core.Entities;

public class PostsByFollowedUsersSpecification : Specification<Post>
{
    public PostsByFollowedUsersSpecification(IEnumerable<string> followedUserIds)
    {
        Query.Where(post => followedUserIds.Contains(post.UserId));
    }
}
