-- SoftUni DB
USE SoftUni
GO

-- 8. Employees with Three Projects
CREATE OR ALTER PROCEDURE usp_AssignProject(@employeeId INT, @projectId INT)
AS
BEGIN TRANSACTION
	DECLARE @ProjectsCount INT = (SELECT COUNT(*) FROM EmployeesProjects WHERE EmployeeID = @employeeId)

	IF(@ProjectsCount >= 3)
	BEGIN
		ROLLBACK
		RAISERROR('The employee has too many projects!', 16, 1)
		RETURN
	END	

	INSERT INTO EmployeesProjects (EmployeeID, ProjectID)
		VALUES (@employeeId, @projectId)
COMMIT
GO

-- 9. Delete Employees
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Deleted_Employees' and xtype='U')
BEGIN
	CREATE TABLE Deleted_Employees
	(
		EmployeeId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
		FirstName NVARCHAR(50) NOT NULL,
		LastName NVARCHAR(50) NOT NULL,
		MiddleName NVARCHAR(50) NOT NULL,
		JobTitle NVARCHAR(50) NOT NULL,
		DepartmentId INT NULL,
		SALARY DECIMAL(7, 2) NULL,
	)
END
GO

CREATE OR ALTER TRIGGER tr_EmployeesDelete ON Employees FOR DELETE
AS
	INSERT INTO Deleted_Employees (FirstName, LastName, MiddleName, JobTitle, DepartmentId, Salary) 
		SELECT FirstName, LastName, MiddleName, JobTitle, DepartmentId, Salary
			FROM deleted
GO