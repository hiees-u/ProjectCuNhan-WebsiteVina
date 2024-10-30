using BLL.Interface;
using DTO;
using System.Security.Claims;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace BLL
{
    public class AuthService : IAuthService
    {
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;

        public AuthService(IConfiguration configuration)
        {
            _secretKey = configuration["JwtSettings:SecretKey"];
            _issuer = configuration["JwtSettings:Issuer"];
            _audience = configuration["JwtSettings:Audience"];
        }

        public string GenerateJwtToken(AuthModel model)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, Convert.ToBase64String(Encoding.UTF8.GetBytes(model.userName))),
                new Claim(ClaimTypes.Role, model.Roles)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer, // Địa chỉ cục bộ
                audience: _audience, // Địa chỉ cục bộ
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public (string UserName, string Role) DecodeToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jsonToken == null)
            {
                throw new ArgumentException("Token không hợp lệ");
            }

            // Giải mã lại userName và role
            var userName = Encoding.UTF8.GetString(Convert.FromBase64String(jsonToken.Claims.First(c => c.Type == "userName").Value));
            var role = Encoding.UTF8.GetString(Convert.FromBase64String(jsonToken.Claims.First(c => c.Type == "role").Value));

            return (userName, role);
        }

    }
}
