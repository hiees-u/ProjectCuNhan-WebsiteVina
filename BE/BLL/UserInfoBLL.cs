using BLL.Interface;
using BLL.LoginBLL;
using DTO.Responses;
using DTO.UserInfo;
using System.Data.SqlClient;

namespace BLL
{
    public class UserInfoBLL : IUserInfo
    {
        public BaseResponseModel Get()
        {
            try
            {
                UserInfoResponseModel uf = new UserInfoResponseModel();
                using (var conn = new SqlConnection(ConnectionStringHelper.Get()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetUserInfoByUserName", conn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        conn.Open();

                        using (SqlDataReader reader = cmd.ExecuteReader()) 
                        { 
                            if (reader.Read()) 
                            { 
                                uf = new UserInfoResponseModel { 
                                    AccountName = reader["Tên Đăng Nhập"]?.ToString() ?? string.Empty, 
                                    FullName = reader["Họ Tên"].ToString(), 
                                    Email = reader["Email"].ToString(), 
                                    Phone = reader["Số Điện Thoại"].ToString(), 
                                    Gender = Convert.ToInt32(reader["Giới Tính"]),
                                    CustomerType = reader["Loại Khách Hàng"].ToString(),
                                    Address = reader["Địa Chỉ"].ToString() ,
                                    AddressId = Convert.ToInt32(reader["Địa Chỉ ID"]),
                                    Commune = Convert.ToInt32(reader["Xã"]),
                                    Province = Convert.ToInt32(reader["Tỉnh"]),
                                    District = Convert.ToInt32(reader["Quận"]),
                                }; 
                            } 
                        }
                    }
                }
                return new BaseResponseModel
                {
                    Data = uf,
                    IsSuccess = true,
                    Message = "Lấy Thành Công!"
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = $"Lỗi trong quá trình lấy Thông Tin Khách Hàng: {ex}"
                };
            }
        }
    }
}
