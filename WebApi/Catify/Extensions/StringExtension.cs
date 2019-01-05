namespace Catify.Extensions
{
    using System.Text.RegularExpressions;

    public static class StringExtension
    {
        public static string ReplaceLineWithWhitespace(this string value)
        {
            return Regex.Replace(value, @"\-+", " ");
        }
    }
}
