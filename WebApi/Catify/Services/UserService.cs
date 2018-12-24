namespace Catify.Services
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Catify.BindingModels;
    using Catify.Data;
    using Catify.Entities;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class UserService : IUserService
    {
        private readonly CatifyDbContext _db;

        private readonly JwtSettings _jwtSettings;

        private readonly SignInManager<CatifyUser> _signInManager;

        private readonly UserManager<CatifyUser> _userManager;

        public UserService(CatifyDbContext db,
                           IOptions<JwtSettings> jwtSettings,
                           SignInManager<CatifyUser> singInManager,
                           UserManager<CatifyUser> userManager)
        {
            _db = db;
            _signInManager = singInManager;
            _userManager = userManager;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<string> Authenticate(string username, string password)
        {
            SignInResult loginResult = await _signInManager.PasswordSignInAsync(username, password, false, false);

            if (!loginResult.Succeeded)
            {
                return null;
            }

            CatifyUser user = await _userManager.FindByNameAsync(username);

            return GetToken(user);
        }

        public async Task<string> Register(RegisterBindingModel model)
        {
            CatifyUser user = new CatifyUser
            {
                UserName = model.Username,
                Email = model.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return null;
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return GetToken(user);
        }

        private string GetToken(IdentityUser user)
        {
            // Authentication successful so generate jwt token
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Id) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
