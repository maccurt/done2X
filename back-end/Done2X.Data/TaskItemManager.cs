using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Dapper;
using Dommel;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain;

namespace Done2X.Data
{
    public class TaskItemManager : ManagerAbstract, ITaskItemManager
    {
        private readonly string _connectionString;

        public TaskItemManager(string connectionString) : base(connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<TaskItem>> GetList(int goalId)
        {

            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var list = await connection.SelectAsync<TaskItem>(t => t.GoalId == goalId);
            return list.OrderByDescending(x => x.StatusUpdatedDate);
        }

        public async Task<TaskItem> Add(TaskItem taskItem)
        {
            taskItem.CreatedDate = DateTime.Now;
            taskItem.StatusUpdatedDate = taskItem.CreatedDate;

            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var id = await connection.InsertAsync(taskItem);
            taskItem.Id = Convert.ToInt32(id);

            return taskItem;
        }

        public async Task<TaskItem> Update(TaskItem taskItem)
        {
            taskItem.UpdatedDate = DateTime.Now;
            //Not sure I like this, can we do this with a trigger
            //We are trying to see if the status was changed
            //if so then we change the date. trigger can get ugly
            var baseline = await this.Get(taskItem.Id);
            if (baseline.TaskItemStatusId != taskItem.TaskItemStatusId)
            {
                taskItem.StatusUpdatedDate = taskItem.UpdatedDate;
            }
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            await connection.UpdateAsync(taskItem);
            return taskItem;
        }

        public async Task<bool> Delete(int taskItemId)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var taskItem = await connection.GetAsync<TaskItem>(taskItemId);
            var result = await connection.DeleteAsync(taskItem);
            return result;
        }

        public async Task<TaskItem> Get(int taskItemId)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var result = await connection.GetAsync<TaskItem>(taskItemId);
            return result;
        }

        public async Task MoveTaskListToGoal(List<int> taskItemIdList, int goalId)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            foreach (var taskItemId in taskItemIdList)
            {
                var query = $"update taskItem set goalId = {goalId} where taskItemId = {taskItemId}";
                await connection.QueryAsync(query, new { goalId, taskItemId });
            }
        }
    }
}
