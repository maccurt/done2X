using System;

namespace Done2X.Domain
{
    public abstract class DomainCommon
    {
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
