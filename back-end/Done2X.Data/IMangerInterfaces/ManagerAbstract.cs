using System.Data;
using System.Threading.Tasks;

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