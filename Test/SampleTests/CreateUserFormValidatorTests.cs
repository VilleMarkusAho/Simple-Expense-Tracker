using DAL;
using Models;
using Business;

namespace Test.SampleTests
{
    public class CreateUserFormValidatorTests
    {
        private CreateUserForm ValidForm => new()
        {
            Username = "testuser",
            FirstName = "FirstName",
            LastName = "LastName",
            Password = "password12",
            ConfirmPassword = "password12"
        };

        private readonly Mock<IUserRepository> UserRepoMock = new();

        private void SetupUniqueUsername(Mock<IUserRepository> userRepoMock)
        {
            userRepoMock
                .Setup(x => x.GetAsync(It.IsAny<string>()))
                .ReturnsAsync((User?)null);
        }

        // TODO: Complete tests

        [Fact]
        public async Task Validate_ReturnsValidResult()
        {
            // Arrange
            var repoMock = UserRepoMock;
            var validator = new CreateUserFormValidator(repoMock.Object);
            
            // Setup
            SetupUniqueUsername(repoMock);

            // Act
            var result = await validator.ValidateAsync(ValidForm);

            // Assert
            Assert.True(result.IsValid);
        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        public async Task Validate_ReturnInvalidResult_WhenUsernameNotProvided(string? username)
        {
            // Arrange
            var repoMock = UserRepoMock;
            var validator = new CreateUserFormValidator(repoMock.Object);

            var form = ValidForm;
            form.Username = username;

            // Setup
            SetupUniqueUsername(repoMock);

            // Act
            var result = await validator.ValidateAsync(form);

            // Assert
            Assert.False(result.IsValid);
        }

        [Fact]
        public async Task Validate_ReturnInvalidResult_WhenUsernameIsTooLong()
        {
            // Arrange
            var repoMock = UserRepoMock;
            var validator = new CreateUserFormValidator(repoMock.Object);

            var form = ValidForm;
            form.Username = "verylongusername12345";

            // Setup
            SetupUniqueUsername(repoMock);

            // Act
            var result = await validator.ValidateAsync(form);

            // Assert
            Assert.False(result.IsValid); 
            Assert.True(form.Username.Length == 21); // Ensure the username is 21 characters long to make the test more robust
        }

        [Fact]
        public async Task Validate_ReturnInvalidResult_WhenUsernameAlreadyExistsForAnotherAccount()
        {
            // Arrange
            var repoMock = UserRepoMock;
            var validator = new CreateUserFormValidator(repoMock.Object);
            var form = ValidForm;

            // Setup
            repoMock
                .Setup(x => x.GetAsync(It.IsAny<string>()))
                .ReturnsAsync(new User());

            // Act
            var result = await validator.ValidateAsync(form);
            
            // Assert
            Assert.False(result.IsValid);
        }
    }
}
