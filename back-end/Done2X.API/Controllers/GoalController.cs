using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Done2X.Data;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain;
using Microsoft.AspNetCore.Authorization;

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

        [HttpGet()]
        public async Task<IActionResult> GetGoalList()
        {
            var list = await _domainManager.Goal.GetGoalList(User);
            return Ok(list);
        }


        [HttpGet()]
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
