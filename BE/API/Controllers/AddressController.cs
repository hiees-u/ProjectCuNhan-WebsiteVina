using BLL.Interface;
using DTO.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddress address;

        public AddressController(IAddress address)
        {
            this.address = address;
        }

        [HttpGet]
        public IActionResult GetById(int Id)
        {
            BaseResponseModel res = this.address.GetById(Id);

            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
    }
}
