using Done2X.Data.IMangerInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Done2X.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GoalController : ControllerBase
    {
        private readonly IDomainManager _domainManager;

        public GoalController(IDomainManager domainManager)
        {
            _domainManager = domainManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetGoalList()
        {
            var list = await _domainManager.Goal.GetGoalList(User);
            return Ok(list);
        }


        [HttpGet]
        [Route("project/{projectId}")]
        public async Task<IActionResult> GetGoalListByProject(int projectId)
        {
            var canAccessProject = _domainManager.Security.CanAccessProject(projectId, User).Result;
            if (!canAccessProject)
            {
                return Unauthorized("Not Authorized For Project");
            }
            var list = await _domainManager.Goal.GetGoalList(projectId);
            return Ok(list);
        }
    }
}
