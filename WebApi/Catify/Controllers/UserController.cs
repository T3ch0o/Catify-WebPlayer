using Microsoft.AspNetCore.Http;

namespace Catify.Controllers
{
    using System.Threading.Tasks;

    using Catify.BindingModels;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class UserController : BaseController
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody]LoginBindingModel model)
        {
            if (ModelState.IsValid)
            {
                string token = await _userService.Authenticate(model.Username, model.Password);

                if (token == null)
                {
                    return BadRequest(new { message = "Username or password is incorrect" });
                }

                model.Token = token;
                model.Password = null;

                return Ok(model);
            }

            return BadRequest(ModelState);
        }
    }
}