using RollOff_Test4API.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
   public interface IEmailRepository
    {
        void SendEmail(EmailDTO email);

        void PasswordVerificationEmail(ForgotPasswordDTO forgotPasswordDTO, string token);
    }
}
