--##############################################################################################################################################################
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

go 
--create role Moderator
Create ROLE Moderator;
Grant Select, Update, Insert On dbo.UserInfo to Moderator
Grant Select On dbo.Province to Moderator
Grant Select On dbo.Users to Moderator
Grant Select, Insert On dbo.District to Moderator
Grant Select, Insert On dbo.Commune to Moderator
Grant Select, Insert On dbo.Address to Moderator
----procedure update state Order

--create role Warehouse Employee
Create ROLE WarehouseEmployee;
Grant Select On dbo.Users to WarehouseEmployee
Grant Select, Update, Insert On dbo.UserInfo to WarehouseEmployee
Grant Select On dbo.Province to WarehouseEmployee
Grant Select, Insert On dbo.District to WarehouseEmployee
Grant Select, Insert On dbo.Commune to WarehouseEmployee
Grant Select, Insert On dbo.Address to WarehouseEmployee
--create role Order Approver
Create ROLE OrderApprover;
Grant Select On dbo.Users to OrderApprover
Grant Select, Update, Insert On dbo.UserInfo to OrderApprover
Grant Select On dbo.Province to OrderApprover
Grant Select, Insert On dbo.District to OrderApprover
Grant Select, Insert On dbo.Commune to OrderApprover
Grant Select, Insert On dbo.Address to OrderApprover


--procedure change password user (customer)
go
--##############################################################################################################################################################
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
GRANT EXECUTE ON dbo.ChangePassword TO OrderApprover;
GRANT EXECUTE ON dbo.ChangePassword TO WarehouseEmployee;
GRANT EXECUTE ON dbo.ChangePassword TO Moderator;

go

EXEC dbo.ChangePassword '123';


select r.role_name from Users u, Roles r where u.role_id = r.role_id

go
--##############################################################################################################################################################
--không dùng
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

select * from EmployeeType

--##############################################################################################################################################################
go
--Lấy ra quyền của người dùng login vào sqlserver
CREATE PROCEDURE GetRoleNameByCurrentUser
AS
BEGIN
    DECLARE @AccountName NVARCHAR(50);
    SET @AccountName = SUSER_NAME();
    
    SELECT r.role_name
    FROM Users u
    INNER JOIN Roles r ON r.role_id = u.role_id
    WHERE u.AccountName = @AccountName;
END
--gán quyền 
GRANT EXECUTE ON dbo.GetRoleNameByCurrentUser TO Customer;
GRANT EXECUTE ON dbo.GetRoleNameByCurrentUser TO OrderApprover;
GRANT EXECUTE ON dbo.GetRoleNameByCurrentUser TO WarehouseEmployee;
GRANT EXECUTE ON dbo.GetRoleNameByCurrentUser TO Moderator;

select * From Users u, Roles r where u.role_id = r.role_id

--thực thi
EXEC GetRoleNameByCurrentUser;

--##############################################################################################################################################################
--Register -- Tạo 1 tài khoản Khách hàng
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

    -- Gán quyền mặc định cho User (quyền Khách Hàng)
    EXEC sp_addrolemember N'Customer', @AccountName

	 -- Gán Login vào server role 'CustomerServerRole'
    SET @Sql = 'ALTER SERVER ROLE CustomerServerRole ADD MEMBER [' + @AccountName + '];'
    EXEC sp_executesql @Sql

    -- Lưu thông tin vào bảng Users
    INSERT INTO Users (AccountName, role_id)
    VALUES (@AccountName, 1)

	DECLARE @InsertedCustomerID TABLE (customerId INT);
	--thêm vào Customer
	insert into Customer(type_customer_id)
	OUTPUT INSERTED.customerId INTO @InsertedCustomerID
	values(1) -- Loại Khách Hàng là Khách Hàng mới

	DECLARE @customerId INT;
	Select @customerId = customerId from @InsertedCustomerID;

	--thêm vào UserInfo
	insert into UserInfo (AccountName, customer_Id)
	values (@AccountName, @customerId);

    -- Thông báo hoàn thành
    PRINT N'Đăng ký khách hàng thành công!'
END

select * from Users

EXEC CreateCustomer 'hieu3', '123@@@';

go

