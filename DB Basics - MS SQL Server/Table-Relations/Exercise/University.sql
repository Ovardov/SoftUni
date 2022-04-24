-- 6. University Database
CREATE DATABASE University
GO

USE University

CREATE TABLE Majors
(
	MajorID INT IDENTITY NOT NULL,
	[Name] NVARCHAR(100) NOT NULL,
	CONSTRAINT PK_Majors
		PRIMARY KEY (MajorID)
)

CREATE TABLE Students
(
	StudentID INT IDENTITY NOT NULL,
	StudentNumber INT NOT NULL,
	StudentName NVARCHAR(100) NOT NULL,
	MajorID INT NOT NULL,
	CONSTRAINT PK_Students
		PRIMARY KEY (StudentID),
	CONSTRAINT FK_Students_Majors
		FOREIGN KEY (MajorID)
		REFERENCES Majors(MajorID)
)

CREATE TABLE Payments
(
	PaymentID INT IDENTITY NOT NULL,
	PaymentDate DATETIME2 NOT NULL,
	PaymentAmount DECIMAL(6, 2) NOT NULL,
	StudentID INT NOT NULL,
	CONSTRAINT PK_Payments
		PRIMARY KEY (PaymentID),
	CONSTRAINT FK_Payments_Students
		FOREIGN KEY (StudentID)
		REFERENCES Students(StudentID)
)

CREATE TABLE Subjects
(
	SubjectID INT IDENTITY NOT NULL,
	[Name] VARCHAR(50) NOT NULL,
	CONSTRAINT PK_SubjectS
		PRIMARY KEY (SubjectID)
)

CREATE TABLE Agenda
(
	StudentID INT NOT NULL,
	SubjectID INT NOT NULL,
	CONSTRAINT PK_Agenda
		PRIMARY KEY (StudentID, SubjectID),
	CONSTRAINT FK_Agenda_Students
		FOREIGN KEY (StudentID)
		REFERENCES Students(StudentID),
	CONSTRAINT FK_Agenda_Subjects
		FOREIGN KEY (SubjectID)
		REFERENCES SubjectS(SubjectID)
)