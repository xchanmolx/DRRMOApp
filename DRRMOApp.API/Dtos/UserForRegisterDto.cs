using System;
using System.ComponentModel.DataAnnotations;

namespace DRRMOApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 10 characters")]
        public string Password { get; set; }

        private string firstName;
        [Required]
        public string FirstName
        {
            get { return firstName; }
            set { firstName = value.ToLower(); }
        }

        private string lastName;
        [Required]
        public string LastName
        {
            get { return lastName; }
            set { lastName = value.ToLower(); }
        }

        private string designate;
        [Required]
        public string Designate
        {
            get { return designate; }
            set { designate = value.ToLower(); }
        }

        [Required]
        public string PhoneNumber { get; set; }

        private string email;
        [Required]
        [EmailAddress]
        public string Email
        {
            get { return email; }
            set { email = value.ToLower(); }
        }

        private string gender;
        [Required]
        public string Gender
        {
            get { return gender; }
            set { gender = value.ToLower(); }
        }

        private string population;
        public string Population
        {
            get { return population; }
            set { population = value.ToLower(); }
        }
        
        [Required]
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
            Population = "all";
        }
    }
}