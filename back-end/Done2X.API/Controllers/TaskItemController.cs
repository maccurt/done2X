using Done2X.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Done2X.Data;
using Done2X.Data.IMangerInterfaces;
using Microsoft.AspNetCore.Authorization;

namespace Done2X.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskItemController : ControllerBase
    {
        private readonly IDomainManager _domainManager;

        public TaskItemController(IDomainManager domainManager)
        {
            _domainManager = domainManager;
        }

        [HttpGet()]
        [Route("goal/{goalId}")]
        public async Task<IActionResult> GetTaskItemList(int goalId)
        {
            var canAccess = await _domainManager.Security.CanAccessGoal(goalId, User);
            if (!canAccess)
            {
                return Unauthorized();
            };
            var list = await _domainManager.TaskItem.GetList(goalId);
            return Ok(list);
        }

        [HttpPost()]
        public async Task<IActionResult> AddTaskItem([FromBody] TaskItem taskItem)
        {
            if (!await _domainManager.Security.CanAccessGoal(taskItem.GoalId, User))
            {
                return Unauthorized();
            };
            var response = await _domainManager.TaskItem.Add(taskItem);
            return Ok(response);
        }

        [HttpPut()]
        public async Task<IActionResult> UpdateTaskItem([FromBody] TaskItem taskItem)
        {
            var canAlterTask = await _domainManager.Security.CanAlterTaskItem(taskItem.Id, User);
            if (!canAlterTask)
            {
                return Unauthorized();
            }

            var result = await _domainManager.TaskItem.Update(taskItem);
            return Ok(result);
        }

        [HttpDelete("{taskItemId}")]
        public async Task<IActionResult> DeleteTaskItem([FromRoute] int taskItemId)
        {
            var canAlterTask = await _domainManager.Security.CanAlterTaskItem(taskItemId, User);
            if (!canAlterTask)
            {
                return Unauthorized();
            }

            var taskItem = await _domainManager.TaskItem.Get(taskItemId);
            if (taskItem == null)
            {
                return NotFound();
            }

            await _domainManager.TaskItem.Delete(taskItemId);
            return Ok();
        }
    }
}
