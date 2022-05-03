using System;
using System.Text;

namespace RhombusOfStars
{
    class StartUp
    {
        static void PrintRow(int countOfStars, int rhombusSize)
        {
            var countOfEmptyCharacters = rhombusSize - countOfStars;
            var rows = new StringBuilder(rhombusSize)
                .Insert(0, " ", countOfEmptyCharacters)
                .Insert(countOfEmptyCharacters, "* ", countOfStars)
                .ToString();

            Console.WriteLine(rows);
        }

        public static void PrintStars(int rhombusSize)
        {
            for (int i = 1; i <= rhombusSize; i++)
            {
                PrintRow(i, rhombusSize);
            }

            for (int i = rhombusSize - 1; i >= 1; i--)
            {
                PrintRow(i, rhombusSize);
            }
        }

        static void Main(string[] args)
        {
            var rhombusSize = int.Parse(Console.ReadLine());
            PrintStars(rhombusSize);
        }
    }
}
