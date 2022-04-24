-- Geography DB
USE Geography
GO

-- 12. Countries Holding ‘A’ 3 or More Times
SELECT CountryName, IsoCode
	FROM Countries
	WHERE CountryName LIKE '%A%A%A%'
	ORDER BY IsoCode

-- 13. Mix of Peak and River Names
SELECT PeakName,
	   RiverName,
	   LOWER(CONCAT(PeakName, SUBSTRING(RiverName, 2, LEN(RiverName) - 1))) AS Mix
	FROM Peaks, Rivers
	WHERE RIGHT(PeakName, 1) = LEFT(RiverName, 1)
	ORDER BY Mix ASC