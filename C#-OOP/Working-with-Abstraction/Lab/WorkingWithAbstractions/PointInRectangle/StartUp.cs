using System;
using System.Linq;

namespace PointInRectangle
{
    class StartUp
    {
        static void Main(string[] args)
        {
            var rectangleCoordinates = Console.ReadLine()
                    .Split(" ")
                    .Select(coordinate => int.Parse(coordinate))
                    .ToArray();

            var topLeftX = rectangleCoordinates[0];
            var topLeftY = rectangleCoordinates[1];
            var bottomRightX = rectangleCoordinates[2];
            var bottomRightY = rectangleCoordinates[3];

            var topLeftPoint = new Point(topLeftX, topLeftY);
            var bottomRightPoint = new Point(bottomRightX, bottomRightY);
            var rectangle = new Rectangle(topLeftPoint, bottomRightPoint);

            var coordinatesOfPointsLenght = int.Parse(Console.ReadLine());

            for(int i = 0; i < coordinatesOfPointsLenght; i++)
            {
                var points = Console.ReadLine()
                        .Split(" ")
                        .Select(coordinate => int.Parse(coordinate))
                        .ToArray();

                var x = points[0];
                var y = points[1];

                var currentPoint = new Point(x, y);
                var isInRectangle = rectangle.Contains(currentPoint);
                Console.WriteLine(isInRectangle);
            }
        }
    }
}
