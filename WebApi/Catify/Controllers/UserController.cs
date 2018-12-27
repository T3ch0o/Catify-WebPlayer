using Microsoft.AspNetCore.Http;

namespace Catify.Controllers
{
    using System.Threading.Tasks;

    using Catify.Models;
    using Catify.Models.BindingModels;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class UserController : BaseApiController
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody]LoginBindingModel model)
        {
            if (ModelState.IsValid)
            {
                UserReturnModel userModel = await _userService.Authenticate(model.Username, model.Password);

                if (userModel == null)
                {
                    return BadRequest(new { message = "Username or password is incorrect" });
                }

                return Ok(userModel);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Register([FromBody]RegisterBindingModel model)
        {
            if (ModelState.IsValid)
            {
                UserReturnModel userModel = await _userService.Register(model);

                if (userModel == null)
                {
                    return BadRequest(new { message = "Username already exist." });
                }

                return Ok(userModel);
            }

            return BadRequest(ModelState);
        }

        [HttpGet("logout")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout()
        {
            await _userService.Logout();

            return Ok(new
            {
                User = ""
            });
        }
    }
}