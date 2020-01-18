import React, {Component} from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import {getAllTrips} from '../../actions/tripActions'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import Default_Vienna from '../../Static_Content/Default_Vienna.jpg'


export class Trips extends Component {
    constructor(props){
        super(props);

        this.onTripUpdate = this.onTripUpdate.bind(this);
        this.onTripDelete = this.onTripDelete.bind(this);
        this.onTripReadMore = this.onTripReadMore.bind(this);

        this.state = {
            trips: [],
            loading: true,
            failed: false,
            error: ''
        }
    }

    componentDidMount(){
        //this.populateTripsData();
        this.props.getAllTrips();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.trips.data !== this.props.trips.data) {
            this.setState({
                trips: this.props.trips.data
            });
        }
    }

    // populateTripsData(){
    //     axios.get("/api/Trips/GetTrips").then(result => {
    //         const response = result.data;
    //         this.setState({trips: response, loading: false, failed: false, error:""})
    //     })
    //     .catch( error => {
    //         this.setState({trips: [], loading: false, failed: true, error: "Trips could not be loaded"})
    //     })
    // }

    onTripUpdate(id){
        const {history} = this.props;
        history.push('/update/'+id)
    }

    onTripDelete(id){
        const {history} = this.props;
        history.push('/delete/'+id)
    }

    onTripReadMore(id){
        const {history} = this.props;
        history.push('/trip/'+id)
    }

    renderAllTripsTable(trips){
        return (
            <div className="row">
            {
                trips.map(trip => (
                    <div key ={trip.id} className="col-sm-4 mb-4">
                        <Card style={{ width: '23rem' }}>
                            <Card.Img variant="top" src={Default_Vienna} />
                            <Card.Body>
                                <Card.Title>
                                    {trip.name}
                                </Card.Title>
                                <p className="card-text small"><label className="mr-1">{new Date(trip.dateStarted).toISOString().slice(0,10)} </label> <label> to  {trip.dateCompleted ? new Date(trip.dateCompleted).toISOString().slice(0,10) : '..'}</label></p>
                                <Card.Text>
                                    {trip.description.slice(0,80)}...
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <ButtonGroup aria-label="Basic example">
                                    <button onClick= {() => this.onTripReadMore(trip.id)} type="button" className="btn btn-success">Read More..</button>
                                    <button onClick= {() => this.onTripUpdate(trip.id)} type="button" className="btn btn-success">Update</button>
                                    <button onClick= {() => this.onTripDelete(trip.id)} type="button" className="btn btn-danger">Delete</button>
                                </ButtonGroup>
                            </Card.Footer>
                        </Card>
                    </div>
                ))
            }
            </div>
        );
    }

    render() {
        let content = this.props.trips.loading ? (
            <p>
                 <em>
                     Loading.....
                 </em>
             </p>
        ) :
        (
            this.state.trips.length && this.renderAllTripsTable(this.state.trips)
        );

        return (
            <div>
                <h1>All trips</h1>
                <p>Here you can see all trips</p>
                {content}
            </div>
        );
    }
}


const mapStateToProps = ({trips}) => ({
    trips
});

export default connect(mapStateToProps, {getAllTrips})(Trips);

