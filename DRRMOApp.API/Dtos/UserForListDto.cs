using System;

namespace DRRMOApp.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Designate { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string PhotoUrl { get; set; }
    }
}