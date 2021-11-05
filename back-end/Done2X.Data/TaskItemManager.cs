using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Dommel;
using Done2X.Domain;

namespace Done2X.Data
{
    public class TaskItemManager : ManagerAbstract, ITaskItemManager
    {
        //private readonly IDbConnection _db;

        public TaskItemManager(IDbConnection db) : base(db)
        {
        }

        public async Task<IEnumerable<TaskItem>> GetList()
        {
            var list = await _db.GetAllAsync<TaskItem>();
            return list;
        }

        public async Task<TaskItem> Add(TaskItem taskItem)
        {
            taskItem.CreatedDate = DateTime.Now;
            var id = await _db.InsertAsync(taskItem);
            taskItem.Id = Convert.ToInt32(id);
            return taskItem;
        }

        public async Task<TaskItem> Update(TaskItem taskItem)
        {
            taskItem.UpdatedDate = DateTime.Now;
            await _db.UpdateAsync(taskItem);
            return taskItem;
        }

        public async Task<bool> Delete(int taskItemId)
        {
            var taskItem = await _db.GetAsync<TaskItem>(taskItemId);
            return await _db.DeleteAsync(taskItem);
        }

        public async Task<TaskItem> Get(int taskItemId)
        {
           return await _db.GetAsync<TaskItem>(taskItemId);
        }
    }
}
