using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [JsonObject]
    public class UsuarioFriends
    { 
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public long Id { get; set; }
        [JsonProperty(PropertyName = "idUser")]
        public long IdUser { get; set; }
        [JsonProperty(PropertyName = "idFriends")]
        public long IdFriends { get; set; }

        public virtual UsuarioItem UsuarioItem { get; set; }

       
    }
}

