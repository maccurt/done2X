using System.Data;
using System.Data.SqlClient;
using Dapper.FluentMap;
using Dapper.FluentMap.Dommel;
using Done2X.Data.EntityMap;

namespace Done2X.Data
{
    public class DomainManager : IDomainManager
    {
        private IDbConnection _db;

        public DomainManager(string connectionString)
        {
            this._db = new SqlConnection(connectionString);
            this.TaskItem = new TaskItemManager(this._db);
            this.Code = new CodeManager(this._db);
            this.Goal = new GoalManager(this._db);

            //Map Entities to field
            FluentMapper.Initialize(config =>
            {
                config.AddMap(new TaskItemMap());
                config.AddMap(new TaskItemStatusMap());
                config.AddMap(new GoalMap());
                config.ForDommel();
            });
        }

        public ITaskItemManager TaskItem { get; set; }
        public ICodeManager Code { get; set; }
        public IGoalManager Goal { get; set; }
    }
}
