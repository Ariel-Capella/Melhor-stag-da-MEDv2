

using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [JsonObject]
    public class UsuarioItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "idUser")]
        public long IdUser { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "senha")]
        public string Senha { get; set; }

        public virtual ICollection<UsuarioFriends> Friends { get; set; }

    }
}
