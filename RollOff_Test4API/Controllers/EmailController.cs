using Microsoft.AspNetCore.Mvc;
using RollOff_Test4API.Models.DTO;
using RollOff_Test4API.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RollOff_Test4API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController: ControllerBase
    {
       
        private readonly IEmailRepository emailRepository;

        public EmailController(IEmailRepository emailRepository)
        {
            this.emailRepository = emailRepository;
        }

        [HttpPost]
        public IActionResult SendEmail(EmailDTO email)
        {
            try
            {
                emailRepository.SendEmail(email);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("something went wrong while sending email" + e);
            }
        }
    }
}
