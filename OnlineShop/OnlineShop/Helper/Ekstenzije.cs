namespace OnlineShop.Helper
{
    public static class Ekstenzije
    {
        public static byte[] ParsirajBase64(this string slikaBse64)
        {
            if (slikaBse64.Contains(','))
            {
                slikaBse64 = slikaBse64.Split(',')[1]; 
            }
            return System.Convert.FromBase64String(slikaBse64);
        }

        public static string ToBase64(this byte[] slikaBajtovi)
        {
            if (slikaBajtovi != null)
                return System.Convert.ToBase64String(slikaBajtovi); 
            else
                return "";
        }
    }
}
