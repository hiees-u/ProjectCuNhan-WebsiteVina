﻿using BLL.Interface;
using BLL.LoginBLL;
using DLL.Models;
using DTO.Responses;
using DTO.User;
using System.Data.SqlClient;

namespace BLL
{
    public class UserBLL : IUser
    {
        public BaseResponseModel Login(LoginRequestModule module)
        {
            if (!module.Validate()) {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = "Kiểm tra lại thông tin!"
                };
            }

            using (var conn = new DbVINA(ConnectionStringHelper.Set(module)))
            {
                var user = conn.Users.FirstOrDefault(u => u.AccountName == module.AccountName);

                if (user == null) {
                    return new BaseResponseModel()
                    {
                        IsSuccess = false,
                        Message = "Tên đăng nhập không chính xác!"
                    };
                }

                return new BaseResponseModel()
                {
                    IsSuccess = true,
                    Message = "Đăng Nhập Thành Công!"
                };
            }
        }

        public BaseResponseModel Register(LoginRequestModule customer)
        {
            if (!customer.Validate())
            {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = "Kiểm tra lại thông tin!!"
                };
            }

            ConnectionStringHelper.Reset();

            try
            {
                using (var conn = new SqlConnection(ConnectionStringHelper.Get()))
                {
                    conn.Open();
                    using (var command = new SqlCommand("CreateCustomer", conn))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        // Thêm tham số cho stored procedure
                        command.Parameters.Add(new SqlParameter("@AccountName", customer.AccountName));
                        command.Parameters.Add(new SqlParameter("@Password", customer.Password));

                        // Thực hiện lệnh
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = $"Lỗi trong quá trình Đăng ký: {ex}"
                };
            }

            return new BaseResponseModel()
            {
                IsSuccess = true,
                Message = "Tạo Tài Khoản Thành Công!"
            };
        }

        //Login rồi mới chạy cái này
        public BaseResponseModel ChangePassword(LoginChangePassRequestModule module)
        {
            BaseResponseModel baseResponseModel = module.Validate();
            if (!baseResponseModel.IsSuccess)
            {
                return baseResponseModel;
            }

            try
            {
                using (var conn = new SqlConnection(ConnectionStringHelper.Get()))
                {
                    conn.Open();
                    using (var command = new SqlCommand("ChangePassword", conn))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@NewPassword", module.NewPassword));

                        command.ExecuteNonQuery();
                    }

                    return new BaseResponseModel()
                    {
                        IsSuccess = true,
                        Message = "Đổi Mật Khẩu Thành Công!"
                    };
                }
            }
            catch (Exception ex)
            {
                return new BaseResponseModel()
                {
                    IsSuccess = false,
                    Message = $"Lỗi Đổi Mật Khẩu: {ex}"
                };
            }
        }

        //Đăng xuất
        public BaseResponseModel LogOut()
        {
            ConnectionStringHelper.Reset();
            return new BaseResponseModel()
            {
                IsSuccess = true,
                Message = "Đăng Xuất Thành Công!!"
            };
        }

        //Get role User

    }
}