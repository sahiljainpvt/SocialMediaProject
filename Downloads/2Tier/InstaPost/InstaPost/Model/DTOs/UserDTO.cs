using Core.Entities;
using System.Text.Json.Serialization;

namespace Core.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string? ProfileBackgroundUrl { get; set; }
        public string? DisplayUsername { get; set; }
        public string? City { get; set; }
        public DateTime DateRegistrated { get; set; }
        public ICollection<FollowDTO>? Followers { get; set; }
        public ICollection<FollowDTO>? FollowedUsers { get; set; }
        public ICollection<PostDTO>? Posts { get; set; }
        public ICollection<CommentDTO>? Comments { get; set; }
        public ICollection<PostLikeDTO>? PostLikes { get; set; }
        public ICollection<CommentLikeDTO>? CommentLikes { get; set; }

    }
}
