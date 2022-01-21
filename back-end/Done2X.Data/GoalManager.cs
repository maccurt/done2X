using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
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

        public async Task<GoalExtended> GetGoal(int goalId)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var goal = await connection.QueryAsync<GoalExtended>("API.GetGoal",
                commandType: CommandType.StoredProcedure, param: new {goalId});
            return goal.FirstOrDefault();
        }

        public async Task<IEnumerable<GoalExtended>> GetGoalList(ClaimsPrincipal user)
        {
            var authId = user.Identity.Name;
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var goalList = await connection.QueryAsync<GoalExtended>("API.GetGoalList",
                commandType: CommandType.StoredProcedure, param: new { authId });
            return goalList;
        }

        public async Task<IEnumerable<GoalExtended>> GetGoalList(int projectId)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var goalList = await connection.QueryAsync<GoalExtended>("API.GetProjectGoalList",
                commandType: CommandType.StoredProcedure, param: new { projectId });
            return goalList;
        }

        public async Task<IEnumerable<GoalExtended>> GetCurrentGoalList(ClaimsPrincipal user)
        {
            var authId = user.Identity.Name;
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var projectIdList = await connection.QueryAsync<int>("API.ProjectIdList",
                commandType: CommandType.StoredProcedure, param: new { authId });
            var goalList = new List<GoalExtended>();
            foreach (var i in projectIdList)
            {
                var goals = await connection.QueryAsync<GoalExtended>("API.GetCurrentGoal",
                    commandType: CommandType.StoredProcedure, param: new { authId });
                goalList.Add(goals.FirstOrDefault());
            }

            return goalList;

        }

        public async Task<Goal> Update(Goal goal)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            goal.UpdatedDate = DateTime.Now;
            if (goal.IsCompleted)
            {
                var taskNotCompleted = connection.QueryFirst<int>(
                     $"select count(*) from TaskItem where GoalId = @goalId and TaskItemStatusId !=3", new { goalId = goal.Id });
                if (taskNotCompleted > 0)
                {
                    var error = new DomainException("Goal can not be completed it has task that are not completed");
                    throw error;
                }

                goal.CompletionDate = goal.UpdatedDate;
            }

            await connection.UpdateAsync(goal);
            return goal;
        }

        public async Task<Boolean> Delete(int goalId)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var goal = await connection.GetAsync<Goal>(goalId);
            var result = await connection.DeleteAsync(goal);
            return result;
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
