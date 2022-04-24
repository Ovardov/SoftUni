-- Geography DB
USE Geography
GO

-- 12. Highest Peaks in Bulgaria
SELECT ms.CountryCode, m.MountainRange, p.PeakName, p.Elevation
	FROM MountainsCountries as ms
	JOIN Mountains AS m ON ms.MountainId = m.Id
	JOIN Peaks AS p ON m.Id = p.MountainId
	WHERE Elevation > 2835 AND ms.CountryCode = 'BG'
	ORDER BY Elevation DESC

-- 13. Count Mountain Ranges
SELECT CountryCode, COUNT(MountainId) AS MountainRanges
	FROM MountainsCountries
	WHERE CountryCode IN ('US', 'RU', 'BG')
	GROUP BY CountryCode

-- 14. Countries with Rivers
SELECT TOP(5) c.CountryName, r.RiverName
	FROM Countries AS c
	LEFT JOIN CountriesRivers AS cr ON c.CountryCode = cr.CountryCode
	LEFT JOIN Rivers AS r ON cr.RiverId = r.Id
	WHERE c.ContinentCode = 'AF'
	ORDER BY c.CountryName ASC

-- 15. Continents and Currencies
SELECT ContinentCode, CurrencyCode, CurrencyUsage
	FROM (SELECT *,	
			     DENSE_RANK() OVER (PARTITION BY ContinentCode ORDER BY CurrencyUsage DESC) AS [CurrencyUsageRank]
			FROM (SELECT ContinentCode, CurrencyCode, COUNT(*) AS CurrencyUsage
					FROM Countries
					GROUP BY ContinentCode, CurrencyCode
				 ) AS Query
		    WHERE CurrencyUsage > 1
		  ) AS RankingQuery
	WHERE CurrencyUsageRank = 1
	ORDER BY ContinentCode ASC

-- 16. Countries Without Any Mountains
SELECT COUNT(*) AS [Count]
	FROM Countries AS c
	LEFT JOIN MountainsCountries AS ms ON c.CountryCode = ms.CountryCode
	WHERE MountainId IS NULL

-- 17. Highest Peak and Longest River by Country
SELECT TOP(5) CountryName, 
	   MAX(p.Elevation) as HighestPeakElevation ,
       MAX(r.[Length]) as LongestRiverLength 
	FROM Countries AS c
	LEFT JOIN MountainsCountries AS ms ON c.CountryCode = ms.CountryCode
	LEFT JOIN Peaks AS p ON ms.MountainId = p.MountainId
	LEFT JOIN CountriesRivers AS cr ON c.CountryCode = cr.CountryCode
	LEFT JOIN Rivers AS r ON cr.RiverId = r.Id
	GROUP BY c.CountryName
	ORDER BY HighestPeakElevation DESC, LongestRiverLength DESC, c.CountryName ASC

-- 18. Highest Peak Name and Elevation by Country
SELECT TOP(5) CountryName,
	   ISNULL(PeakName, '(no highest peak)') AS [HighestPeakName],
	   ISNULL(Elevation, 0) AS [HighestPeakElevation],
	   ISNULL(MountainRange, '(no mountain)') AS [Mountain]
	FROM (SELECT *,
				 DENSE_RANK() OVER (PARTITION BY CountryName ORDER BY Elevation DESC) AS [PeakRank]
			FROM (SELECT c.CountryName, p.PeakName, p.Elevation, m.MountainRange
					FROM Countries AS c
					LEFT JOIN MountainsCountries AS mc ON c.CountryCode = mc.CountryCode
					LEFT JOIN Mountains AS m ON mc.MountainId = m.Id
					LEFT JOIN Peaks AS p ON mc.MountainId = p.MountainId
					) AS query
		  ) AS [RankingsQuery]
	WHERE PeakRank = 1
	ORDER BY CountryName ASC, HighestPeakName ASC