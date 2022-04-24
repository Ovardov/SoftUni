-- 1. Create Database
CREATE DATABASE Minions

-- 2. Create Tables
CREATE TABLE Minions
(
	Id INT NOT NULL,
	Name NVARCHAR(100) NOT NULL,
	Age INT NULL,
	PRIMARY KEY(Id)
)

CREATE TABLE Towns
(
	Id INT NOT NULL,
	Name NVARCHAR(50) NOT NULL,
	PRIMARY KEY(Id)
)

-- 3. Alter Minions Table
ALTER TABLE Minions
	ADD TownId INT,
	FOREIGN KEY (TownId) REFERENCES Towns(Id)

-- 4. Insert Records in Both Tables
INSERT INTO Towns (Id, Name)
	VALUES
	(1, 'Sofia'),
	(2, 'Plovdiv'),
	(3, 'Varna')

INSERT INTO Minions (Id, Name, Age, TownId)
	VALUES
		(1, 'Kevin', 22, 1),
		(2, 'Bob', 15, 3),
		(3, 'Steward', NULL, 2)

-- 5. Truncate Table Minions
TRUNCATE TABLE Minions

-- 6. Drop All Tables
DROP TABLE Minions
DROP TABLE Towns


-- 7. Create Table People
CREATE TABLE People
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	[Name] NVARCHAR(200) NOT NULL,
	Picture VARBINARY(MAX) NULL,
	CHECK(DATALENGTH(PICTURE) <= 2048 * 1024),
	Height DECIMAL(3, 2) NULL,
	[Weight] DECIMAL(5, 2) NULL,
	Gender CHAR(1) NOT NULL,
	Birthdate DATE NOT NULL,
	Biography NVARCHAR(MAX) NULL,
)

INSERT INTO People ([Name], Picture, Height, [Weight], Gender, Birthdate, Biography)
	VALUES
		('John Doe', NULL, 1.83, 70.3, 'm', '1998-01-01', 'first person'),
		('Dwayne', NULL, 1.70, 65, 'm', '1994-03-03', 'second person'),
		('Ani', NULL, 1.73, 50, 'f', '1998-04-04', 'third person'),
		('Zefir', NULL, 1.80, 70, 'm', '2002-05-05', 'fourth person'),
		('Sasho', NULL, 1.77, 63, 'm', '1998-06-06', 'fifth person')

-- 8. Create Table Users
CREATE TABLE Users
(
	Id BIGINT PRIMARY KEY IDENTITY NOT NULL,
	Username VARCHAR(30) UNIQUE NOT NULL,
	[Password] VARCHAR(26) NOT NULL,
	ProfilePicture VARBINARY(MAX) NULL,
	CHECK(DATALENGTH(ProfilePicture) <= 900 * 1024),
	LastLoginTime DATETIME2 NOT NULL,
	IsDeleted BIT NOT NULL
)

INSERT INTO Users (Username, [Password], ProfilePicture, LastLoginTime, IsDeleted)
	VALUES
		('Test', '123456', NULL, '2021-10-28 18:30:31 PM', 0),
		('Dwayne', '33333', NULL, '2021-10-27 18:40:31 PM', 1),
		('Ivan', '11111', NULL, '2021-09-28 18:30:31 PM', 1),
		('Sasho', '7777777', NULL, '2021-10-28 18:33:31 PM', 0),
		('John', '22222', NULL, '2021-10-27 18:30:31 PM', 1)

-- 9. Change Primary Key
ALTER TABLE Users
	DROP CONSTRAINT [PK__Users__3214EC07770072D1]

ALTER TABLE Users
	ADD CONSTRAINT PK_Users_CompositeIdUsername
	PRIMARY KEY(Id, Username)

-- 10. Add Check Constraint
ALTER TABLE Users
	ADD CONSTRAINT CK_Users_PasswordLength
	CHECK(LEN([Password]) >= 5)

-- 11. Set Default Value of a Field
ALTER TABLE Users
	ADD CONSTRAINT DF_Users_LastLoginTime
	DEFAULT GETDATE() FOR LastLoginTime

-- 12. Set Unique Field
ALTER TABLE Users
	DROP CONSTRAINT [PK_Users_CompositeIdUsername]

ALTER TABLE Users
	ADD CONSTRAINT PK_Users_Id
	PRIMARY KEY (Id)

ALTER TABLE Users
	ADD CONSTRAINT UQ_Users_Username
	UNIQUE (Username)

ALTER TABLE Users
	ADD CONSTRAINT CK_Users_UsernameLength
	CHECK(LEN(Username) >= 3)