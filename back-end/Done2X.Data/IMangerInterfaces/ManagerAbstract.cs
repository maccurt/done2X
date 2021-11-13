using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dommel;
using Done2X.Domain;

namespace Done2X.Data.IMangerInterfaces
{
    public abstract class ManagerAbstract
    {
        private readonly string _connectionString;


        protected ManagerAbstract(string connectionString)
        {
            _connectionString = connectionString;
        }

    }
}