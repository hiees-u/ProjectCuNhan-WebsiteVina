using DTO;

namespace BLL.Interface
{
    public interface IAuthService
    {
        public string GenerateJwtToken(AuthModel model);
    }
}
