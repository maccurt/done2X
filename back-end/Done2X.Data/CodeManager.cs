using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
        public Task<IEnumerable<TaskType>> GetTaskTypeList();
    }

    public class CodeManager : ManagerAbstract, ICodeManager
    {
        private readonly string _connectionString;

        public CodeManager(string connectionString ) : base(connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<TaskItemStatus>> GetTaskStatusList()
        {

            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var list = await connection.GetAllAsync<TaskItemStatus>();
            return list;
        }

        public async Task<IEnumerable<TaskType>> GetTaskTypeList()
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var list = await connection.GetAllAsync<TaskType>();
            return list;
        }
    }
}
