﻿using DTO.User;
using Microsoft.AspNetCore.Mvc;
using DTO.Responses;
using BLL.Interface;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser userBll;

        public UserController(IUser userBLL)
        {
            this.userBll = userBLL;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequestModule module)
        {
            try
            {
                BaseResponseModel Result = userBll.Login(module);
                if(Result.IsSuccess)
                    return Ok(Result);
                return BadRequest(Result);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] LoginRequestModule customer)
        {
            try
            {
                BaseResponseModel Result = userBll.Register(customer);
                if (Result.IsSuccess)
                    return Ok(Result);
                return BadRequest(Result);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword([FromBody] LoginChangePassRequestModule module)
        {
            BaseResponseModel res = userBll.ChangePassword(module);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res;
        }
    }
}