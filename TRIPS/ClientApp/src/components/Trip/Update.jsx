import React, { Component} from 'react';
import axios from 'axios';
import { ImageUpload } from './ImageUpload';
import { storage } from '../../firebase';
import { Progress } from 'reactstrap';

export class Update extends Component{
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateCompleted = this.onChangeDateCompleted.bind(this);
        this.updateTripInformation = this.updateTripInformation.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);

        this.state = {
            name: '',
            description: '',
            dateStarted: null,
            dateCompleted: null,
            imageFile: null
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.LoadTripInformation(id);
    }

    LoadTripInformation(id){
        axios.get('/api/Trips/SingleTrip/'+id)
        .then(result => {
            const response = result.data;
            this.setState({
                name: response.name,
                description: response.description,
                dateStarted: new Date(response.dateStarted).toISOString().slice(0,10),
                dateCompleted: response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0,10) : null
            })
        })
    }

    cancelUpdate(){
        const {history} = this.props;
        history.push('/trips')
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

    fileUploadHandler = (event) => {
        console.log(event.target.files);
        this.setState({
            imageFile: event.target.files[0]
        })
    }

    updateTripInformation(e) {
        e.preventDefault();
        const {history} = this.props;
        const {id} = this.props.match.params;
        const downLoadUrl = null;
        if(this.state.imageFile != null){
            let image = this.state.imageFile;
            const uploadTask = storage.ref(`images/${id}/${image.name}`).put(image);
            uploadTask.on('state_changed',
            (snapshot) => {

            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref(`images/${id}`).child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    let obj = {
                        ImageUrls: [url],
                        Id: id
                    }
                    axios.put('api/Trips/AddImageUrl/'+id, obj)
                    .then(result => {
                        console.log("Url Successfully saved");
                    });

                });
            });
        }

        let trip = {
            Name: this.state.name,
            Description: this.state.description,
            DateStarted: this.state.dateStarted,
            DateCompleted: this.state.dateCompleted
        }

        axios.put('api/Trips/UpdateTrip/'+id, trip)
        .then(result => {
            history.push('/trips');
        });

    }

    render() {
        return (
            <div className="trip-form">
                <h3>Add new trip</h3>
                <form onSubmit={this.updateTripInformation}>
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
                    <div className="row">
                        <div className="col col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <ImageUpload triggerFileUploadHandler = {this.fileUploadHandler}></ImageUpload>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input onClick={this.cancelUpdate} className="btn btn-default" value="Cancel"></input>
                        <input type="submit" className="btn btn-success" value="Update"></input>
                    </div>
                </form>
            </div>

        )

    }

    


}