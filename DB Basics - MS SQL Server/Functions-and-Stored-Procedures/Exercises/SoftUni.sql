-- SoftUni DB
USE SoftUni
GO

-- 1. Employees with Salary Above 35000
CREATE OR ALTER PROCEDURE usp_GetEmployeesSalaryAbove35000
AS
	SELECT FirstName, LastName
		FROM Employees
		WHERE Salary > 35000
GO

EXEC usp_GetEmployeesSalaryAbove35000
GO

-- 2. Employees with Salary Above Number
CREATE OR ALTER PROCEDURE usp_GetEmployeesSalaryAboveNumber(@number DECIMAL(18, 4))
AS
	SELECT FirstName, LastName
		FROM Employees
		WHERE Salary >= @number
GO

EXEC usp_GetEmployeesSalaryAboveNumber 48100
GO

-- 3. Town Names Starting With
CREATE OR ALTER PROCEDURE usp_GetTownsStartingWith(@startCharacters NVARCHAR(50))
AS
	SELECT [Name] AS Town
		FROM Towns
		WHERE [Name] LIKE @startCharacters + '%'
GO

EXEC usp_GetTownsStartingWith 'b'
GO

-- 4. Employees from Town
CREATE OR ALTER PROCEDURE usp_GetEmployeesFromTown(@townName NVARCHAR(50))
AS
	SELECT FirstName, LastName
		FROM Employees AS e
		JOIN Addresses AS a ON e.AddressID = a.AddressID
		JOIN Towns AS t ON a.TownID = t.TownID
		WHERE t.[Name] = @townName
GO

EXEC usp_GetEmployeesFromTown 'Sofia'
GO

-- 5. Salary Level Function
CREATE OR ALTER FUNCTION ufn_GetSalaryLevel(@salary DECIMAL(18, 4))
RETURNS VARCHAR(7)
AS
BEGIN
	IF (@salary IS NULL) RETURN NULL;
	IF (@salary < 30000) RETURN 'Low';
	IF (@salary < 50000) RETURN 'Average';
	RETURN 'High';
END

GO

-- 6. Employees by Salary Level
CREATE OR ALTER PROCEDURE usp_EmployeesBySalaryLevel (@levelOfSalary NVARCHAR(7))
AS
	SELECT FirstName, LastName
		FROM Employees
		WHERE dbo.ufn_GetSalaryLevel(Salary) = @levelOfSalary
GO

EXEC usp_EmployeesBySalaryLevel 'High'
GO

-- 7. Define Function
CREATE OR ALTER FUNCTION ufn_IsWordComprised(@setOfLetters NVARCHAR(MAX), @word NVARCHAR(MAX))
RETURNS SMALLINT
AS
BEGIN
	DECLARE @i SMALLINT = 1;
	
	WHILE(@i <= LEN(@word))
	BEGIN
		IF(CHARINDEX(SUBSTRING(@word, @i, 1), @setOfLetters) = 0) RETURN 0;
		
		SET @i += 1;
	END

	RETURN 1;
END

GO

-- 8. Delete Employees and Departments
CREATE OR ALTER PROCEDURE usp_DeleteEmployeesFromDepartment (@departmentId INT)
AS
	DELETE ep
		FROM EmployeesProjects AS ep
		JOIN Employees AS e ON ep.EmployeeID = e.EmployeeID
		WHERE e.DepartmentID = @departmentId

	ALTER TABLE Departments
		ALTER COLUMN ManagerID INT NULL

	UPDATE Departments
		SET ManagerID = NULL
		WHERE DepartmentID = @departmentId
	
	UPDATE Employees
		SET ManagerID = NULL
		WHERE ManagerID IN (SELECT EmployeeID FROM Employees WHERE DepartmentID = @departmentId)

	DELETE FROM Employees
		WHERE DepartmentID = @departmentId

	DELETE FROM Departments
		WHERE DepartmentID = @departmentId

	SELECT COUNT(*)
		FROM Employees
		WHERE DepartmentID = @departmentId
GO

--EXEC usp_DeleteEmployeesFromDepartment 7
GO