--##############################################################################################################################################################
--Register -- Tạo 1 tài khoản người điều hành
CREATE PROCEDURE CreateModerator
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

    -- Gán quyền cho User (quyền Người điều hành)
    EXEC sp_addrolemember N'Moderator', @AccountName

	 -- Gán Login vào server role 'CustomerServerRole' -- được phép sửa xóa login sqlserver
    SET @Sql = 'ALTER SERVER ROLE CustomerServerRole ADD MEMBER [' + @AccountName + '];'
    EXEC sp_executesql @Sql

    -- Lưu thông tin vào bảng Users -- user này có table role là Moderator
    INSERT INTO Users (AccountName, role_id)
    VALUES (@AccountName, 3)

	DECLARE @InsertedEmployeeID TABLE (employeeId INT);
	--thêm vào Employee
	insert into Employee(EmployeeTypeID, DepartmentID)
	OUTPUT INSERTED.EmployeeID INTO @InsertedEmployeeID
	values(6, 2) -- Moderator và Phòng IT

	DECLARE @employeeId INT;
	Select @employeeId = employeeId from @InsertedEmployeeID;

	--thêm vào UserInfo
	insert into UserInfo (AccountName, Employ_ID)
	values (@AccountName, @employeeId);

    -- Thông báo hoàn thành
    PRINT N'Đăng ký nhân viên điều hành thành công!'
END


EXEC CreateModerator 'HiuModerator', '123@';

select * from Roles

select u.AccountName, et.EmployeeTypeName, d.DepartmentName, r.role_name
From Users u, UserInfo uf, Employee e, EmployeeType et, Department d , Roles r
where u.AccountName = uf.AccountName and uf.Employ_ID = e.EmployeeID and et.EmployeeTypeID = e.EmployeeTypeID and e.DepartmentID = d.DepartmentID and u.role_id = r.role_id

select * from EmployeeType

go
--##############################################################################################################################################################
--Register -- Tạo 1 tài khoản nhân viên quản lí kho
CREATE PROCEDURE CreateWarehouseEmployee
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

    -- Gán quyền cho User (quyền nhân viên quản lý kho)
    EXEC sp_addrolemember N'WarehouseEmployee', @AccountName

	 -- Gán Login vào server role 'CustomerServerRole' -- được phép sửa xóa login sqlserver
    SET @Sql = 'ALTER SERVER ROLE CustomerServerRole ADD MEMBER [' + @AccountName + '];'
    EXEC sp_executesql @Sql

    -- Lưu thông tin vào bảng Users -- user này có table role là Moderator
    INSERT INTO Users (AccountName, role_id)
    VALUES (@AccountName, 4)

	DECLARE @InsertedEmployeeID TABLE (employeeId INT);
	--thêm vào Employee
	insert into Employee(EmployeeTypeID, DepartmentID)
	OUTPUT INSERTED.EmployeeID INTO @InsertedEmployeeID
	values(4, 3) -- Warehouse Employee và Kho A

	DECLARE @employeeId INT;
	Select @employeeId = employeeId from @InsertedEmployeeID;

	--thêm vào UserInfo
	insert into UserInfo (AccountName, Employ_ID)
	values (@AccountName, @employeeId);

    -- Thông báo hoàn thành
    PRINT N'Đăng ký nhân viên quản lý kho thành công!'
END

EXEC CreateWarehouseEmployee 'Hiu1WarehouseEmployee', '123@';
go
--##############################################################################################################################################################
--Register -- Tạo 1 tài khoản nhân viên duyệt đơn
CREATE PROCEDURE CreateOrderApprover
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

    -- Gán quyền cho User (quyền nhân viên quản lý kho)
    EXEC sp_addrolemember N'OrderApprover', @AccountName

	 -- Gán Login vào server role 'CustomerServerRole' -- được phép sửa xóa login sqlserver
    SET @Sql = 'ALTER SERVER ROLE CustomerServerRole ADD MEMBER [' + @AccountName + '];'
    EXEC sp_executesql @Sql

    -- Lưu thông tin vào bảng Users -- user này có table role là Order Approver
    INSERT INTO Users (AccountName, role_id)
    VALUES (@AccountName, 10)

	DECLARE @InsertedEmployeeID TABLE (employeeId INT);
	--thêm vào Employee
	insert into Employee(EmployeeTypeID, DepartmentID)
	OUTPUT INSERTED.EmployeeID INTO @InsertedEmployeeID
	values(5, 4) -- Warehouse Employee và Kho A

	DECLARE @employeeId INT;
	Select @employeeId = employeeId from @InsertedEmployeeID;

	--thêm vào UserInfo
	insert into UserInfo (AccountName, Employ_ID)
	values (@AccountName, @employeeId);

    -- Thông báo hoàn thành
    PRINT N'Đăng ký nhân viên duyệt đơn thành công!'
END

EXEC CreateOrderApprover 'HiusOrderApprover', '123@@';
