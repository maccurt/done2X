using System;
using System.Collections;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Done2X.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
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
