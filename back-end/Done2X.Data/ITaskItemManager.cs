using System.Collections.Generic;
using System.Threading.Tasks;
using Done2X.Domain;

namespace Done2X.Data
{
  public interface ITaskItemManager
  {
    Task<IEnumerable<TaskItem>> GetList();
    Task<TaskItem> Add(TaskItem taskItem);
    Task<TaskItem> Update(TaskItem taskItem);
    Task<bool> Delete(int taskItemId);
    Task<TaskItem> Get(int taskItemId);
  }
}
