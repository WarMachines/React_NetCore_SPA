import React, { Component} from 'react';
import axios from 'axios';

export class Create extends Component{
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateCompleted = this.onChangeDateCompleted.bind(this);
        this.saveTripInformation = this.saveTripInformation.bind(this);

        this.state = {
            name: '',
            description: '',
            dateStarted: null,
            dateCompleted: null
        }
    }

    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangeDescription(e){
        this.setState({description: e.target.value});
    }

    onChangeDateStarted(e){
        this.setState({dateStarted: e.target.value});
    }

    onChangeDateCompleted(e){
        this.setState({dateCompleted: e.target.value})
    }

    saveTripInformation(e) {
        e.preventDefault();
        const {history} = this.props;
        let trip = {
            Id: Math.floor(Math.random() * 1000),
            Name: this.state.name,
            Description: this.state.description,
            DateStarted: this.state.dateStarted,
            DateCompleted: this.state.dateCompleted
        }

        axios.post('api/Trips/AddTrip', trip)
        .then(result => {
            history.push('/trips');
        })

    }

    render() {
        return (
            <div className="trip-form">
                <h3>Add new trip</h3>
                <form onSubmit={this.saveTripInformation}>
                    <div className="form-group">
                        <label>Trip Name:</label>
                        <input type="text" className="form-control" value = {this.state.name} onChange={this.onChangeName}></input>
                    </div>
                    <div className="form-group">
                        <label>Trip Description:</label>
                        <textarea type="text" className="form-control" value ={this.state.description} onChange = {this.onChangeDescription}></textarea>
                    </div>
                    <div className="row">
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Date of start:</label>
                                <input type="date" className="form-control" value ={this.state.dateStarted} onChange = {this.onChangeDateStarted}></input>
                            </div>
                        </div>
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Date of completion:</label>
                                <input type="date" className="form-control" value={this.state.dateCompleted} onChange = {this.onChangeDateCompleted}></input>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Add trip"></input>
                    </div>
                </form>
            </div>

        )

    }

    


}