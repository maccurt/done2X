using System.Security.Claims;
using System.Threading.Tasks;

namespace Done2X.Data
{
    public interface IAppSecurityManager
    {
        Task<bool> CanAccessProject(int projectId, ClaimsPrincipal user);
        Task<bool> CanAlterTaskItem(int taskItemId, ClaimsPrincipal user);
        Task<bool> CanAccessGoal(int goalId, ClaimsPrincipal user);
    }
}
