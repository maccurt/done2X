namespace Done2X.Domain
{
    public class Project : DomainCommon
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
    }

    public class ProjectExtended: Project
    {
        public int GoalCompleted { get; set; }
        public int GoalNotCompleted { get; set; }
        public int GoalCount => this.GoalCompleted + GoalNotCompleted;
    }
}
