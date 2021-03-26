using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using DRRMOApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DRRMOApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, 
            RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // create some roles
                var roles = new List<Role>
                {
                    new Role { Name = "Member" },
                    new Role { Name = "Moderator" },
                    new Role { Name = "Admin" },
                    new Role { Name = "VIP" }
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    user.Photos.SingleOrDefault().IsApproved = true;
                    userManager.CreateAsync(user, "free232469").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }

                // create admin user
                var adminUser = new User 
                {
                    UserName = "Admin",
                    FirstName = "Chiantine",
                    LastName = "Manigos",
                    Gender = "male",
                    DateOfBirth = new DateTime(1985,06,11),
                    Created = DateTime.Now,
                    LastActive = DateTime.Now,
                    Sitio = "Purok 2",
                    Barangay = "Poblacion",
                    City = "Aloguinsan",
                    Country = "Philippines",
                    Skills = "Computer Programmer, EMS, CHS, Basic ICS, Basic First Aid",
                    Certificates = "NC II EMS, NC II CHS, Basic ICS"
                };

                var result = userManager.CreateAsync(adminUser, "free232469").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator"}).Wait();
                }
            }
        }
    }
}