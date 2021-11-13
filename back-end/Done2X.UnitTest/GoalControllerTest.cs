using System.Threading.Tasks;
using Done2X.API.Controllers;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace Done2X.UnitTest
{
    public class GoalControllerTest
    {
        private IDomainManager _domainManager;
        private GoalController _goalController;

        [SetUp]
        public void Setup()
        {
            _domainManager = A.Fake<IDomainManager>();
            _goalController = new GoalController(_domainManager);
        }

        [TestCase(1)]
        [TestCase(2)]
        public async Task AddGoal_IdIsInvalid_BadRequest(int id)
        {
            var goal = new Goal() { Id = id };
            var response = await _goalController.AddGoal(goal);
            Assert.IsInstanceOf<BadRequestObjectResult>(response);
        }

        [Test]
        public async Task UpdateGoal_IdEqualZeroOrLess_BadRequest()
        {
            var goal = new Goal() { Id = 0 };
            var response = await _goalController.UpdateGoal(goal);
            Assert.IsInstanceOf<BadRequestObjectResult>(response);
        }
    }
}