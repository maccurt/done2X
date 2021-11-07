namespace Done2X.Domain
{
    public class Goal : DomainCommon, IDescriber
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
