using BLL.Interface;
using BLL.LoginBLL;
using DTO.Address;
using DTO.Responses;
using System.Data.SqlClient;

namespace BLL
{
    public class AddressBLL : IAddress
    {
        public BaseResponseModel GetById(int iD)
        {
            AddressResponseModel res = new AddressResponseModel();
            try
            {
                using (var conn = new SqlConnection(ConnectionStringHelper.Get()))
                {
                    conn.Open();
                    using (var cmd = new SqlCommand("SP_GetAddressById", conn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@AddressId", iD);
                        // Thực hiện lệnh
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                res = new AddressResponseModel()
                                {
                                    AddressId = reader.GetInt32(0),
                                    CommuneId = reader.GetInt32(1),
                                    HouseNumber = reader.GetString(2),
                                    Note = reader.GetString(3)
                                };
                            }
                        }
                    }
                    return new BaseResponseModel()
                    {
                        IsSuccess = true,
                        Message = "Thành Công!",
                        Data = res
                    };
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
