namespace HotelReservation
{
    public static class PriceCalculator
    {
        public static string Calculate(decimal pricePerDay, int numberOfDays, Season season, Discount discount = Discount.None)
        {
            var price = numberOfDays * pricePerDay * (int)season;
            price -= (int)discount * price / 100;

            return price.ToString("F2");
        }
    }
}
