using System.ComponentModel.DataAnnotations.Schema;
using Core.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class User : IdentityUser
    {
        public string? ProfilePictureUrl { get; set; }
        public string? ProfileBackgroundUrl { get; set; }
        public string? DisplayUsername { get; set; }
        public DateTime DateRegistrated { get; set; }
        public string? City { get; set; }
        public ICollection<Follow> Followers { get; set; }
        public ICollection<Follow> FollowedUsers { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<PostLike> PostLikes { get; set; }
        public ICollection<CommentLike> CommentLikes { get; set; }

    
    
    }
}
