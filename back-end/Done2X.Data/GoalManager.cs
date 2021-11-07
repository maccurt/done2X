using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dommel;
using Done2X.Domain;

namespace Done2X.Data
{
    class GoalManager : ManagerAbstract, IGoalManager
    {
        public GoalManager(IDbConnection db) : base(db)
        {
        }

        public async Task<IEnumerable<Goal>> GetGoalList()
        {
            var list = await this._db.GetAllAsync<Goal>();
            return list;
        }
    }
}
