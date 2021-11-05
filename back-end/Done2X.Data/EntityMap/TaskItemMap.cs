using Dapper.FluentMap.Dommel.Mapping;
using Done2X.Domain;

namespace Done2X.Data.EntityMap
{
    public class TaskItemMap : DommelEntityMap<TaskItem>
    {
        public TaskItemMap()
        {
            ToTable("TaskItem");
            Map(x => x.Id).ToColumn("TaskItemId").IsKey();
        }
    }
}
