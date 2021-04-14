using System;
using System.ComponentModel.DataAnnotations;

namespace DRRMOApp.API.Dtos
{
    public class UserForUpdateDto
    {
        private string firstName;
        [Required(ErrorMessage = "First name field is required")]
        public string FirstName
        {
            get { return firstName; }
            set { firstName = value.ToLower(); }
        }
        
        private string lastName;
        [Required(ErrorMessage = "Last name field is required")]
        public string LastName
        {
            get { return lastName; }
            set { lastName = value.ToLower(); }
        }

        [Required(ErrorMessage = "Date of birth field is required")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Phone number field is required")]
        public string PhoneNumber { get; set; }

        private string email;
        [Required]
        [EmailAddress]
        public string Email
        {
            get { return email; }
            set { email = value.ToLower(); }
        }

        private string designate;
        [Required]
        public string Designate
        {
            get { return designate; }
            set { designate = value.ToLower(); }
        }
        
        private string gender;
        [Required]
        public string Gender
        {
            get { return gender; }
            set { gender = value.ToLower(); }
        }

        private string sitio;
        public string Sitio
        {
            get { return sitio; }
            set { sitio = value.ToLower(); }
        }
        
        private string barangay;
        public string Barangay
        {
            get { return barangay; }
            set { barangay = value.ToLower(); }
        }
        
        private string city;
        public string City
        {
            get { return city; }
            set { city = value.ToLower(); }
        }
        
        private string country;
        public string Country
        {
            get { return country; }
            set { country = value.ToLower(); }
        }
        
        private string skills;
        public string Skills
        {
            get { return skills; }
            set { skills = value.ToLower(); }
        }
        
        private string certificates;
        public string Certificates
        {
            get { return certificates; }
            set { certificates = value.ToLower(); }
        }
        
    }
}