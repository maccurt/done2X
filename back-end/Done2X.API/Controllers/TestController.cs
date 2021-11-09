using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Done2X.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Route("private")]
        [Authorize]
        public IActionResult IsAuthorized()
        {
            return Ok(true);
        }

        [HttpGet()]
        public async Task<IEnumerable<string>> Get()
        {
            List<string> list;
            list = new List<string>();

            list.Add("Test Controller");

            var aspnetcoreEnvironment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            if (aspnetcoreEnvironment != null)
            {
                list.Add(aspnetcoreEnvironment);
            }

            return list;
        }
    }
}
