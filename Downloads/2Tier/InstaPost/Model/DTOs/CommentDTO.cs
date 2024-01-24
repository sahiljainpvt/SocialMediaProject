namespace Core.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserId { get; set; }
        public int PostId { get; set; }
        public ICollection<CommentLikeDTO>? CommentLikes { get; set; }
    }
}
