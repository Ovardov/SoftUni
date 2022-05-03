using System;

namespace HotelReservation
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            var information = Console.ReadLine().Split(' ');
            var pricePerDay = decimal.Parse(information[0]);
            var numberOfDays = int.Parse(information[1]);
            var season = Enum.Parse<Season>(information[2]);
            var discountType = information.Length == 4 ? Enum.Parse<Discount>(information[3]) : Discount.None;
            
            var price = PriceCalculator.Calculate(pricePerDay, numberOfDays, season, discountType);
            Console.WriteLine(price);
        }
    }
}
