using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Done2X.Domain;

namespace Done2X.Data.IMangerInterfaces
{
    public interface IGoalManager
    {
        public Task<IEnumerable<Goal>> GetGoalList(int projectId);
        public Task<IEnumerable<Goal>> GetGoalList(ClaimsPrincipal user);
        public Task<Goal> Add(Goal goal);
        public Task<Goal> Update(Goal goal);
    }
}