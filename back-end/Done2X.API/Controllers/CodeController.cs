using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Done2X.Data;

namespace Done2X.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodeController : ControllerBase
    {
        private readonly IDomainManager _domainManger;

        public CodeController(IDomainManager domainManger)
        {
            _domainManger = domainManger;
        }


        [HttpGet()]
        [Route("TaskItemStatus")]
        public async Task<IActionResult> GetTaskItemStatusList()
        {
            var list = await _domainManger.Code.GetTaskStatusList();
            return Ok(list);
        }
    }
}
