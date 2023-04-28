using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RollOff_Test4API.Models.DTO;
using RollOff_Test4API.Repository;
using System;
using System.Threading.Tasks;

namespace RollOff_Test4API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IUser userRepository;
        private readonly ITokenHandler handler;
        private readonly IEmailRepository emailRepository;

        public AuthController(IUser userRepository, ITokenHandler handler, IEmailRepository emailRepository)
        {
            this.userRepository = userRepository;
            this.handler = handler;
            this.emailRepository = emailRepository;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> LoginAsync(Userlogin loginRequestDTO)
        {
            try
            {
                if (loginRequestDTO.Username == null && loginRequestDTO.Password == null && loginRequestDTO.Department == null)
                {
                    return NotFound("username or password is null");
                }
                //we check if user is authenticated which is check the username and password is present 
                // in our database.
                var user = await userRepository.AuthenticateUserAsync(loginRequestDTO.Username, loginRequestDTO.Password, loginRequestDTO.Department);
                if (user != null)
                {
                    //generate jwt token
                    var token = handler.CreateTokenAsync(user);
                    return Ok(token);
                }
                return BadRequest("Username or password is incorrect or role is incorrect");
            }

            catch (Exception e)
            {
                return BadRequest("Error in Controller method LoginAsync"+ e);
            }
        }
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO forgotPasswordDto)
        {
            try
            {
                //checks the user's email id first if it's present.
                var user = await userRepository.FindByEmailAsync(forgotPasswordDto.Email);
                if (user == null)
                {
                    return NotFound("Invalid Request");
                }
                //get's the token from token handler repository.
                var token = await handler.GeneratePasswordTokenAsync(user);

                emailRepository.PasswordVerificationEmail(forgotPasswordDto, token);

                return Ok(token);
            }
            catch (Exception e)
            {
                return BadRequest("something went wrong" + e);
            }
        }

        [HttpPut("reset-email")]
        //[Authorize]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            try
            {
                var user = await userRepository.ResetPasswordAsync(resetPasswordDTO.Email, resetPasswordDTO.NewPassword);
                //updates the new password for the given email.
                if (user == null)
                {
                    return NotFound("user not present");
                }
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("something went wrong" + e);
            }
        }
    }
}
