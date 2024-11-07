using System.Text.RegularExpressions;

namespace DTO.UserInfo
{
    public class UserInfoRequestModel
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int AddressId { get; set; }
        public int Gender { get; set; }

        public bool IsValidEmail()
        {
            string regex = @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            return Regex.IsMatch(this.Email!, regex);
        }
        public bool GenderIsValid()
        {
            return (this.Gender == 0 || this.Gender == 1) ? true : false;
        }
        public bool IsValidPhoneNumber()
        {
            string regex = @"^(\+84|0)(3[2-9]|5[689]|7[0-9]|8[1-9]|9[0-9])\d{7}$";
            return Regex.IsMatch(this.Phone!, regex);
        }
    }
}
