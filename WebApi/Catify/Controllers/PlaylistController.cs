namespace Catify.Controllers
{
    using Catify.BindingModels;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    public class PlaylistController : BaseApiController
    {
        private readonly IPlaylistService _playlistService;

        public PlaylistController(IPlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        [HttpGet("all")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult All()
        {
            return Ok(_playlistService.GetAll());
        }

        [HttpPost("create")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Create(CreatePlaylistBindingModel model)
        {
            if (ModelState.IsValid)
            {
                return Ok(new
                {
                    Created = true
                });
            }

            return BadRequest(ModelState);
        }
    }
}