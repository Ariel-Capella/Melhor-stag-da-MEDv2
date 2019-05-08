using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : Controller
    {

        private readonly UsuarioContext _context;

        public ApiController(UsuarioContext context)
        {
            _context = context;

        }

        // GET: api/Usuario
        [HttpGet("userList/{IdUser}")]
        public async Task<ActionResult<IEnumerable<UsuarioItem>>> GetUserList(long IdUser )
        {
            return await _context.UsuarioItems.Where(ui => ui.IdUser != IdUser ).ToListAsync();
        }

        // GET: amigos
        [HttpGet("userFriendList/{IdUser}")]
        public async Task<ActionResult<IEnumerable<UsuarioItem>>> GetUsuarioItem(long IdUser)
        {
            var query = from UsuarioItemVar in _context.UsuarioItems
                        join usuarioFriendsVar in _context.UsuarioFriends on UsuarioItemVar.IdUser equals usuarioFriendsVar.IdUser
                        where UsuarioItemVar.IdUser == IdUser
                        select usuarioFriendsVar;

            var resultado = await query.ToListAsync();
            return Ok(resultado);

            
        }

        [HttpPost("post")]
        public async Task<ActionResult<UsuarioItem>> PostUsuarioItem(UsuarioItem item)
        {

            if (item.Senha == null)
            {
                return BadRequest();
            }  
            else  if (item.Senha.Length < 4)
            {
                return BadRequest();
            } 
            else if (item.Name == null)
            {
                return BadRequest();
            }

            _context.UsuarioItems.Add(item);
            await _context.SaveChangesAsync();
  
            return CreatedAtAction(nameof(GetUsuarioItem), new { item.IdUser }, item);


        }

        [HttpPost("addFriend")]
        public async Task<ActionResult<List<UsuarioFriends>>> PostAddFriend(UsuarioFriends item)
        {
            
            _context.UsuarioFriends.Add(item);
            var temAmigo = await _context.UsuarioFriends.Where(ui => ui.IdFriends == item.IdFriends && ui.IdUser == item.IdUser).AnyAsync();

            if (!temAmigo)
            {
                _context.UsuarioFriends.Add(item);
                await _context.SaveChangesAsync();
                var variavel1 = nameof(PostAddFriend);
                var variavel2 = new { item.IdFriends };
                return CreatedAtAction(variavel1, variavel2, item);

            }
            else
            {
                return Ok(false);
            }
           
            
        }






        [HttpPost("login")]
        public async Task<ActionResult<UsuarioItem>> PostUsuarioLogin(UsuarioItem item)
        {
            var variavelQueVeioDoBanco = await _context.UsuarioItems.Where(ui => ui.Name == item.Name).FirstOrDefaultAsync();
            

            if (variavelQueVeioDoBanco.Name == null)
            {
                return NotFound();
            }
            else if(variavelQueVeioDoBanco.Senha != item.Senha)
            {


                return NotFound();
               
            }
            else
            {
                return Ok( variavelQueVeioDoBanco.IdUser );
            }


            

        }

        


    }
}
