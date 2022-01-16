namespace Done2X.Domain.Codes
{
    public abstract class Code : DomainCommon
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}