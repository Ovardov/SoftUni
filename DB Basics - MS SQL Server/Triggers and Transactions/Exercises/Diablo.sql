-- Diablo DB
USE Diablo
GO

-- 6. Trigger
CREATE OR ALTER TRIGGER tr_UserGameItemsInsert ON UserGameItems INSTEAD OF INSERT
AS
	INSERT INTO UserGameItems(ItemId, UserGameId)
		SELECT i.ItemId, i.UserGameId
			FROM inserted AS i
			JOIN UsersGames AS ug ON i.UserGameId = ug.Id
			JOIN Items AS it ON it.Id = i.ItemId
			WHERE ug.[Level] >= it.MinLevel
GO

UPDATE UsersGames
	SET Cash += 50000
	FROM UsersGames AS ug
	JOIN Users AS u ON ug.UserId = u.Id
	JOIN Games AS g ON ug.GameId = g.Id
	WHERE u.Username IN ('baleremuda', 'loosenoise', 'inguinalself', 'buildingdeltoid', 'monoxidecos')
		AND g.[Name] = 'Bali'
GO

CREATE OR ALTER PROCEDURE usp_BuyUsersItems(@username NVARCHAR(50), @itemId INT)
AS
BEGIN TRANSACTION
	DECLARE @item INT = (SELECT 1 FROM Items WHERE Id = @itemId);
	DECLARE @userId INT = (SELECT Id FROM Users WHERE Username = @username);
	DECLARE @gameId INT = (SELECT Id FROM Games WHERE [Name] = 'Bali');

	IF(@item IS NULL OR @userId IS NULL)
	BEGIN
		ROLLBACK
		RAISERROR('Invalid username or itemId!', 16, 1)
		RETURN
	END	

	DECLARE @priceOfItem MONEY = (SELECT Price FROM Items WHERE Id = @itemId);

	DECLARE @availableCash MONEY = (SELECT Cash 
												FROM UsersGames AS ug
												JOIN Users AS u ON ug.UserId = u.Id
												JOIN Games AS g ON ug.GameId = g.Id
												WHERE g.Id = @gameId AND u.Id = @userId
											);

	IF(@availableCash < @priceOfItem)
	BEGIN
		ROLLBACK
		RAISERROR('The user doesn''t have enough money!', 16, 1)
		RETURN
	END

	DECLARE @userGameId INT = (SELECT Id 
								FROM UsersGames
								WHERE UserId = @userId AND GameId = @gameId
							   );

	INSERT INTO UserGameItems(ItemId, UserGameId)
		VALUES(@itemId, @userGameId)

	UPDATE UsersGames
		SET Cash -= @priceOfItem
		WHERE UserId = @userId AND GameId = @gameId
COMMIT
GO

DECLARE @counter INT = 251;
WHILE @counter <= 539
BEGIN
	EXEC usp_BuyUsersItems 'baleremuda', @counter
	EXEC usp_BuyUsersItems 'loosenoise', @counter
	EXEC usp_BuyUsersItems 'inguinalself', @counter
	EXEC usp_BuyUsersItems 'buildingdeltoid', @counter
	EXEC usp_BuyUsersItems 'monoxidecos', @counter

	SET @counter += 1;
	IF(@counter = 300) SET @counter = 501;
END

SELECT u.Username, g.[Name], ug.Cash, i.[Name]
	FROM Users AS u
	JOIN UsersGames AS ug ON u.Id = ug.UserId
	JOIN UserGameItems AS ugi ON ug.Id = ugi.UserGameId
	JOIN Items AS i ON ugi.ItemId = i.Id
	JOIN Games AS g ON ug.GameId = g.Id
	WHERE g.[Name] = 'Bali'
	ORDER BY u.Username ASC, i.[Name] ASC
GO

-- 7. Massive Shopping
DECLARE @userId INT = (SELECT Id FROM Users WHERE Username = 'Stamat');
DECLARE @gameId INT = (SELECT Id FROM Games WHERE [Name] = 'Safflower');
DECLARE @userGameId INT = (SELECT Id FROM UsersGames WHERE UserId = @userId AND GameId = @gameId);
DECLARE @priceOfAllItems MONEY = 0;
DECLARE @availableCash MONEY = 0;

BEGIN TRANSACTION
	SET @priceOfAllItems = (SELECT SUM(Price) FROM Items WHERE MinLevel BETWEEN 11 AND 12);

	SET @availableCash = (SELECT Cash 
							FROM UsersGames AS ug
							JOIN Users AS u ON ug.UserId = u.Id
							JOIN Games AS g ON ug.GameId = g.Id
							WHERE g.Id = @gameId AND u.Id = @userId
						);

	IF(@availableCash >= @priceOfAllItems)
	BEGIN
		INSERT INTO UserGameItems(ItemId, UserGameId)
		SELECT Id, @userGameId
			FROM Items
			WHERE MinLevel BETWEEN 11 AND 12

		UPDATE UsersGames
			SET Cash -= @priceOfAllItems
			WHERE UserId = @userId AND GameId = @gameId
		
	END
COMMIT

BEGIN TRANSACTION
	SET @priceOfAllItems = (SELECT SUM(Price) FROM Items WHERE MinLevel BETWEEN 19 AND 21);

	SET @availableCash = (SELECT Cash 
							FROM UsersGames AS ug
							JOIN Users AS u ON ug.UserId = u.Id
							JOIN Games AS g ON ug.GameId = g.Id
							WHERE g.Id = @gameId AND u.Id = @userId
						);

	IF(@availableCash >= @priceOfAllItems)
	BEGIN
		INSERT INTO UserGameItems(ItemId, UserGameId)
		SELECT Id, @userGameId
			FROM Items
			WHERE MinLevel BETWEEN 19 AND 21

	UPDATE UsersGames
		SET Cash -= @priceOfAllItems
		WHERE UserId = @userId AND GameId = @gameId
	END
COMMIT

SELECT [Name] AS ItemName
	FROM UserGameItems AS ugi
	JOIN Items AS i ON ugi.ItemId = i.Id
	JOIN UsersGames AS ug ON ugi.UserGameId = ug.Id
	JOIN Users AS u ON ug.UserId = u.Id
	WHERE u.Id = @userId AND ug.GameId = @gameId
	ORDER BY [Name] ASC
GO
