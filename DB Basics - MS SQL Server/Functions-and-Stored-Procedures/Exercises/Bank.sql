-- Bank DB
USE [Bank]
GO

-- 9. Find Full Name
CREATE OR ALTER PROCEDURE usp_GetHoldersFullName
AS
	SELECT CONCAT(FirstName, ' ', LastName) AS FullName
		FROM AccountHolders
GO

EXEC usp_GetHoldersFullName
GO

-- 10. Find Full Name
CREATE OR ALTER PROCEDURE usp_GetHoldersWithBalanceHigherThan(@money DECIMAL(18,2))
AS
	SELECT ah.FirstName, ah.LastName
		FROM AccountHolders AS ah
		JOIN Accounts AS a ON ah.Id = a.AccountHolderId
		GROUP BY a.AccountHolderId, ah.FirstName, ah.LastName
		HAVING SUM(a.Balance) > @money
		ORDER BY ah.FirstName, ah.LastName
GO

EXEC usp_GetHoldersWithBalanceHigherThan 0.2
GO

-- 11. Future Value Function
CREATE OR ALTER FUNCTION ufn_CalculateFutureValue(@sum DECIMAL(18, 4), @yearlyInterestRate FLOAT, @numberOfYears INT)
RETURNS DECIMAL(18, 4)
AS
BEGIN
	DECLARE @result DECIMAL(18, 4)
	SET @result = @sum * (POWER((1 + @yearlyInterestRate), @numberOfYears));
	RETURN @result;
END

GO

-- 12. Calculating Interest
CREATE OR ALTER PROCEDURE usp_CalculateFutureValueForAccount(@accountId INT, @interestRate FLOAT)
AS
	SELECT ah.Id AS [AccountId],
	       ah.FirstName,
		   ah.LastName,
		   a.Balance AS [CurrentBalance],
		   dbo.ufn_CalculateFutureValue(a.Balance, @interestRate, 5) AS [BalanceInFiveYears]
		FROM AccountHolders AS ah
		JOIN Accounts AS a ON ah.Id = a.AccountHolderId
		WHERE a.Id = @accountId
GO

EXEC usp_CalculateFutureValueForAccount 1, 0.1
GO

-- Diablo DB
USE Diablo
GO

-- 13. Future Value Function
CREATE OR ALTER FUNCTION ufn_CashInUsersGames(@gameName NVARCHAR(50))
RETURNS @result TABLE
(
	SumCash MONEY NOT NULL
)
AS
BEGIN
	DECLARE @cash MONEY = 0;

	SET @cash = (SELECT SUM(query.Cash) AS SumCash
		FROM (SELECT ug.Cash, ROW_NUMBER() OVER (ORDER BY ug.Cash DESC) AS RowNumber
				FROM UsersGames AS ug
				JOIN Games AS g ON ug.GameId = g.Id
				WHERE g.[Name] = @gameName
			 ) AS query
		WHERE query.RowNumber % 2 = 1)

	INSERT INTO @result (SumCash)
		VALUES (@cash)

	RETURN;
END

GO	