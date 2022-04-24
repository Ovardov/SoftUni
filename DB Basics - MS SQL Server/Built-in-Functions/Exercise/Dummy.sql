USE [master]
GO

-- Dummy DB
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Dummy')
	BEGIN
		CREATE DATABASE Dummy;
	END;
GO

USE Dummy
GO

-- 19. People Table
CREATE TABLE People (
	Id INT IDENTITY NOT NULL,
	[Name] VARCHAR(100) NOT NULL,
	Birthdate DATETIME2 NOT NULL,
	CONSTRAINT PK_People PRIMARY KEY (Id)
)

INSERT INTO People
	VALUES
		('Victor', '2000-12-07 00:00:00.000'),
		('Steven', '1992-09-10 00:00:00.000'),
		('Stephen','1910-09-19 00:00:00.000'),
		('John', '2010-01-06 00:00:00.000')

SELECT [Name],
	   DATEDIFF(YEAR, Birthdate, GETDATE()) AS [Age in Years],
	   DATEDIFF(MONTH, Birthdate, GETDATE()) AS [Age in Months],
	   DATEDIFF(DAY, Birthdate, GETDATE()) AS [Age in Days],
	   DATEDIFF(MINUTE, Birthdate, GETDATE()) AS [Age in Minutes]
	FROM People