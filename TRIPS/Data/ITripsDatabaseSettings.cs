namespace Trips.Data {

    public interface ITripsDatabaseSettings {
        string TripsCollectionName { get; set; }
        string TripsImageUrlsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

}