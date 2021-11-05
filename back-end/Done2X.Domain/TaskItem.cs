using System;

namespace Done2X.Domain
{
    public class TaskItem : DomainCommon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TaskItemStatusId { get; set; }
        public int Priority { get; set; }
        public DateTime? StatusUpdatedDate { get; set; }
    }
}
