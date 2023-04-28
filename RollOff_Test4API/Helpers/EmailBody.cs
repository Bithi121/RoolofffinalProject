using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RollOff_Test4API.Helpers
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email, string emailToken)
        {
            return $@"<html>
            <head>
            </head>
            <body>
              <div>
                <h1>Reset your Password</h1>
                <hr>
                <p>You're receiving this email because you requested a password reset for your RollOff Account.</p>
                <p>Please click the link below to choose a new password</p>
                <a href=""http://localhost:4200/app-reset-link?email={email}&code={emailToken}"" target=""_blank"">ResetPassword</a><br>
                <p>Kind Regards,<br><br>
                Roll Off Team</p>
                </div>
                </body>
            </html>";
        }
    }
}
