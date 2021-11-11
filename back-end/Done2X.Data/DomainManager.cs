using System.Data;
using System.Data.SqlClient;
using Done2X.Data.IMangerInterfaces;

namespace Done2X.Data
{
    public class DomainManager : IDomainManager
    {
        private readonly string _connectionString;
        private IDbConnection _db;
        

        public DomainManager(string connectionString)
        {
            _connectionString = connectionString;
            this._db = new SqlConnection(connectionString);
            this.TaskItem = new TaskItemManager(connectionString);
            this.Code = new CodeManager(connectionString);
            this.Goal = new GoalManager(connectionString);
            this.Security = new AppSecurityManager(connectionString);

            //Map Entities to field
            //FluentMapper.Initialize(config =>
            //{
            //    config.AddMap(new TaskItemMap());
            //    config.AddMap(new TaskItemStatusMap());
            //    config.AddMap(new GoalMap());
            //    config.ForDommel();
            //});
        }

        public ITaskItemManager TaskItem { get; set; }
        public ICodeManager Code { get; set; }
        public IGoalManager Goal { get; set; }
        public IAppSecurityManager Security { get; set; }
    }
}
