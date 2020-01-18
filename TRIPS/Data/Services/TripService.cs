using System;
using System.Linq;
using System.Collections.Generic;

namespace Trips.Data{

    public class TripService : ITripService
    {

        private ITripRepository _repository;

        public TripService(ITripRepository repository)
        {
            _repository = repository;
        }

        public void AddTrip(Trip trip)
        {
            // Data.Trips.Add(trip);
            _repository.AddTrip(trip);
        }

        public void DeleteTrip(int tripId)
        {
            // var trip = Data.Trips.FirstOrDefault(t => t.Id == tripId);
            // if(trip != null){
            //     Data.Trips.Remove(trip);
            // }
            var trip = _repository.GetTripById(tripId);
            if(trip != null) {
                _repository.DeleteTrip(tripId);
            }
        }

        // public List<Trip> GetAllTrips() => Data.Trips.ToList();
        public List<Trip> GetAllTrips() {
            return _repository.GetAllTrips();
        }

        // public Trip GetTripById(int tripId) => Data.Trips.FirstOrDefault(t => t.Id == tripId);
        public Trip GetTripById(int tripId) {
            return _repository.GetTripById(tripId);
        }
        

        public void UpdateTrip(int tripId, Trip trip)
        {
            // var oldTrips = Data.Trips.FirstOrDefault(t => t.Id == tripId);
            // if(oldTrips != null){
            //     oldTrips.Name = trip.Name;
            //     oldTrips.Description = trip.Description;
            //     oldTrips.DateStarted = trip.DateStarted;
            //     oldTrips.DateCompleted = trip.DateCompleted;
            // }
            _repository.UpdateTrip(tripId,trip);
        }

        public List<string> GetImageUrlsById(int id)
        {
            return _repository.GetAllTripImageUrls(id);
        }

        public void AddTripImageUrl(int tripId, string tripImageUrl)
        {
            _repository.AddTripImageUrl(tripId, tripImageUrl);
        }
    }
}