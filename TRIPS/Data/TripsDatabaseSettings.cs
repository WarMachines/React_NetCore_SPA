namespace Trips.Data
{
    public class TripsDatabaseSettings : ITripsDatabaseSettings
    {
        public string TripsCollectionName { get; set;}
        public string ConnectionString { get; set;}
        public string DatabaseName { get; set;}
    }
}