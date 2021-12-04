using System.Linq;
using Done2X.Data.IMangerInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Done2X.Domain;

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

        [HttpPost]
        public async Task<IActionResult> AddGoal([FromBody] Goal goal)
        {
            if (goal.Id >= 1)
            {
                return BadRequest("Id is invalid. Task may already exist.");
            }

            var canAccessProject = _domainManager.Security.CanAccessProject(goal.ProjectId, User).Result;
            if (!canAccessProject)
            {
                return Unauthorized("Not Authorized For Project");
            }

            var result = await _domainManager.Goal.Add(goal);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGoal([FromBody] Goal goal)
        {
            if (goal.Id <= 1)
            {
                return BadRequest("Id is invalid.");
            }

            var canAccessProject = _domainManager.Security.CanAccessProject(goal.ProjectId, User).Result;
            if (!canAccessProject)
            {
                return Unauthorized("Not Authorized For Project");
            }

            var result = await _domainManager.Goal.Update(goal);
            return Ok(result);
        }

        [HttpGet]
        [Route("{goalId}")]
        public async Task<IActionResult> GetGoal(int goalId)
        {
            if (!_domainManager.Security.CanAccessGoal(goalId, User).Result)
            {
                return Unauthorized("Not Authorized");
            }
            var goal = await _domainManager.Goal.GetGoal(goalId);

            if (goal == null)
            {
                return NotFound();
            }

            return Ok(goal);
        }

        [HttpGet]
        public async Task<IActionResult> GetGoalList()
        {
            var list = await _domainManager.Goal.GetGoalList(User);
            return Ok(list.OrderByDescending(g => g.TargetCompletionDate));
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
            return Ok(list.OrderByDescending(g => g.TargetCompletionDate));
        }
    }
}
