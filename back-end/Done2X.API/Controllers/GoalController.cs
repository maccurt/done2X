using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Done2X.Data;
using Done2X.Domain;

namespace Done2X.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly IDomainManager _domainManager;

        public GoalController(IDomainManager domainManager)
        {
            _domainManager = domainManager;
        }

        [HttpGet()]
        public async Task<IEnumerable<Goal>> GetGoalList()
        {
            return await _domainManager.Goal.GetGoalList();
        }
    }
}
