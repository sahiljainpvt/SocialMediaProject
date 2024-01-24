using Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IFollowsService
    {
        Task<IEnumerable<FollowDTO>> GetAll();
        Task<FollowDTO?> GetById(int id);
        Task<IEnumerable<FollowDTO>> GetByFollowerId(string userId);
        Task<IEnumerable<FollowDTO>> GetByFollowedUserId(string userId);
        Task Create(FollowDTO message);
        Task Edit(FollowDTO message);
        Task Delete(int id);
    }
}
