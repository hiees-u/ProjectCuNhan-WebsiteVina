using BLL.Interface;
using DTO.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly IUserInfo _userInfo;

        public UserInfoController(IUserInfo userInfo)
        {
            _userInfo = userInfo;
        }

        [HttpGet]
        [Authorize(Roles = "Customer")]
        public ActionResult Get()
        {
            BaseResponseModel response = this._userInfo.Get();
            if(response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
    }
}
