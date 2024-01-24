using Core.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Configurations
{
    public class CommentLikeConfiguration : IEntityTypeConfiguration<CommentLike>
    {
        public void Configure(EntityTypeBuilder<CommentLike> builder)
        {
            builder
                .HasOne(l => l.User)
                .WithMany(u => u.CommentLikes);
            builder
                .HasOne(l => l.Comment)
                .WithMany(p => p.CommentLikes);
        }
    }
}