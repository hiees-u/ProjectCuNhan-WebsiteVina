namespace DTO.UserInfo
{
    public class UserInfoResponseModel
    {
        public string AccountName { get; set; } = null!;
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public int? AddressId { get; set; }
        public int? Commune { get; set; }
        public int? District { get; set; }
        public int? Province { get; set; }
        public string? CustomerType { get; set; }
        public string? Phone { get; set; }
        public int? Gender { get; set; }
    }
}
