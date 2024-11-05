using BLL.Interface;
using DTO.Cart;
using DTO.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICart icart;

        public CartController(ICart icart)
        {
            this.icart = icart;
        }

        [HttpGet]
        [Authorize(Roles = "Customer")]
        public IActionResult Get()
        {
            BaseResponseModel response = icart.Get();
            if(response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        public IActionResult Post([FromBody] CartRequestModule request)
        {
            BaseResponseModel response = icart.Post(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
    }
}
