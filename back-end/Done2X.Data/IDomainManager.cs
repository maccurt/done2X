namespace Done2X.Data
{
    public interface IDomainManager
    {
        public ITaskItemManager TaskItem { get; set; }
        public ICodeManager Code { get; set; }
    }
}
