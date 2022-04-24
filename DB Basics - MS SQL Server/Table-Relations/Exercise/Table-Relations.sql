CREATE DATABASE TableRelations
GO

USE TableRelations

-- 1. One-To-One Relationship
CREATE TABLE Passports
(
	PassportID INT IDENTITY(101, 1) NOT NULL,
	PassportNumber VARCHAR(8) NOT NULL
	CONSTRAINT PK_Passports 
		PRIMARY KEY(PassportID)
)

CREATE TABLE Persons
(
	PersonID INT IDENTITY NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	Salary DECIMAL(14, 2) NULL,
	PassportID INT UNIQUE NOT NULL,
	CONSTRAINT PK_Persons
		PRIMARY KEY(PersonID),
	CONSTRAINT FK_Persons_Passports
		FOREIGN KEY (PassportID)
		REFERENCES Passports (PassportID)
)

INSERT INTO Passports (PassportNumber)
	VALUES
		('N34FG21B'),
		('K65LO4R7'),
		('ZE657QP2')

INSERT INTO Persons (FirstName, Salary, PassportID)
	VALUES
		('Roberto', 43300.00, 102),
		('Tom', 56100.00, 103),
		('Yana', 60200.00, 101)
		

-- 2. One-To-Many Relationship
CREATE TABLE Manufacturers
(
	ManufacturerID INT IDENTITY NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	EstablishedOn DATETIME2 NOT NULL,
	CONSTRAINT PK_Manufacturers
		PRIMARY KEY(ManufacturerID)
)

CREATE TABLE Models
(
	ModelID INT IDENTITY(101, 1) NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	ManufacturerID INT NOT NULL,
	CONSTRAINT PK_Models
		PRIMARY KEY(ModelID),
	CONSTRAINT FK_Models_Manufacturers
		FOREIGN KEY (ManufacturerId)
		REFERENCES Manufacturers(ManufacturerID)
)

INSERT INTO Manufacturers ([Name], EstablishedOn)
	VALUES
		('BMW', '07/03/1916'),
		('Tesla', '01/01/2003'),
		('Lada', '01/05/1966')

INSERT INTO Models ([Name], ManufacturerID)
	VALUES
		('X1', 1),
		('i6', 1),
		('Model S', 2),
		('Model X', 2),
		('Model 3', 2),
		('Nova', 3)


-- 3. Many-To-Many Relationship
CREATE TABLE Students
(
	StudentID INT IDENTITY NOT NULL,
	[Name] NVARCHAR(100) NOT NULL,
	CONSTRAINT PK_Students
		PRIMARY KEY (StudentID)
)

CREATE TABLE Exams
(
	ExamID INT IDENTITY(101, 1) NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	CONSTRAINT PK_Exams
		PRIMARY KEY (ExamID)
)

CREATE TABLE StudentsExams
(
	StudentID INT NOT NULL,
	ExamID INT NOT NULL,
	CONSTRAINT PK_StudentsExams
		PRIMARY KEY(StudentID, ExamID),
	CONSTRAINT FK_StudentsExams_Students
		FOREIGN KEY (StudentID)
		REFERENCES Students(StudentID),
	CONSTRAINT FK_StudentsExams_Exams
		FOREIGN KEY (ExamID)
		REFERENCES Exams(ExamID)
)

INSERT INTO Students ([Name])
	VALUES
		('Mila'),
		('Toni'),
		('Ron')

INSERT INTO Exams ([Name])
	VALUES
		('SpringMVC'),
		('Neo4j'),
		('Oracle 11g')

INSERT INTO StudentsExams(StudentID, ExamID)
	VALUES
		(1, 101),
		(1, 102),
		(2, 101),
		(3, 103),
		(2, 102),
		(2, 103)

-- 4. Self-Referencing 
CREATE TABLE Teachers
(
	TeacherID INT IDENTITY(101, 1) NOT NULL,
	[Name] NVARCHAR(100) NOT NULL,
	ManagerID INT NULL,
	CONSTRAINT PK_Teachers
		PRIMARY KEY (TeacherID),
	CONSTRAINT FK_Teachers
		FOREIGN KEY (ManagerID)
		REFERENCES Teachers(TeacherID)
)

INSERT INTO Teachers ([Name], ManagerID)
	VALUES
		('John', NULL),
		('Maya', 106),
		('Silvia', 106),
		('Ted', 105),
		('Mark', 101),
		('Greta', 101)