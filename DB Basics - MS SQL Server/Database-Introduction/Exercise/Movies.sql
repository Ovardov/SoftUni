-- CREATE
CREATE DATABASE Movies

CREATE TABLE Directors
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	DirectorName NVARCHAR(100) NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE Genres
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	GenreName NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE Categories
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	CategoryName NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX) NULL
)

CREATE TABLE Movies
(
	Id INT PRIMARY KEY IDENTITY NOT NULL,
	Title NVARCHAR(100) NOT NULL,
	CopyrightYear INT NOT NULL,
	[Length] DECIMAL(3,2) NOT NULL,
	Rating DECIMAL(3, 2),
	DirectorId INT FOREIGN KEY REFERENCES Directors(Id),
	GenreId INT FOREIGN KEY REFERENCES Genres(Id),
	CategoryId INT FOREIGN KEY REFERENCES Categories(Id)
)

-- INSERT
INSERT INTO Directors (DirectorName, Notes)
	VALUES 
		('Test', 'First Director'),
		('John', 'Second Director'),
		('The Rock', NULL),
		('Dwayne', NULL),
		('Cristiano', NULL)

INSERT INTO Genres (GenreName, Notes)
	VALUES 
		('Comedy', 'Comedy Movies'),
		('Action', NULL),
		('Romantic', NULL),
		('Drama', NULL),
		('Anime', NULL)

INSERT INTO Categories (CategoryName, Notes)
	VALUES 
		('Family', 'Family Movies'),
		('Second Categiry', NULL),
		('Third Category', NULL),
		('Fourth Category', NULL),
		('Fifth Category', NULL)

INSERT INTO Movies (Title, CopyrightYear, Length, Rating, DirectorId, GenreId, CategoryId)
	VALUES 
		('Red Notice', 2021, 1.43, 9.7, 3, 2, 1),
		('Second Movie', 2019, 1.33, 7.7, 2, 1, 3),
		('Third Movie', 2016, 2, 6.7, 2, 1, 3),
		('Fourth Movie', 2018, 1.45, 6.7, 2, 1, 3),
		('Fifth Notice', 2021, 1.55, 8.7, 2, 2, 1)
