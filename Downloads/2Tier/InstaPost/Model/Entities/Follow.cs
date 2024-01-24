namespace Core.Entities
{
    public class Follow
    {
        public int Id { get; set; }
        public string FollowerId { get; set; }
        public User Follower { get; set; }
        public string FollowedUserId { get; set; }
        public User FollowedUser { get; set; }
    }
}
