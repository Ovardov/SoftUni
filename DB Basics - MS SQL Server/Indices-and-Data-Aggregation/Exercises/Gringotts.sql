-- Gringotts DB
USE Gringotts
GO

-- 1. Records’ Count
SELECT COUNT(*) AS [Count]
	FROM WizzardDeposits

-- 2. Longest Magic Wand
SELECT MAX(MagicWandSize) as LongestMagicWand
	FROM WizzardDeposits

-- 3. Longest Magic Wand Per Deposit Groups
SELECT DepositGroup, MAX(MagicWandSize) as LongestMagicWand
	FROM WizzardDeposits
	GROUP BY DepositGroup

-- 4. Smallest Deposit Group Per Magic Wand Size
SELECT TOP(2) DepositGroup
	FROM WizzardDeposits
	GROUP BY DepositGroup
	ORDER BY AVG(MagicWandSize) ASC

-- 5. Deposits Sum
SELECT DepositGroup, SUM(DepositAmount) as TotalSum
	FROM WizzardDeposits
	GROUP BY DepositGroup

-- 6. Deposits Sum for Ollivander Family
SELECT DepositGroup, SUM(DepositAmount) as TotalSum
	FROM WizzardDeposits
	GROUP BY DepositGroup, MagicWandCreator
	HAVING MagicWandCreator = 'Ollivander family'

-- 7. Deposits Filter
SELECT DepositGroup, SUM(DepositAmount) as TotalSum
	FROM WizzardDeposits
	GROUP BY DepositGroup, MagicWandCreator
	HAVING MagicWandCreator = 'Ollivander family' AND SUM(DepositAmount) < 150000
	ORDER BY TotalSum DESC

-- 8. Deposit Charge
SELECT DepositGroup, MagicWandCreator, MIN(DepositCharge) AS MinDepositCharge
	FROM WizzardDeposits
	GROUP BY DepositGroup, MagicWandCreator
	ORDER BY MagicWandCreator ASC, DepositGroup ASC

-- 9. Age Groups
SELECT AgeGroup, COUNT(*) AS WizardCount
	FROM (SELECT CASE
					WHEN Age >= 0 AND Age <= 10 THEN '[0-10]'
					WHEN Age >= 11 AND Age <= 20 THEN '[11-20]'
					WHEN Age >= 21 AND Age <= 30 THEN '[21-30]'
					WHEN Age >= 31 AND Age <= 40 THEN '[31-40]'
					WHEN Age >= 41 AND Age <= 50 THEN '[41-50]'
					WHEN Age >= 51 AND Age <= 60 THEN '[51-60]'
					WHEN Age >= 61 THEN '[61+]'
				END AS AgeGroup
			FROM WizzardDeposits) AS AgeGroupQuery
	GROUP BY AgeGroup

-- 10. First Letter
SELECT SUBSTRING(FirstName, 1, 1) AS FirstLetter
	FROM WizzardDeposits
	WHERE DepositGroup = 'Troll Chest'
	GROUP BY SUBSTRING(FirstName, 1, 1)
	ORDER BY FirstLetter ASC

-- 11. Average Interest 
SELECT DepositGroup, IsDepositExpired, AVG(DepositInterest) AS AverageInterest
	FROM WizzardDeposits
	WHERE DepositStartDate > '01/01/1985'
	GROUP BY DepositGroup, IsDepositExpired
	ORDER BY DepositGroup DESC, IsDepositExpired ASC

-- 12. Rich Wizard, Poor Wizard
SELECT SUM(DepositDifference) AS SumDifference
	FROM (SELECT DepositAmount - (LEAD(DepositAmount) OVER (ORDER BY Id)) AS DepositDifference
			FROM WizzardDeposits) AS DepositDifferenceQuery
