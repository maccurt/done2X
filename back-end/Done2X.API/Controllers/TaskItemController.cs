using Done2X.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;
using Done2X.Data;

namespace Done2X.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemController : ControllerBase
    {
        private readonly IDomainManager _domainManager;

        public TaskItemController(IDomainManager domainManager)
        {
            _domainManager = domainManager;
        }

        [HttpGet()]
        [Route("goal/{goalId}")]
        public async Task<IEnumerable<TaskItem>> GetTaskItemList(int goalId)
        {
            var list = await _domainManager.TaskItem.GetList(goalId);
            return list;
        }

        //[HttpGet()]
        //public async Task<IEnumerable<TaskItem>> GetTaskItem()
        //{
        //    var list = await _domainManager.TaskItem.GetList();
        //    return list;
        //}

        [HttpPost()]
        public async Task<TaskItem> AddTaskItem([FromBody] TaskItem taskItem)
        {
            return await _domainManager.TaskItem.Add(taskItem);
        }

        [HttpPut()]
        public async Task<TaskItem> UpdateTaskItem([FromBody] TaskItem taskItem)
        {
            return await _domainManager.TaskItem.Update(taskItem);
        }


        [HttpDelete("{taskItemId}")]
        public async Task<IActionResult> DeleteTaskItem([FromRoute] int taskItemId)
        {
            var taskItem = await _domainManager.TaskItem.Get(taskItemId);
            if (taskItem == null)
            {
                return NotFound();
            }
            await _domainManager.TaskItem.Delete(taskItemId);
            return Ok(true);
        }
    }
}
