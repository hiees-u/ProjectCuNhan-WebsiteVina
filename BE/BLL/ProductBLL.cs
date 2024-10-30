using BLL.Interface;
using BLL.LoginBLL;
using DLL.Models;
using DTO.Responses;
using System.Data.SqlClient;

namespace BLL
{
    public class ProductBLL : IProduct
    {
        public BaseResponseModel GetProducts(int? productId, int? cateId, int? subCateId, string? productName, int pageNumber = 1, int pageSize = 10, int sortByName = 0, int sortByPrice = 0)
        {
            List<Product> products = new List<Product>();
            try
            {
                using (var conn = new SqlConnection(ConnectionStringHelper.Get()))
                {
                    conn.Open();
                    using (var command = new SqlCommand("GETALLPRODUCT", conn))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        // Thực hiện lệnh
                        using (SqlDataReader reader = command.ExecuteReader()) {
                            while (reader.Read())
                            {
                                Product product = new Product
                                {
                                    ProductId = Convert.ToInt32(reader["product_id"]),
                                    ProductName = Convert.ToString(reader["product_name"] ?? string.Empty),
                                    Image = Convert.ToString(reader["image"]),
                                    TotalQuantity = Convert.ToInt32(reader["totalQuantity"]),
                                    CategoryId = Convert.ToInt32(reader["Category_id"]),
                                    Supplier = Convert.ToInt32(reader["Supplier"]),
                                    SubCategoryId = Convert.ToInt32(reader["SubCategoryID"]),
                                    ExpriryDate = Convert.ToDateTime(reader["ExpriryDate"]),
                                    Description = Convert.ToString(reader["Description"]),
                                    ModifiedBy = Convert.ToString(reader["ModifiedBy"]),
                                    CreateTime = Convert.ToDateTime(reader["CreateTime"]),
                                    ModifiedTime = Convert.ToDateTime(reader["ModifiedTime"]),
                                    DeleteTime = reader["DeleteTime"] != DBNull.Value ? Convert.ToDateTime(reader["DeleteTime"]) : null,
                                };

                                products.Add(product);
                            }
                        }

                        //check product_id
                        if(productId.HasValue)
                        {
                            products = products.Where(p => p.ProductId.Equals(productId)).ToList();
                        }

                        return new BaseResponseModel()
                        {
                            IsSuccess = true,
                            Message = "Lấy thành công tất cả sản phẩm!",
                            Data = products
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = $"Lỗi trong quá trình lấy tất cả sản phẩm: {ex}"
                };
            }
        }
    }
}
