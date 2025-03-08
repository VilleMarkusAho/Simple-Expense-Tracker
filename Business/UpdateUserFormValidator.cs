using DAL;
using FluentValidation;
using Models;

namespace Business
{
    public class UpdateUserFormValidator : AbstractValidator<UpdateUserForm>
    {
        public UpdateUserFormValidator(IUserRepository userRepository)
        {
            RuleFor(x => x.Username)
                .NotEmpty()
                .NotNull()
                .WithMessage("Username is required")
                .MaximumLength(20)
                .WithMessage("Username cannot be longer than 20 characters");
            RuleFor(x => x.Username)
                .MustAsync(async (username, cancellationToken) =>
                {
                    return await userRepository.GetUserAsync(username ?? "") == null;
                })
                .WithMessage("Username already exists")
                .When(x => string.IsNullOrWhiteSpace(x.Username) == false && x.Username.Length <= 20); // Only validate if username is provided and is less than or equal to 20 characters
            RuleFor(x => x.FirstName)
                .NotNull()
                .WithMessage("First name cannot be null")
                .MaximumLength(30)
                .WithMessage("First name cannot be longer than 30 characters");
            RuleFor(x => x.LastName)
                .NotNull()
                .WithMessage("Last name cannot be null")
                .MaximumLength(30)
                .WithMessage("Last name cannot be longer than 30 characters");
            RuleFor(x => x.Password)
                .MaximumLength(36)
                .WithMessage("Password cannot be longer than 30 characters");
            RuleFor(x => x.ConfirmPassword).Equal(x => x.Password)
                .WithMessage("Passwords do not match")
                .When(x => string.IsNullOrWhiteSpace(x.Password) == false); // Only validate if password is provided
        }
    }
}
