using System.Linq;
using System.Collections.Generic;

namespace Trips.Data{

    public class TripService : ITripService
    {
        public void AddTrip(Trip trip)
        {
            Data.Trips.Add(trip);
        }

        public void DeleteTrip(int tripId)
        {
            var trip = Data.Trips.FirstOrDefault(t => t.Id == tripId);
            if(trip != null){
                Data.Trips.Remove(trip);
            }
        }

        public List<Trip> GetAllTrips() => Data.Trips.ToList();
        
        public Trip GetTripById(int tripId) => Data.Trips.FirstOrDefault(t => t.Id == tripId);
        

        public void UpdateTrip(int tripId, Trip trip)
        {
            var oldTrips = Data.Trips.FirstOrDefault(t => t.Id == tripId);
            if(oldTrips != null){
                oldTrips.Name = trip.Name;
                oldTrips.Description = trip.Description;
                oldTrips.DateStarted = trip.DateStarted;
                oldTrips.DateCompleted = trip.DateCompleted;
            }
        }
    }
}