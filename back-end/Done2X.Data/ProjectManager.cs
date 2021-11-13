using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dommel;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain;

namespace Done2X.Data
{
    class ProjectManager : ManagerAbstract, IProjectManager
    {
        private readonly string _connectionString;

        public ProjectManager(string connectionString) : base(connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<Project> DefaultProject(ClaimsPrincipal user)
        {
            var authId = user.Identity.Name;
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var project = await connection.QueryAsync<Project>("API.GetDefaultProject",
                commandType: CommandType.StoredProcedure, param: new { authId });

            //TODO null check, fix, etc..
            return project.FirstOrDefault();
        }
    }
}
