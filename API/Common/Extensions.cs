using System.Collections.Generic;
using FluentValidation;


namespace API.Common
{
    public static class Extensions
    {

        public static bool Validate<T>(this IValidator<T> validator, T entity, out List<string> errors)
        {
            errors = [];    
            var result = validator.Validate(entity);

            if (!result.IsValid)
            {
                                
            }

            return result.IsValid;
        }
    }
}
