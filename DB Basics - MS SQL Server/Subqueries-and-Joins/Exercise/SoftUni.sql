USE SoftUni
GO

-- 1. Employee Address
SELECT TOP(5) e.EmployeeID, e.JobTitle, e.AddressID, a.AddressText
	FROM Employees AS e
	JOIN Addresses AS a ON e.AddressID = a.AddressID
	ORDER BY e.AddressID ASC

-- 2. Addresses with Towns
SELECT TOP(50) e.FirstName, e.LastName, t.[Name] AS Town, a.AddressText
	FROM Employees AS e
	JOIN Addresses AS a ON e.AddressID = a.AddressID
	JOIN Towns AS t ON a.TownID = t.TownID
	ORDER BY e.FirstName ASC, e.LastName ASC

-- 3. Sales Employee
SELECT e.EmployeeID, e.FirstName, e.LastName, d.[Name] AS DepartmentName
	FROM Employees AS e
	JOIN Departments AS d ON e.DepartmentID = d.DepartmentID
	WHERE d.[Name] = 'Sales'
	ORDER BY e.EmployeeID ASC

-- 4. Employee Departments
SELECT TOP(5) e.EmployeeID, e.FirstName, e.Salary, d.[Name] AS DepartmentName 
	FROM Employees AS e
	JOIN Departments AS d ON e.DepartmentID = d.DepartmentID
	WHERE e.Salary > 15000
	ORDER BY d.DepartmentID ASC

-- 5. Employees Without Project
SELECT TOP(3) e.EmployeeID, e.FirstName
	FROM Employees AS e
	LEFT JOIN EmployeesProjects AS ep ON e.EmployeeID = ep.EmployeeID
	WHERE ep.ProjectID IS NULL
	ORDER BY e.EmployeeID ASC

-- 6. Employees Hired After
SELECT e.FirstName, e.LastName, e.HireDate, d.[Name] AS DeptName
	FROM Employees e
	JOIN Departments AS d ON e.DepartmentID = d.DepartmentID
	WHERE e.HireDate > '1999-01-01'
		AND d.[Name] IN ('Sales', 'Finance')
	ORDER BY e.HireDate ASC

-- 7. Employees with Project
SELECT TOP(5) ep.EmployeeID, e.FirstName, p.[Name] AS ProjectName
	FROM EmployeesProjects AS ep
	JOIN Employees AS e ON ep.EmployeeID = e.EmployeeID
	JOIN Projects AS p ON ep.ProjectID = p.ProjectID
	WHERE p.StartDate > '2002-08-13' AND p.EndDate IS NULL
	ORDER BY ep.EmployeeID

-- 8. Employee 24
SELECT ep.EmployeeID, 
	   e.FirstName,
	   (CASE
			WHEN YEAR(p.StartDate) >= 2005 THEN NULL
			ELSE p.[Name]
       END) AS ProjectName
	FROM EmployeesProjects AS ep
	JOIN Employees AS e ON ep.EmployeeID = e.EmployeeID
	JOIN Projects AS p ON ep.ProjectID = p.ProjectID
	WHERE ep.EmployeeID = 24 

-- 9. Employee Manager
SELECT e.EmployeeID, e.FirstName, e.ManagerID, m.FirstName AS ManagerName
	FROM Employees AS e
	JOIN Employees AS m ON e.ManagerID = m.EmployeeID
	WHERE e.ManagerID IN (3, 7)
	ORDER BY e.EmployeeID ASC

-- 10. Employee Summary
SELECT TOP(50) e.EmployeeID,
       CONCAT(e.FirstName, ' ', e.LastName) AS EmployeeName, 
   	   CONCAT(m.FirstName, ' ', m.LastName) AS ManagerName,
	   d.[Name] AS DepartmentName
	FROM Employees AS e
	LEFT JOIN Employees AS m ON e.ManagerID = m.EmployeeID
	LEFT JOIN Departments AS d ON e.DepartmentID  = d.DepartmentID
	ORDER BY e.EmployeeID ASC

-- 11. Min Average Salary
SELECT MIN(AverageSalary) AS MinAverageSalary
	FROM (SELECT AVG(e.Salary) AS AverageSalary
			FROM Employees AS e
			GROUP BY e.DepartmentID
		 ) AS AverageSalary


