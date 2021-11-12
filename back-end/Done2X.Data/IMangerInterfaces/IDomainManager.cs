namespace Done2X.Data.IMangerInterfaces
{
    public interface IDomainManager
    {
        public ITaskItemManager TaskItem { get; set; }
        public ICodeManager Code { get; set; }
        public IGoalManager Goal { get; set; }
        public IAppSecurityManager Security { get; set; }
    }
}
