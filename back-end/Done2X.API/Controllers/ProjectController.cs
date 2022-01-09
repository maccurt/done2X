using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Done2X.Data.IMangerInterfaces;
using Microsoft.AspNetCore.Authorization;

namespace Done2X.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IDomainManager _domainManager;

        public ProjectController(IDomainManager domainManager)
        {
            _domainManager = domainManager;
        }

        [HttpGet()]
        [Route("list")]
        public async Task<IActionResult> GetList()
        {
            var projectList = await _domainManager.Project.GetProjectList(User);
            return Ok(projectList);
        }

        

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var project = await _domainManager.Project.DefaultProject(User);
            return Ok(project);
        }

    }
}
