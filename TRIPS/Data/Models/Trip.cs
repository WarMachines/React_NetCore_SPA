using System;
namespace Trips.Data
{
    public class Trip
    {
        public Trip(int id, string name, string description, DateTime dateStarted)
        {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.DateStarted = dateStarted;
        }

        public Trip()
        {
            
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime? DateCompleted { get; set; }
    }
}