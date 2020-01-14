using System.Collections.Generic;
using MongoDB.Driver;

namespace Trips.Data{

    public class TripRepository : ITripRepository
    {
        private readonly IMongoCollection<Trip> _trips;
        public TripRepository(ITripsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _trips = database.GetCollection<Trip>(settings.TripsCollectionName);
        }

        public void AddTrip(Trip trip)
        {
            _trips.InsertOne(trip);
        }

        public void DeleteTrip(int tripId)
        {
            _trips.DeleteOne(trip => trip.Id == tripId);
        }

        public List<Trip> GetAllTrips()
        {
            return _trips.Find(trip => true).ToList();
        }

        public Trip GetTripById(int tripId)
        {
            return _trips.Find<Trip>(trip => trip.Id == tripId).FirstOrDefault();
        }

        public void UpdateTrip(int tripId, Trip trip)
        {
            trip.Id = tripId;
            _trips.ReplaceOne(t => t.Id == tripId, trip);
        }
    }

}