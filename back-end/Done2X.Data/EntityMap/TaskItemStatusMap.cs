using Dapper.FluentMap.Dommel.Mapping;
using Done2X.Domain.Codes;

namespace Done2X.Data.EntityMap
{
    public class TaskItemStatusMap : DommelEntityMap<TaskItemStatus>
    {
        public TaskItemStatusMap()
        {
            ToTable("TaskItemStatus");
            Map(x => x.Id).ToColumn("TaskItemStatusId").IsKey();
        }
    }
}