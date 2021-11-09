using System.Collections.Generic;
using System.Data;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using Dommel;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain;

namespace Done2X.Data
{
    class GoalManager : ManagerAbstract, IGoalManager
    {
        public GoalManager(IDbConnection db) : base(db)
        {
        }

        public async Task<IEnumerable<Goal>> GetGoalList(int projectId)
        {
            _db.Open();
            var list = await this._db.SelectAsync<Goal>(g => g.ProjectId == projectId);
            _db.Close();
            return list;
        }

        public async Task<IEnumerable<Goal>> GetGoalList(ClaimsPrincipal user)
        {
            var authId = user.Identity.Name;
            _db.Open();
            var goalList = await _db.QueryAsync<Goal>("API.GetGoalList", commandType: CommandType.StoredProcedure, param: new { authId });
            _db.Close();
            return goalList;
        }
    }
}
