using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RollOff_Test4API.Helpers
{
    public static class FormBody
    {
        public static string FormStringBody()
        {
            return $@"<html>
            <head>
            </head>
            <body>
              <div>
                <h1>Form Submitted</h1>
                <hr>
                <p>You're receiving this email because a roll off has been initiated by the accounts team.</p>
                <p>Kind Regards,<br><br>
                Roll Off Team</p>
                </div>
                </body>
            </html>";
        }
    }
}
