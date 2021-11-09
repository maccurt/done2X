using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dommel;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain;

namespace Done2X.Data
{
    public class TaskItemManager : ManagerAbstract, ITaskItemManager
    {
        public TaskItemManager(IDbConnection db) : base(db)
        {
        }

        public async Task<IEnumerable<TaskItem>> GetList(int goalId)
        {
            _db.Open();
            var list = await _db.SelectAsync<TaskItem>(t => t.GoalId == goalId);
            _db.Close();
            return list.OrderByDescending(x => x.StatusUpdatedDate);
        }

        public async Task<TaskItem> Add(TaskItem taskItem)
        {
            taskItem.CreatedDate = DateTime.Now;
            taskItem.StatusUpdatedDate = taskItem.CreatedDate;
            _db.Open();
            var id = await _db.InsertAsync(taskItem);
            taskItem.Id = Convert.ToInt32(id);
            _db.Close();
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
            _db.Open();
            await _db.UpdateAsync(taskItem);
            _db.Close();
            return taskItem;
        }

        public async Task<bool> Delete(int taskItemId)
        {
            _db.Open();
            var taskItem = await _db.GetAsync<TaskItem>(taskItemId);
            var result = await _db.DeleteAsync(taskItem);
            _db.Close();
            return result;
        }

        public async Task<TaskItem> Get(int taskItemId)
        {
            _db.Open();
            var result = await _db.GetAsync<TaskItem>(taskItemId);
            _db.Close();
            return result;
        }
    }
}
