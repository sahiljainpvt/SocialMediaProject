using Ardalis.Specification;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Core.Specifications
{
    public class Users
    {
        public class ById : Specification<User>
        {
            public ById(string id)
            {
                Query
                    .Where(x => x.Id == id)
                        .Include(x => x.Followers)
                        .Include(x => x.FollowedUsers);
            }
        }
    }
}
