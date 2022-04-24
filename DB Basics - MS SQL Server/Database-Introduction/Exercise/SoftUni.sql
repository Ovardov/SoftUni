-- 16. SoftUni Database
CREATE DATABASE SoftUni

CREATE TABLE Towns
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	Name NVARCHAR(100) NOT NULL
)

CREATE TABLE Addresses
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	AddressText NVARCHAR(50) NOT NULL,
	TownId INT FOREIGN KEY REFERENCES Towns(Id)
)

CREATE TABLE Departments
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	Name NVARCHAR(50) NOT NULL
)

CREATE TABLE Employees
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	MiddleName NVARCHAR(50) NULL,
	LastName NVARCHAR(50) NOT NULL,
	JobTitle NVARCHAR(50) NOT NULL,
	DepartmentId INT FOREIGN KEY REFERENCES Departments(Id) NOT NULL,
	HireDate DATE NOT NULL,
	Salary DECIMAL(7, 2) NOT NULL,
	AddressId INT FOREIGN KEY REFERENCES Addresses(Id),
)

-- 18.	Basic Insert
INSERT INTO Towns(Name)
	VALUES
		('Sofia'),
		('Plovdiv'),
		('Varna'),
		('Burgas')

INSERT INTO Departments(Name)
	VALUES
		('Engineering'),
		('Sales'),
		('Marketing'),
		('Software Development'),
		('Quality Assurance')

INSERT INTO Employees(FirstName, MiddleName, LastName, JobTitle, DepartmentId, HireDate, Salary)
	VALUES
		('Ivan', 'Ivanov', 'Ivanov', '.NET Developer', 4, '2013-02-01', 3500),
		('Petar', 'Petrov', 'Petrov', 'Senior Engineer', 1, '2004-03-02', 4000),
		('Maria', 'Petrova', 'Ivanova', 'Intern', 5, '2016-08-28', 525.25),
		('Georgi', 'Teziev', 'Ivanov', 'CEO	Sales', 2, '2007-12-09', 3000),
		('Peter', 'Pan', 'Pan', 'Intern', 3, '2016-08-28', 599.88)

-- 19. Basic Select All Fields
SELECT * 
	FROM Towns
SELECT *
	FROM Departments
SELECT *
	FROM Employees

-- 20. Basic Select All Fields and Order Them
SELECT *
	FROM Towns
	ORDER BY Name ASC

SELECT *
	FROM Departments
	ORDER BY NAME ASC

SELECT * 
	FROM Employees
	ORDER BY Salary DESC

-- 21. Basic Select Some Fields
SELECT [Name]
	FROM Towns
	ORDER BY Name ASC

SELECT [Name]
	FROM Departments
	ORDER BY NAME ASC

SELECT FirstName, LastName, JobTitle, Salary
	FROM Employees
	ORDER BY Salary DESC

-- 22. Increase Employees Salary
UPDATE Employees
	SET Salary = Salary * 1.1

SELECT Salary
	FROM Employees
