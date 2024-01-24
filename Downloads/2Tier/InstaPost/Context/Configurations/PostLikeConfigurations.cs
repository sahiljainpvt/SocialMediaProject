using Core.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Configurations
{
    public class PostLikeConfigurations : IEntityTypeConfiguration<PostLike>
    {
        public void Configure(EntityTypeBuilder<PostLike> builder)
        {
            builder
                .HasOne(l => l.User)
                .WithMany(u => u.PostLikes);
            builder
                .HasOne(l => l.Post)
                .WithMany(p => p.PostLikes);
        }
    }
}
