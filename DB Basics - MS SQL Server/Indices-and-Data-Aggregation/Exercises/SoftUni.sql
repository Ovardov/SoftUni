-- SoftUni DB
USE SoftUni
GO

-- 13. Departments Total Salaries
SELECT DepartmentID, SUM(Salary) AS TotalSalary
	FROM Employees
	GROUP BY DepartmentID
	ORDER BY DepartmentID ASC

-- 14. Employees Minimum Salaries
SELECT DepartmentID, MIN(Salary) AS MinimumSalary
	FROM Employees
	WHERE HireDate > '01/01/2000' AND DepartmentID IN (2, 5, 7)
	GROUP BY DepartmentID

-- 15. Employees Average Salaries
DROP TABLE IF EXISTS tempdb.dbo.#temp

SELECT *
	INTO #temp
	FROM Employees
	WHERE Salary > 30000

DELETE 
	FROM #temp
	WHERE ManagerID = 42

UPDATE #temp
	SET Salary += 5000
	WHERE DepartmentID = 1

SELECT DepartmentID, AVG(Salary) AS AverageSalary
	FROM #temp
	GROUP BY DepartmentID

-- 16. Employees Maximum Salaries
SELECT DepartmentID, MAX(Salary) AS MaxSalary
	FROM Employees
	GROUP BY DepartmentID
	HAVING MAX(Salary) NOT BETWEEN 30000 AND 70000

-- 17. Employees Count Salaries
SELECT COUNT(*) AS [Count]
	FROM Employees
	WHERE ManagerID IS NULL

-- 18. 3rd Highest Salary
SELECT DepartmentID, Salary AS ThirdHighestSalary
	FROM (SELECT DepartmentID,
				 Salary,
				 DENSE_RANK() OVER (
					PARTITION BY DepartmentID 
					ORDER BY Salary DESC
				 ) AS RowNumber
			FROM Employees
		  ) AS RowNumberQuery
	WHERE RowNumber = 3
	GROUP BY DepartmentID, Salary
	ORDER BY DepartmentID ASC

-- 19. Salary Challenge
SELECT TOP(10) e.FirstName, e.LastName, e.DepartmentID
	FROM Employees AS e
	WHERE Salary > (SELECT AVG(Salary) AS AverageSalary
						FROM Employees AS es
						WHERE es.DepartmentID = e.DepartmentID
						GROUP BY es.DepartmentID
				   )
	ORDER BY e.DepartmentID ASC