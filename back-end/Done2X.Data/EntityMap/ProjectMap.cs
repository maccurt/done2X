using Dapper.FluentMap.Dommel.Mapping;
using Done2X.Domain;

namespace Done2X.Data.EntityMap
{
    public class ProjectMap : DommelEntityMap<Project>
    {
        public ProjectMap()
        {
            ToTable("Project");
            Map(x => x.Id).ToColumn("ProjectId").IsKey();
        }
    }

    public class ProjectExtendedMap : DommelEntityMap<ProjectExtended>
    {
        public ProjectExtendedMap()
        {
            ToTable("Project");
            Map(x => x.Id).ToColumn("ProjectId").IsKey();
            Map(x => x.CurrentGoals).Ignore();
        }
    }
}