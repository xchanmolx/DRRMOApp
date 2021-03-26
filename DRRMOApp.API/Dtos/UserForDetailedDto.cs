using System;
using System.Collections.Generic;

namespace DRRMOApp.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Sitio { get; set; }
        public string Barangay { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Skills { get; set; }
        public string Certificates { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
    }
}