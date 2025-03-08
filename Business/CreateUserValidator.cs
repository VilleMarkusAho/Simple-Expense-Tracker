﻿using DAL;
using FluentValidation;
using Models;

namespace Business
{
    public class CreateUserValidator : AbstractValidator<CreateUserForm>
    {
        
        public CreateUserValidator(IUserRepository userRepository)
        {
            RuleFor(x => x.Username)
                .NotEmpty()
                .NotNull()
                .WithMessage("Username is required")
                .MaximumLength(20).WithMessage("Username cannot be longer than 20 characters")
                .MustAsync(async (username, cancellationToken) =>
                {
                    return await userRepository.GetUserAsync(username) == null;
                })
                .WithMessage("Username already exists");
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
                .NotNull()
                .NotEmpty()
                .WithMessage("Password is required")
                .MaximumLength(36)
                .WithMessage("Password cannot be longer than 30 characters");
            RuleFor(x => x.ConfirmPassword).Equal(x => x.Password)
                .WithMessage("Passwords do not match");
        }
    }
}
