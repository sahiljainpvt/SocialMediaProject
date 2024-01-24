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
    public class Follows
    {
        public class ById : Specification<Follow>
        {
            public ById(int id)
            {
                Query
                    .Where(c => c.Id == id);
            }
        }
        public class ByFollowerId : Specification<Follow>
        {
            public ByFollowerId(string id)
            {
                Query
                    .Where(c => c.FollowerId == id);
            }
        }
        public class ByFollowedUserId : Specification<Follow>
        {
            public ByFollowedUserId(string id)
            {
                Query
                    .Where(c => c.FollowedUserId == id);
            }
        }
    }
}
