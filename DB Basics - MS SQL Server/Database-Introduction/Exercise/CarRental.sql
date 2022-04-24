-- Create
CREATE DATABASE CarRental

CREATE TABLE Categories
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	CategoryName NVARCHAR(100) NOT NULL,
	DailyRate DECIMAL(6, 2) NOT NULL,
	WeeklyRate DECIMAL(7, 2) NOT NULL,
	WeekendRate DECIMAL(7, 2) NOT NULL,
	MonthlyRate DECIMAL(7, 2) NOT NULL,
)

CREATE TABLE Cars
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	PlateNumber VARCHAR(10) NOT NULL,
	Manufacturer NVARCHAR(50) NOT NULL,
	Model NVARCHAR(50) NOT NULL,
	CarYear INT NOT NULL,
	Doors INT NULL,
	CHECK(Doors = 3 OR Doors = 5),
	Picture VARBINARY(MAX) NULL,
	Condition NVARCHAR(20) NULL,
	Available BIT NOT NULL,
	CategoryId INT FOREIGN KEY REFERENCES Categories(Id)
)

CREATE TABLE Employees
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	LastName NVARCHAR(50) NOT NULL,
	Title NVARCHAR(100) NOT NULL,
	Notes NVARCHAR(500) NULL,
)

CREATE TABLE Customers
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	DriverLicenceNumber NVARCHAR(20) NOT NULL,
	FullName NVARCHAR(100) NOT NULL,
	[Address] NVARCHAR(100) NOT NULL,
	City NVARCHAR(50) NOT NULL,
	ZIPCode VARCHAR(10) NOT NULL,
	Notes NVARCHAR(500) NULL,
)

CREATE TABLE RentalOrders
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	EmployeeId INT FOREIGN KEY REFERENCES Employees(Id),
	CustomerId INT FOREIGN KEY REFERENCES Customers(Id),
	CarId INT FOREIGN KEY REFERENCES Cars(Id),
	TankLevel DECIMAL(5, 2) NOT NULL,
	-- Validation for percents
	CHECK(TankLevel > 0 AND TankLevel <= 1),
	KilometrageStart DECIMAL(9, 2) NOT NULL,
	KilometrageEnd DECIMAL(9, 2) NOT NULL,
	TotalKilometrage DECIMAL(8, 2) NOT NULL,
	StartDate DATETIME2 NOT NULL,
	EndDate DATETIME2 NOT NULL,
	TotalDays INT NOT NULL,
	RateApplied BIT NOT NULL,
	TaxRate DECIMAL(5, 2) NOT NULL,
	OrderStatus VARCHAR(20) NOT NULL,
	Notes NVARCHAR(500) NULL,
)

-- Insert
INSERT INTO Categories(CategoryName, DailyRate, WeeklyRate, WeekendRate, MonthlyRate)
	VALUES
		('Sedan', 100, 500, 200, 3000),
		('Hatchback', 50, 250, 100, 1500),
		('Bus', 200, 1000, 400, 6000)

INSERT INTO Cars(PlateNumber, Manufacturer, Model, CarYear, Doors, Condition, Available, CategoryId)
	VALUES
		('PB 7245 BA', 'Mercedes-Benz', 'E300', 2018, 5, 'Good', 1, 1),
		('CA 5563 KA', 'Audi', 'A3', 2019, 3, 'Good', 1, 2), 
		('B 3245 TA', 'BMW', 'X4', 2019, 5, 'Good', 0, 3)

INSERT INTO Employees(FirstName, LastName, Title, Notes)
	VALUES
		('John', 'Doe', 'CEO', 'This is a test note'),
		('Dwayne', 'The rock', 'Consultant', NULL),
		('Test', 'Doe', 'Consultant', NULL)

INSERT INTO Customers(DriverLicenceNumber, FullName, [Address], City, ZIPCode, Notes)
	VALUES
		('2345232234', 'John Doe', 'Plovdiv, Bulgaria', 'Plovdiv', '4000', 'This is my first car'),
		('1231231333', 'Test Doe', 'Sofia, Bulgaria', 'Sofia', '1000', NULL),
		('5234223242', 'Dwayne Doe', 'Varna, Bulgaria', 'Varna', '9000', NULL)

INSERT INTO RentalOrders(EmployeeId, CustomerId, CarId, TankLevel, KilometrageStart, KilometrageEnd, TotalKilometrage, StartDate, EndDate, TotalDays, RateApplied, TaxRate, OrderStatus)
	VALUES
		(1, 1, 1, 0.75, 40000, 45000, 5000, '2021-10-25', '2021-11-25', 30, 1, 300, 'Completed'),
		(2, 3, 2, 0.55, 20000, 45000, 25, '2021-9-25', '2021-11-25', 60, 1, 400, 'Completed'),
		(3, 2, 3, 0.35, 50000, 53000, 3000, '2021-11-15', '2021-11-25', 10, 1, 100, 'Completed')
