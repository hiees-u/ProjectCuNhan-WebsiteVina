using BLL.Interface;
using BLL.LoginBLL;
using DTO.Responses;
using DTO.UserInfo;
using System.Data.SqlClient;

namespace BLL
{
    public class UserInfoBLL : IUserInfo
    {
        private readonly IAddress _address;

        public UserInfoBLL(IAddress address)
        {
            _address = address;
        }

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

        public BaseResponseModel Put(UserInfoRequestModel req)
        {

            //--kiểm tra req.CommuneName, req.HouseNumber, req.Note đã tồn tại trong bảng Địa Chỉ chưa
            req.AddressId = (int)((this._address.GetAddressID(new DTO.Address.AddressRequestModule()
            {
                //CommuneName = req.CommuneName,
                HouseNumber = req.HouseNumber,
                CommuneId = req.Commune,
                Note = req.Note
            })).Data!); //-- trả về  0 hoăc AddressId

            //--> chưa tồn tại địa chỉ --> insert mới
            if (req.AddressId <= 0) {
                req.AddressId = (int)(this._address.Post(new DTO.Address.AddressRequestModule()
                {
                    CommuneName = req.CommuneName,
                    HouseNumber = req.HouseNumber,
                    Note = req.Note,
                    DistrictId = req.DistrictId,
                })).Data!;
            }


            //-- update UF
            try
            {
                using (SqlConnection connection = new SqlConnection(ConnectionStringHelper.Get()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_UpdateUserInfo", connection))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        //- thêm các tham số đầu vào
                        cmd.Parameters.AddWithValue("@FullName", req.FullName);
                        cmd.Parameters.AddWithValue("@Phone", req.Phone);
                        cmd.Parameters.AddWithValue("@Email", req.Email);
                        cmd.Parameters.AddWithValue("@AddressID", req.AddressId);
                        cmd.Parameters.AddWithValue("@Gender", req.Gender);

                        connection.Open();
                        cmd.ExecuteNonQuery();

                        return new BaseResponseModel()
                        {
                            IsSuccess = true,
                            Message = "Cập Nhật Thành Công!"
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = $"Lỗi trong quá trình: {ex}"
                };
            }
        }
    }
}
