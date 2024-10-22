go

CREATE PROCEDURE CreateCustomer
    @AccountName NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    -- Tạo Login
    DECLARE @Sql NVARCHAR(MAX)
    SET @Sql = 'CREATE LOGIN [' + @AccountName + '] WITH PASSWORD = ''' + @Password + ''';'
    EXEC sp_executesql @Sql

    -- Tạo User trong database hiện tại
    SET @Sql = 'CREATE USER [' + @AccountName + '] FOR LOGIN [' + @AccountName + '];'
    EXEC sp_executesql @Sql

    -- Gán quyền mặc định cho User (quyền đọc và ghi)
    EXEC sp_addrolemember N'Customer', @AccountName

	 -- Gán Login vào server role 'CustomerServerRole'
    SET @Sql = 'ALTER SERVER ROLE CustomerServerRole ADD MEMBER [' + @AccountName + '];'
    EXEC sp_executesql @Sql

    -- Lưu thông tin vào bảng Users
    INSERT INTO Users (AccountName, role_id)
    VALUES (@AccountName, 1)

    -- Thông báo hoàn thành
    PRINT N'Đăng ký khách hàng thành công!'
END

select * from Users

EXEC CreateCustomer 'hieu1', '123@';

-- tạo nhóm quyền người dùng:
go
Create ROLE Customer;

Grant Select On dbo.Product to Customer
Grant Select, Update, Insert On dbo.UserInfo to Customer
Grant Select, Update, Insert, Delete On dbo.Cart to Customer
Grant Select, Update, Insert On dbo.[Order] to Customer
Grant Select, Update, Insert, Delete On dbo.OrderDetail to Customer
Grant Select On dbo.PriceHistory to Customer
Grant Select On dbo.Province to Customer
Grant Select, Insert On dbo.District to Customer
Grant Select, Insert On dbo.Commune to Customer
Grant Select, Insert On dbo.Address to Customer


--procedure change password user (customer)
go

CREATE PROCEDURE ChangePassword
    @NewPassword NVARCHAR(50)
AS
BEGIN
    DECLARE @AccountName NVARCHAR(50);
    SET @AccountName = SUSER_NAME(); -- Get the currently logged-in user's account name

    -- Kiểm tra xem Login có tồn tại hay không
    IF EXISTS (SELECT 1 FROM sys.server_principals WHERE name = @AccountName)
    BEGIN
        -- Thay đổi mật khẩu cho Login
        DECLARE @Sql NVARCHAR(MAX);
        SET @Sql = 'ALTER LOGIN [' + @AccountName + '] WITH PASSWORD = ''' + @NewPassword + ''';';
        EXEC sp_executesql @Sql;

        -- Thông báo thay đổi mật khẩu thành công
        PRINT N'Mật khẩu đã được thay đổi thành công!';
    END
    ELSE
    BEGIN
        -- Nếu Login không tồn tại, thông báo lỗi
        PRINT N'Tài khoản không tồn tại.';
    END
END

GRANT EXECUTE ON OBJECT::dbo.ChangePassword TO Customer;

go

EXEC dbo.ChangePassword '123';


select r.role_name from Users u, Roles r where u.role_id = r.role_id

go

CREATE FUNCTION dbo.GetRoleByUserName ( @AccountName NVARCHAR(50) )
RETURNS NVARCHAR(30)
AS
BEGIN
    DECLARE @Role NVARCHAR(30);

    SELECT @Role = r.role_name 
    FROM Users u
    JOIN Roles r ON u.role_id = r.role_id
    WHERE u.AccountName = @AccountName;

    RETURN @Role;  -- Return the role name
END

go
Select dbo.GetRoleByUserName(N'hieu1') as RoleName

--gán quyền 
GRANT EXECUTE ON dbo.GetRoleByUserName TO Customer;


select * from  Users

SELECT 1 FROM sys.server_principals WHERE name = 'string'