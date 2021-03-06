using System.Net;
using Microsoft.AspNetCore.Mvc;
using Trips.Data;

namespace Trips.Controllers{

    [Route("api/[controller]")]
    public class TripsController : Controller
    {

        private ITripService _service;
        public TripsController(ITripService tripService)
        {
            _service = tripService;
        }

        [HttpGet("SingleTrip/{id}")]
        public IActionResult GetTripById(int id){
           var trip =  _service.GetTripById(id);
           return Ok(trip);
        }

        [HttpPost("AddTrip")]
        public IActionResult AddTrip([FromBody] Trip trip)
        {
            if(trip != null){
                _service.AddTrip(trip);
            }

            return Ok();
        }

        [HttpGet("[action]")]
        public IActionResult GetTrips(){
            
            var allTrips = _service.GetAllTrips();
            return Ok(allTrips);
        }

        [HttpPut("UpdateTrip/{id}")]
        public IActionResult UpdateTrip(int id, [FromBody] Trip trip)
        {
            _service.UpdateTrip(id,trip);
            return Ok(trip);
        }

        [HttpDelete("DeleteTrip/{id}")]
        public IActionResult DeleteTrip(int id){
            _service.DeleteTrip(id);
            return Ok();
        }

        [HttpGet("GetImageUrls/{id}")]
        public IActionResult GetImageUrls(int id){

            var tripUrls = _service.GetImageUrlsById(id);
            return Ok(tripUrls);
        }

        [HttpPut("AddImageUrl/{id}")]
        public IActionResult AddImageUrl(int id, [FromBody] TripImageUrls tripImageUrl){
            _service.AddTripImageUrl(id, tripImageUrl.ImageUrls[0]);
            return Ok();
        }
    }

}