using System.Collections.Generic;
using System.Threading.Tasks;
using Done2X.Domain;

namespace Done2X.Data
{
    public interface IGoalManager
    {
        public Task<IEnumerable<Goal>> GetGoalList();

    }
}