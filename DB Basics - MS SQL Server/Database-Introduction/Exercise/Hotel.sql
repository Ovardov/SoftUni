-- 15. Hotel Database
CREATE DATABASE Hotel

CREATE TABLE Employees
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	LastName NVARCHAR(50) NOT NULL,
	Title NVARCHAR(100) NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE Customers
(
	AccountNumber INT PRIMARY KEY IDENTITY NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	LastName NVARCHAR(50) NOT NULL,
	PhoneNumber VARCHAR(20) NOT NULL,
	EmergencyName NVARCHAR(100) NOT NULL,
	EmergencyNumber VARCHAR(20) NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE RoomStatus
(
	RoomStatus INT PRIMARY KEY NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE RoomTypes
(
	RoomType INT PRIMARY KEY NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE BedTypes
(
	BedType INT PRIMARY KEY NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE Rooms
(
	RoomNumber INT PRIMARY KEY IDENTITY NOT NULL,
	RoomType INT FOREIGN KEY REFERENCES RoomTypes(RoomType) NOT NULL,
	BedType INT FOREIGN KEY REFERENCES BedTypes(BedType) NOT NULL,
	RoomStatus INT FOREIGN KEY REFERENCES RoomStatus(RoomStatus) NOT NULL,
	Rate DECIMAL(8, 2) NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE Payments
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	EmployeeId INT FOREIGN KEY REFERENCES Employees(Id) NOT NULL,
	AccountNumber INT FOREIGN KEY REFERENCES Customers(AccountNumber) NOT NULL,
	PaymentDate DATETIME2 NOT NULL,
	FirstDateOccupied DATETIME2 NOT NULL,
	LastDateOccupied DATETIME2 NOT NULL,
	TotalDays INT NOT NULL,
	AmountCharged DECIMAL(8, 2) NOT NULL,
	TaxRate DECIMAL(3, 2) NOT NULL,
	CHECK(TaxRate > 0 AND TaxRate <= 1),
	TaxAmount DECIMAL(5, 2) NOT NULL,
	PaymentTotal DECIMAL(9, 2) NOT NULL,
	Notes NVARCHAR(MAX) NULL,
)

CREATE TABLE Occupancies
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	EmployeeId INT FOREIGN KEY REFERENCES Employees(Id) NOT NULL,
	AccountNumber INT FOREIGN KEY REFERENCES Customers(AccountNumber) NOT NULL,
	RoomNumber INT FOREIGN KEY REFERENCES Rooms(RoomNumber) NOT NULL,
	DateOccupied DATETIME2 NOT NULL,
	RateApplied BIT NOT NULL,
	PhoneCharge DECIMAL(4, 2) NOT NULL,
	Notes NVARCHAR(MAX) NULL,
)

INSERT INTO Employees(FirstName, LastName, Title, Notes)
	VALUES
		('Dwayne', 'Doe', 'CEO', 'Test notes'),
		('John', 'Doe', 'Receptionist', NULL),
		('John', 'The rock', 'Cleaner', 'Test notes')

INSERT INTO Customers(FirstName, LastName, PhoneNumber, EmergencyName, EmergencyNumber)
	VALUES
		('Dwayne', 'Doe', '555-333-444', 'Doe', '333-444'),
		('John', 'Doe', '555-222-444', 'John', '333-222'),
		('John', 'The rock', '555-333-111', 'The rock', '333-111')

INSERT INTO RoomStatus(RoomStatus, Notes)
	VALUES
		(1, 'Busy'),
		(2, 'Free'),
		(3, 'In repair')

INSERT INTO RoomTypes(RoomType, Notes)
	VALUES
		(1, 'Double room'),
		(2, 'Triple room'),
		(3, 'Apartment')
		
INSERT INTO BedTypes(BedType, Notes)
	VALUES
		(1, 'Double bed'),
		(2, 'Two beds'),
		(3, 'Four beds')

INSERT INTO Rooms(RoomType, BedType, RoomStatus, Rate)
	VALUES
		(1, 1, 1, 1000),
		(2, 2, 2, 1500),
		(3, 3, 1, 3000)

INSERT INTO Payments(EmployeeId, AccountNumber, PaymentDate, FirstDateOccupied, LastDateOccupied, TotalDays, AmountCharged, TaxRate, TaxAmount, PaymentTotal)
	VALUES
		(1, 1, '2021-11-16', '2021-11-15', '2021-11-16', 1, 1000, 0.05, 50, 1050),
		(2, 2, '2021-11-18', '2021-11-16', '2021-11-18', 2, 3000, 0.05, 150, 3150),
		(3, 3, '2021-11-19', '2021-11-18', '2021-11-19', 1, 3000, 0.05, 150, 3150)

INSERT INTO Occupancies(EmployeeId, AccountNumber, RoomNumber, DateOccupied, RateApplied, PhoneCharge)
	VALUES
		(1, 1, 1, '2021-11-15', 1, 0),
		(2, 2, 2, '2021-11-16', 1, 5.2),
		(3, 3, 3, '2021-11-18', 1, 0.3)

-- 23. Decrease Tax Rate 
UPDATE Payments
	SET TaxRate = TaxRate * 0.97

SELECT TaxRate
	FROM Payments

-- 24. Delete All Records
DELETE FROM Occupancies