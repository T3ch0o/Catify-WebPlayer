namespace Catify.Controllers
{
    using System.Collections.Generic;

    using Catify.Entities;
    using Catify.Models;
    using Catify.Models.BindingModels;
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

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Get([FromRoute]string id)
        {
            return Ok(id);
        }

        [HttpGet("all")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult All()
        {
            IEnumerable<Playlist> playlists = _playlistService.GetAll();
            List<AllPlaylistsModel> playlistsModel = new List<AllPlaylistsModel>();

            foreach (Playlist playlist in playlists)
            {
                playlistsModel.Add(new AllPlaylistsModel { Creator = playlist.Creator.UserName, Title = playlist.Title, ImageUrl = playlist.ImageUrl });
            }

            return Ok(playlistsModel);
        }

        [HttpPost("create")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Create([FromBody]CreatePlaylistBindingModel model)
        {
            if (ModelState.IsValid)
            {
                _playlistService.Create(model, User.Identity.Name);

                return Ok(new
                {
                    Created = true
                });
            }

            return BadRequest(ModelState);
        }
    }
}