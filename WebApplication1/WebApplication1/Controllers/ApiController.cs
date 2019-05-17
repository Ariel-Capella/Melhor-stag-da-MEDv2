using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : Controller
    {
        

        private readonly UsuarioContext _context;
        public UserItem check_Current_Id;

        public ApiController(UsuarioContext context)
        {
            _context = context;
            
        }

        // POST api/photo
        [HttpPost("save")]
        public async Task<ActionResult<PhotoItem>> Post([FromForm] IFormFile image, [FromForm] long currentLoged)
        {

            if (ModelState.IsValid)
            {
                var photo_item = new PhotoItem();               
                
                using (var ms = new MemoryStream())
                {
                    image.CopyTo(ms);
                    photo_item.Imagem = ms.ToArray();
                    photo_item.Name = image.Name;
                }

                _context.PhotoItem.Add(photo_item);
                await _context.SaveChangesAsync();

                var receiver = _context.UserItems.Where(x => x.IdUser == currentLoged).FirstOrDefault();
                receiver.Id_Photo = photo_item.IdPhoto;
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NoContent();
        }



        // GET: api/User
        [HttpGet("userList/{IdUser}")]
        public async Task<ActionResult<IEnumerable<UserItem
            >>> GetUserList(long IdUser)
        {
            return await _context.UserItems.Where(ui => ui.IdUser != IdUser).ToListAsync();
        }

        // GET: friends
        [HttpGet("userFriendList/{IdUser}")]
        public async Task<ActionResult<IEnumerable<UserItem>>> GetUserItem(long IdUser)
        {
            var query = from UserItemVar in _context.UserItems
                        join UserFriendsVar in _context.UserFriends on UserItemVar.IdUser equals UserFriendsVar.IdUser
                        where UserItemVar.IdUser == IdUser
                        select UserFriendsVar;
            var resultado = await query.ToListAsync();
            return Ok(resultado);


        }

        [HttpPost("post")]
        public async Task<ActionResult<UserItem>> PostUserItem(UserItem item)
        {

            if (item.Senha == null)
            {
                return BadRequest();
            }
            else if (item.Senha.Length < 4)
            {
                return BadRequest();
            }
            else if (item.Name == null)
            {
                return BadRequest();
            }

            _context.UserItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserItem), new { item.IdUser }, item);


        }

        [HttpPost("addFriend")]
        public async Task<ActionResult<List<UserFriends>>> PostAddFriend(UserFriends item)
        {

            _context.UserFriends.Add(item);
            var haveFriend = await _context.UserFriends.Where(ui => ui.IdFriends == item.IdFriends && ui.IdUser == item.IdUser).AnyAsync();

            if (!haveFriend)
            {
                _context.UserFriends.Add(item);
                await _context.SaveChangesAsync();
                var var1 = nameof(PostAddFriend);
                var var2 = new { item.IdFriends };
                return CreatedAtAction(var1, var2, item);

            }
            else
            {
                return Ok(false);
            }


        }






        [HttpPost("login")]

        public async Task<ActionResult<UserItem>> PostUserLogin(UserItem item)
        {
            var user_info = await _context.UserItems.Where(ui => ui.Name == item.Name).FirstOrDefaultAsync();
           

            if (user_info.Name == null)
            {
                return NotFound();
            }
            else if (user_info.Senha != item.Senha)
            {
                return NotFound();
            }
            else
            {
                return Ok(user_info.IdUser);
            }

        }

        [HttpPost("Get_Photo")]
        public async Task<ActionResult<PhotoItem>> Get_photo(UserItem item)
        {
            var user_info = await _context.UserItems.Where(ui => ui.IdUser == item.IdUser).FirstOrDefaultAsync();
            var imgByte = await _context.PhotoItem.Where(info => info.IdPhoto == user_info.Id_Photo).FirstOrDefaultAsync();
            var s = Convert.ToBase64String(imgByte.Imagem);
            return Ok(s);
        }

        [HttpPost("Get_Photo2")]
        public async Task<ActionResult<PhotoItem>> Get_photo2(UserItem item)
        {
            //var user_info = await _context.UserItems.Where(ui => ui.IdUser == item.IdUser).FirstOrDefaultAsync();
            var imgByte = await _context.PhotoItem.Where(info => info.IdPhoto == item.Id_Photo).FirstOrDefaultAsync();
            var s = Convert.ToBase64String(imgByte.Imagem);
            return Ok(s);
        }



    }




}

