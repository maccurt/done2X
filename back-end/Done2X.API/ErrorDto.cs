using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Done2X.API
{
    public class ErrorDto
    {
        public bool ShowMessage { get; set; }
        public int Code { get; set; }
        public string Message { get; set; }

        public ErrorDto()
        {
            this.ShowMessage = true;
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
}