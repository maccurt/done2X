using Dapper.FluentMap.Dommel.Mapping;
using Done2X.Domain;

namespace Done2X.Data.EntityMap
{
    public class GoalMap : DommelEntityMap<Goal>
    {
        public GoalMap()
        {
            ToTable("Goal");
            Map(x => x.Id).ToColumn("GoalId").IsKey();
        }
    }
}