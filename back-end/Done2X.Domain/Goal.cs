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
    }
}
