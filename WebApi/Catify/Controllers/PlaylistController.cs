namespace Catify.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;

    using AutoMapper;

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

        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public PlaylistController(IPlaylistService playlistService, IUserService userService, IMapper mapper)
        {
            _playlistService = playlistService;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Get([FromRoute]string id)
        {
            Playlist playlist = _playlistService.Get(id);

            if (playlist == null)
            {
                return BadRequest();
            }

            PlaylistReturnModel playlistModel = _mapper.Map<PlaylistReturnModel>(playlist);

            UsersPlaylistStatus userPlaylistStatus = _userService.GetUserPlaylistStatus(User.Identity.Name, playlist.Id);

            if (User.Identity.IsAuthenticated && userPlaylistStatus != null)
            {
                playlistModel.IsFavorite = userPlaylistStatus.IsFavorite;
                playlistModel.IsLiked = userPlaylistStatus.IsLiked;
            }

            return Ok(playlistModel);
        }

        [HttpGet("all")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult All()
        {
            IEnumerable<Playlist> playlists = _playlistService.GetAll();
            UsersPlaylistStatus[] favoritePlaylists = _userService.GetUserFavoritePlaylists(User.Identity.Name).ToArray();
            List<PlaylistsReturnModel> playlistsModel = new List<PlaylistsReturnModel>();

            foreach (Playlist playlist in playlists)
            {
                bool isFavorite = favoritePlaylists.Any(p => p.PlaylistId == playlist.Id);

                PlaylistsReturnModel playlistModel = _mapper.Map<PlaylistsReturnModel>(playlist);
                playlistModel.IsFavoritePlaylist = isFavorite;

                playlistsModel.Add(playlistModel);
            }

            return Ok(playlistsModel);
        }

        [HttpPost]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Post([FromBody]PlaylistBindingModel model)
        {
            if (ModelState.IsValid)
            {
                string creatorId = User.Identity.Name;
                string playlistId = _playlistService.Create(model, creatorId);

                return Ok(new
                {
                    Created = true,
                    Id = playlistId
                });
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Put([FromBody]EditPlaylistBindingModel model, [FromRoute]string id)
        {
            if (ModelState.IsValid)
            {
                string role = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).Any() ? "Administrator" : "User";
                string creatorId = User.Identity.Name;

                bool isUpdated = _playlistService.Edit(model, id, creatorId, role);

                if (isUpdated)
                {
                    return Ok(new { Edited = true });
                }

                return Unauthorized();
            }

            return BadRequest(ModelState);
        }

        [HttpPut("update/{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult UpdateStatus([FromBody]PlaylistStatusBindingModel model, [FromRoute]string id)
        {
            if (ModelState.IsValid)
            {
                bool isUpdated = _playlistService.UpdateStatus(model, id, User.Identity.Name);

                if (isUpdated)
                {
                    return Ok(new { StatusUpdate = true });
                }

                return Unauthorized();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Delete([FromRoute]string id)
        {
            string role = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).Any() ? "Administrator" : "User";
            string creatorId = User.Identity.Name;

            bool isDeleted = _playlistService.Delete(id, creatorId, role);

            if (isDeleted)
            {
                return Ok(new { Removed = true });
            }

            return Unauthorized();
        }
    }
}