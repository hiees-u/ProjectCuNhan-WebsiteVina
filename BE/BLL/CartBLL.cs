using BLL.Interface;
using BLL.LoginBLL;
using DTO.Cart;
using DTO.Responses;
using System.Data.SqlClient;

namespace BLL
{
    public class CartBLL : ICart
    {
        public BaseResponseModel Get()
        {
            List<CartResponseModel> listCart = new List<CartResponseModel>();
            try
            {
                using (var conn = new SqlConnection(ConnectionStringHelper.Get()))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_GetCartByUser", conn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                CartResponseModel cartResponseModel = new CartResponseModel()
                                {
                                    ProductId = Convert.ToInt32(reader["product_id"]),
                                    ProductName = reader["product_name"] as string ?? string.Empty,
                                    Image = reader["image"] as string ?? string.Empty,
                                    Price = Convert.ToDecimal(reader["price"]),
                                    Quantity = Convert.ToInt32(reader["quantity"]),
                                };
                                listCart.Add(cartResponseModel);
                            }
                        }
                    }
                }

                BaseResponseModel response = new BaseResponseModel()
                {
                    IsSuccess = true,
                    Message = "Success!",
                    Data = listCart
                };

                if (listCart.Count < 0) {
                    response.IsSuccess = true;
                    response.Message = "Giỏ hàng chưa có sản phẩm nào!!";
                }

                return response;

            }
            catch (Exception ex)
            {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = $"Lỗi trong quá trình lấy Giỏ Hàng: {ex}"
                };
            }
        }
        
        public BaseResponseModel Post(CartRequestModule resquest)
        {
            try
            {
                using (var conn = new SqlConnection(ConnectionStringHelper.Get()))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_AddToCart", conn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProductID", resquest.ProductId);
                        cmd.Parameters.AddWithValue("@Quantity", resquest.Quantity);

                        //-- thực thi SP
                        cmd.ExecuteNonQuery();
                    }
                }

                return new BaseResponseModel()
                {
                    IsSuccess = true,
                    Message = "Thành Công"
                };
            }
            catch (Exception ex)
            {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = $"Lỗi trong quá trình lấy Giỏ Hàng: {ex}"
                };
            }
        }
    }
}
