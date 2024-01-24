using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Core.Resources;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class FollowsService : IFollowsService
    {
        private readonly IRepository<Follow> followsRepo;
        private readonly IMapper mapper;
    
        public FollowsService(IRepository<Follow> followsRepo, IMapper mapper)
        {
            this.followsRepo = followsRepo;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<FollowDTO>> GetAll()
        {
            var follows = await followsRepo.GetAll();
            return mapper.Map<IEnumerable<FollowDTO>>(follows);
        }
        public async Task<FollowDTO?> GetById(int id)
        {
            Follow follow = await followsRepo.GetBySpec(new Follows.ById(id));
            if (follow == null)
                throw new HttpException(ErrorMessages.FollowByIdNotFound, HttpStatusCode.NotFound);
            return mapper.Map<FollowDTO>(follow);
        }
        public async Task<IEnumerable<FollowDTO>> GetByFollowerId(string userId)
        {
            var follows = await followsRepo.GetAllBySpec(new Follows.ByFollowerId(userId));
            return mapper.Map<IEnumerable<FollowDTO>>(follows);
        }
        public async Task<IEnumerable<FollowDTO>> GetByFollowedUserId(string userId)
        {
            var follows = await followsRepo.GetAllBySpec(new Follows.ByFollowedUserId(userId));
            return mapper.Map<IEnumerable<FollowDTO>>(follows);
        }
        public async Task Edit(FollowDTO follow)
        {
            await followsRepo.Update(mapper.Map<Follow>(follow));
            await followsRepo.Save();
        }

        public async Task Create(FollowDTO follow)
        {
            await followsRepo.Insert(mapper.Map<Follow>(follow));
            await followsRepo.Save();
        }

        public async Task Delete(int id)
        {
            if (await followsRepo.GetByID(id) == null)
                throw new HttpException(ErrorMessages.FollowByIdNotFound, HttpStatusCode.NotFound);
            await followsRepo.Delete(id);
            await followsRepo.Save();
        }
    }
}
