using System.Collections.Generic;
using MongoDB.Driver;

namespace Trips.Data{

    public class TripRepository : ITripRepository
    {
        private readonly IMongoCollection<Trip> _trips;
        private readonly IMongoCollection<TripImageUrls> _tripImageUrls;
        public TripRepository(ITripsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _trips = database.GetCollection<Trip>(settings.TripsCollectionName);
            _tripImageUrls = database.GetCollection<TripImageUrls>(settings.TripsImageUrlsCollectionName);
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

        public void AddTripImageUrl(int tripId, string imageUrl)
        {
            var tripInfo = _tripImageUrls.Find<TripImageUrls>(t => t.Id == tripId).FirstOrDefault();
            if(tripInfo != null){
                tripInfo.ImageUrls.Add(imageUrl);
                _tripImageUrls.ReplaceOne(t => t.Id == tripId, tripInfo);
            }
            else {
                tripInfo = new TripImageUrls(){
                    Id = tripId,
                    ImageUrls = new List<string>(){
                        imageUrl
                    }
                };
                _tripImageUrls.InsertOne(tripInfo);
            }

        }

        public List<string> GetAllTripImageUrls(int tripId)
        {
            var tripInfo = _tripImageUrls.Find<TripImageUrls>(t => t.Id == tripId).FirstOrDefault();
            if(tripInfo != null){
                return tripInfo.ImageUrls;
            }
            return new List<string>();
        }
    }

}