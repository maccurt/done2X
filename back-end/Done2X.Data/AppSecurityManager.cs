using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using Done2X.Data.IMangerInterfaces;

namespace Done2X.Data
{
    class AppSecurityManager : ManagerAbstract, IAppSecurityManager
    {
        private readonly string _connectionString;
        public AppSecurityManager(string connectionString) : base(connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> CanAccessProject(int projectId, ClaimsPrincipal user) {

            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var query =
                $"Select count(p.projectID) from project as p join AppUser as A on A.UserId = p.UserId where A.AuthId = '{user.Identity.Name}' and p.projectId = {projectId}";
            var id = await connection.ExecuteScalarAsync<int>(query);
            return id > 0;
        }

        public async Task<bool> CanAlterTaskItem(int taskItemId, ClaimsPrincipal user)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var authId = user.Identity.Name;
            var id = await connection.ExecuteScalarAsync<int>("API.CanAlterTaskItem",
                commandType: CommandType.StoredProcedure,
                param: new { authId, taskItemId });
            return id > 0;
        }

        public async Task<bool> CanAccessGoal(int goalId, ClaimsPrincipal user)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var query =
                $"Select g.goalId from goal as g join project as p on p.projectId = g.ProjectId join AppUser as a on a.UserId = p.UserId where 	g.goalId = {goalId} and	A.AuthId = '{user.Identity.Name}'";
            var id = await connection.ExecuteScalarAsync<int>(query);
            return id > 0;

        }
    }
}
