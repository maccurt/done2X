using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dommel;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain.Codes;

namespace Done2X.Data
{
    public interface ICodeManager
    {
        public Task<IEnumerable<TaskItemStatus>> GetTaskStatusList();
    }

    public class CodeManager : ManagerAbstract, ICodeManager
    {
        public CodeManager(IDbConnection db) : base(db)
        {
        }

        public async Task<IEnumerable<TaskItemStatus>> GetTaskStatusList()
        {
            _db.Open();
            var list = await _db.GetAllAsync<TaskItemStatus>();
            _db.Close();
            return list;
        }
    }
}
