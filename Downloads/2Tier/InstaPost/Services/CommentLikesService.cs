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
    public class CommentLikesService : ICommentLikesService
    {
        private readonly IRepository<CommentLike> commentLikesRepo;
        private readonly IMapper mapper;

        public CommentLikesService(IRepository<CommentLike> commentLikesRepo, IMapper mapper)
        {
            this.commentLikesRepo = commentLikesRepo;
            this.mapper = mapper;
        }
        public async Task<CommentLikeDTO?> GetById(int id)
        {
            CommentLike commentLike = await commentLikesRepo.GetBySpec(new CommentLikes.ById(id));
            if (commentLike == null)
                throw new HttpException(ErrorMessages.CommentLikeByIdNotFound, HttpStatusCode.NotFound);
            return mapper.Map<CommentLikeDTO>(commentLike);
        }
        public async Task<IEnumerable<CommentLikeDTO>> GetAll()
        {
            var commentLikes = await commentLikesRepo.GetAll();
            return mapper.Map<IEnumerable<CommentLikeDTO>>(commentLikes);
        }
        public async Task<IEnumerable<CommentLikeDTO>> GetByCommentId(int commnentId)
        {
            var commentLikes = await commentLikesRepo.GetAllBySpec(new CommentLikes.ByCommentId(commnentId));
            return mapper.Map<IEnumerable<CommentLikeDTO>>(commentLikes);
        }
        public async Task<IEnumerable<CommentLikeDTO>> GetByUserId(string userId)
        {
            var commentLikes = await commentLikesRepo.GetAllBySpec(new CommentLikes.ByUserId(userId));
            return mapper.Map<IEnumerable<CommentLikeDTO>>(commentLikes);
        }
        public async Task Edit(CommentLikeDTO commentLike)
        {
            await commentLikesRepo.Update(mapper.Map<CommentLike>(commentLike));
            await commentLikesRepo.Save();
        }
        public async Task Create(CommentLikeDTO commentLike)
        {
            await commentLikesRepo.Insert(mapper.Map<CommentLike>(commentLike));
            await commentLikesRepo.Save();
        }
        public async Task Delete(int id)
        {
            if (await commentLikesRepo.GetByID(id) == null)
                throw new HttpException(ErrorMessages.CommentLikeByIdNotFound, HttpStatusCode.NotFound);
            await commentLikesRepo.Delete(id);
            await commentLikesRepo.Save();
        }
    }
}
