using System.Data;

namespace Done2X.Data.IMangerInterfaces
{
    public abstract class ManagerAbstract
    {
        protected readonly IDbConnection _db;

        protected ManagerAbstract(IDbConnection db)
        {
            _db = db;
        }
    }
}