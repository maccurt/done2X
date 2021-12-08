using System;


namespace Done2X.Domain
{
    public class Goal : DomainCommon, IDescriber
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string WhatIsDone { get; set; }
        public DateTimeOffset TargetCompletionDate { get; set; }
        public bool IsCompleted { get; set; }
        public DateTimeOffset? CompletionDate { get; set; }

    }

    public class GoalExtended : Goal
    {
        public int TaskCompleted { get; set; }
        public int TaskNotCompleted { get; set; }
        public int TaskCount => this.TaskCompleted + this.TaskNotCompleted;

    }
}
