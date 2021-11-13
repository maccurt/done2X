using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Done2X.Domain;

namespace Done2X.Data.IMangerInterfaces
{
    public interface IProjectManager
    {

        Task<Project> DefaultProject(ClaimsPrincipal user);

    }
}
