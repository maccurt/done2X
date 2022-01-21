using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Done2X.Domain;

namespace Done2X.Data.IMangerInterfaces
{
    public interface IGoalManager
    {
        public Task<GoalExtended> GetGoal(int goalId);
        public Task<IEnumerable<GoalExtended>> GetGoalList(ClaimsPrincipal user);
        public Task<IEnumerable<GoalExtended>> GetGoalList(int projectId);
        public Task<IEnumerable<GoalExtended>> GetCurrentGoalList(ClaimsPrincipal user);
        public Task<Goal> Add(Goal goal);
        public Task<Goal> Update(Goal goal);
        public Task<bool> Delete(int goalId);
        
    }
}