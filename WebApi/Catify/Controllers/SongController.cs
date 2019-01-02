namespace Catify.Controllers
{
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
                _songService.Create(model.Title, model.Url, id);

                return Ok(new { Created = true });
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Delete([FromRoute]string id)
        {
            if (ModelState.IsValid)
            {
                _songService.Delete(id, User.Identity.Name);

                return Ok(new { Deleted = true });
            }

            return BadRequest(ModelState);
        }
    }
}