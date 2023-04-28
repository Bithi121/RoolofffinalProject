using RollOff_Test4API.Repository;

namespace RollOff_Test4API.Services
{
    public class UserService
    {
        //private IUser _userRepo;
        IUser _userRepo;

        public UserService(IUser userRepo)
        {
            _userRepo = userRepo;
        }
    }
}