using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DRRMOApp.API.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Designate { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Sitio { get; set; }
        public string Barangay { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Skills { get; set; }
        public string Certificates { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<Like> Likers { get; set; }
        public virtual ICollection<Like> Likees { get; set; }
        public virtual ICollection<Message> MessagesSent { get; set; }
        public virtual ICollection<Message> MessagesReceived { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}