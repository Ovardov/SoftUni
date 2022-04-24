-- Bank DB
USE Bank
GO

-- 1. Create Table Logs
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Logs' and xtype='U')
BEGIN
	CREATE TABLE Logs
	(
		LogId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
		AccountId INT FOREIGN KEY REFERENCES Accounts(Id) NOT NULL,
		OldSum MONEY NOT NULL,
		NewSum MONEY NOT NULL
	)
END
GO

CREATE OR ALTER TRIGGER tr_AccountsUpdate ON Accounts FOR UPDATE
AS
	INSERT INTO Logs (AccountId, OldSum, NewSum)
		SELECT i.Id, d.Balance, i.Balance
			FROM inserted AS i
			JOIN deleted AS d
			ON i.Id = d.Id
GO

-- 2. Create Table Emails
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='NotificationEmails' and xtype='U')
BEGIN
	CREATE TABLE NotificationEmails
	(
		Id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
		Recipient INT FOREIGN KEY REFERENCES Accounts(Id) NOT NULL,
		[Subject] NVARCHAR(100) NOT NULL,
		Body NVARCHAR(200) NOT NULL
	)
END
GO

CREATE OR ALTER TRIGGER tr_LogsInsert ON Logs FOR INSERT
AS
	INSERT INTO NotificationEmails (Recipient, [Subject], Body)
		SELECT AccountId,
			   CONCAT('Balance change for account: ', AccountId) AS [Subject],
			   CONCAT('On ', GETDATE(), ' your balance was changed from ', OldSum, ' to ', NewSum, '.') AS Body
			FROM inserted
GO

-- 3. Deposit Money
CREATE OR ALTER PROCEDURE usp_DepositMoney(@accountId INT, @moneyAmount DECIMAL(15, 4))
AS
BEGIN TRANSACTION
	DECLARE @account INT = (SELECT Id FROM Accounts WHERE Id = @accountId)

	IF(@account IS NULL)
	BEGIN
		ROLLBACK
		RAISERROR('Invalid account!', 16, 1)
		RETURN
	END

	IF (@moneyAmount < 0)
	BEGIN
		ROLLBACK
		RAISERROR('Invalid amount of money!', 16, 1)
		RETURN
	END

	UPDATE Accounts
		SET Balance += @moneyAmount
		WHERE Id = @accountId
COMMIT
GO

-- 4. Withdraw Money
CREATE OR ALTER PROCEDURE usp_WithdrawMoney(@accountId INT, @moneyAmount DECIMAL(15, 4))
AS
BEGIN TRANSACTION
	DECLARE @account INT = (SELECT Id FROM Accounts WHERE Id = @accountId)

	IF(@account IS NULL)
	BEGIN
		ROLLBACK
		RAISERROR('Invalid account!', 16, 1)
		RETURN
	END

	IF (@moneyAmount < 0)
	BEGIN
		ROLLBACK
		RAISERROR('Invalid amount of money!', 16, 1)
		RETURN
	END

	UPDATE Accounts
		SET Balance -= @moneyAmount
		WHERE Id = @accountId
COMMIT
GO

-- 5. Money Transfer
CREATE OR ALTER PROCEDURE usp_TransferMoney(@senderId INT, @receiverId INT, @amount DECIMAL(15, 4))
AS
BEGIN TRANSACTION
	EXEC usp_WithdrawMoney @senderId, @amount
	EXEC usp_DepositMoney @receiverId, @amount
COMMIT
GO

EXEC usp_TransferMoney 5, 1, 5000
SELECT * FROM Accounts
