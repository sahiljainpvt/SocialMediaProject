using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Core.Resources;
using Core.Specifications;
using System.Net;

namespace Core.Services
{
    public class PostLikesService : IPostLikesService
    {
        private readonly IRepository<PostLike> postLikesRepo;
        private readonly IMapper mapper;

        public PostLikesService(IRepository<PostLike> postLikesRepo, IMapper mapper)
        {
            this.postLikesRepo = postLikesRepo;
            this.mapper = mapper;
        }
        public async Task<PostLikeDTO?> GetById(int id)
        {
            PostLike postLike = await postLikesRepo.GetBySpec(new PostLikes.ById(id));
            if (postLike == null)
                throw new HttpException(ErrorMessages.PostLikeByIdNotFound, HttpStatusCode.NotFound);
            return mapper.Map<PostLikeDTO>(postLike);
        }
        public async Task<IEnumerable<PostLikeDTO>> GetAll()
        {
            var postLikes = await postLikesRepo.GetAll();
            return mapper.Map<IEnumerable<PostLikeDTO>>(postLikes);
        }
        public async Task<IEnumerable<PostLikeDTO>> GetByPostId(int postId)
        {
            var postLikes = await postLikesRepo.GetAllBySpec(new PostLikes.ByPostId(postId));
            return mapper.Map<IEnumerable<PostLikeDTO>>(postLikes);
        }
        public async Task<IEnumerable<PostLikeDTO>> GetByUserId(string userId)
        {
            var postLikes = await postLikesRepo.GetAllBySpec(new PostLikes.ByUserId(userId));
            return mapper.Map<IEnumerable<PostLikeDTO>>(postLikes);
        }
        public async Task Edit(PostLikeDTO postLike)
        {
            await postLikesRepo.Update(mapper.Map<PostLike>(postLike));
            await postLikesRepo.Save();
        }
        public async Task Create(PostLikeDTO postLike)
        {
            await postLikesRepo.Insert(mapper.Map<PostLike>(postLike));
            await postLikesRepo.Save();
        }
        public async Task Delete(int id)
        {
            if (await postLikesRepo.GetByID(id) == null)
                throw new HttpException(ErrorMessages.PostLikeByIdNotFound, HttpStatusCode.NotFound);
            await postLikesRepo.Delete(id);
            await postLikesRepo.Save();
        }
    }
}
