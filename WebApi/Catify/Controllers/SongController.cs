﻿namespace Catify.Controllers
{
    using System.Linq;
    using System.Security.Claims;

    using Catify.Models.BindingModels;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    public class SongController : BaseApiController
    {
        private readonly ISongService _songService;

        public SongController(ISongService songService)
        {
            _songService = songService;
        }

        [HttpPost("{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult AddSong([FromBody]SongBindingModel model, [FromRoute]string id)
        {
            if (ModelState.IsValid)
            {
                string role = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).Any() ? "Administrator" : "User";
                string creatorId = User.Identity.Name;

                bool isAdded = _songService.Create(model.Title, model.Url, creatorId, id, role);

                if (isAdded)
                {
                    return Ok(new { Created = true });
                }

                return Unauthorized();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}/{title}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Delete([FromRoute]string id, [FromRoute] string title)
        {
            if (ModelState.IsValid)
            {
                string role = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).Any() ? "Administrator" : "User";
                string creatorId = User.Identity.Name;

                bool isDeleted = _songService.Delete(id, title, creatorId, role);

                if (isDeleted)
                {
                    return Ok(new { Deleted = true });
                }

                return Unauthorized();
            }

            return BadRequest(ModelState);
        }
    }
}