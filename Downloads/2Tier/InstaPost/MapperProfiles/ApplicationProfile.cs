using AutoMapper;
using Core.DTOs;
using Core.Entities;

namespace Core.MapperProfiles
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
             CreateMap<Post, PostDTO>().ReverseMap()
                .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => DateTime.Now));

            CreateMap<Comment, CommentDTO>().ReverseMap()
                .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => DateTime.Now));

            CreateMap<PostLike, PostLikeDTO>().ReverseMap();

            CreateMap<CommentLike, CommentLikeDTO>().ReverseMap();
            CreateMap<Follow, FollowDTO>().ReverseMap();

        }
    }
}
