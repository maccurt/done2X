using System.Security.Claims;
using System.Threading.Tasks;
using Done2X.API.Controllers;
using Done2X.Data.IMangerInterfaces;
using Done2X.Domain;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace Done2X.UnitTest
{
    public class TaskItemControllerTest
    {
        private IDomainManager _domainManager;
        private TaskItemController _taskItemController;

        [SetUp]
        public void Setup()
        {
            _domainManager = A.Fake<IDomainManager>();
            _taskItemController = new TaskItemController(_domainManager);
        }

        [Test]
        public async Task AddTaskItem_IsIsGreaterOrEqualTo1_BadRequest()
        {
            var taskItem = new TaskItem { Id = 1 };
            var response = await _taskItemController.AddTaskItem(taskItem);
            Assert.IsInstanceOf<BadRequestObjectResult>(response);
        }

        [Test]
        public async Task AddTaskItem_CantAccessGoal_Unauthorized()
        {
            var taskItem = new TaskItem { Id = 0 };
            A.CallTo(() => _domainManager.Security
                    .CanAccessGoal(A<int>.Ignored, A<ClaimsPrincipal>.Ignored))
                .Returns(false);
            var response = await _taskItemController.AddTaskItem(taskItem);
            Assert.IsInstanceOf<UnauthorizedResult>(response);

        }
    }
}