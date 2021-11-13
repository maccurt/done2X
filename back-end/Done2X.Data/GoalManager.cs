using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using Dommel;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain;

namespace Done2X.Data
{
    class GoalManager : ManagerAbstract, IGoalManager
    {
        private readonly string _connectionString;

        public GoalManager(string connectionString) : base(connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Goal>> GetGoalList(int projectId)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var list = await connection.SelectAsync<Goal>(g => g.ProjectId == projectId);

            return list;
        }

        public async Task<IEnumerable<Goal>> GetGoalList(ClaimsPrincipal user)
        {
            var authId = user.Identity.Name;
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var goalList = await connection.QueryAsync<Goal>("API.GetGoalList", commandType: CommandType.StoredProcedure, param: new { authId });
            return goalList;
        }

        public async Task<Goal> Update(Goal goal)
        {
            goal.UpdatedDate = DateTime.Now;
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            await connection.UpdateAsync(goal);
            return goal;
        }

        public async Task<Goal> Add(Goal goal)
        {
            goal.CreatedDate = DateTime.Now;
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var id = await connection.InsertAsync(goal);
            goal.Id = Convert.ToInt32(id);
            return goal;
        }

    }
}
