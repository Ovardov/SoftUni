-- Diablo DB
USE Diablo
GO
 
-- 14. Games from 2011 and 2012 year
SELECT TOP(50) [Name], FORMAT([Start], 'yyyy-MM-dd') AS [Start]
	FROM Games
	WHERE YEAR([Start]) IN (2011, 2012)
	ORDER BY [Start] ASC, [Name] ASC

-- 15. User Email Providers
SELECT Username,
       RIGHT(Email, LEN(EMAIL) - CHARINDEX('@', Email)) AS EmailProvider
	FROM Users
	ORDER BY EmailProvider ASC, Username ASC

-- 16. Get Users with IPAdress Like Pattern
SELECT Username, IpAddress
	FROM Users
	WHERE IpAddress LIKE '___.1%.%.___'
	ORDER BY Username ASC

-- 17. Show All Games with Duration and Part of the Day
SELECT [Name] AS Game,
	   CASE
			WHEN DATEPART(HOUR, [Start]) BETWEEN 0 AND  11 THEN 'Morning'
			WHEN DATEPART(HOUR, [Start]) BETWEEN 12 AND 17 THEN 'Afternoon'
			WHEN DATEPART(HOUR, [Start]) BETWEEN 18 AND 24 THEN 'Evening'
		END AS [Part Of The Day],
		CASE
			WHEN Duration BETWEEN 0 AND 3 THEN 'Extra Short'
			WHEN Duration  BETWEEN 4 AND 6 THEN 'Short'
			WHEN Duration > 6 THEN 'Long'
			WHEN Duration IS NULL THEN 'Extra Long'
		END AS Duration
	FROM Games
	ORDER BY [Name] ASC, Duration ASC, [Part Of The Day] ASC
