import React, {Component} from 'react';
import axios from 'axios';

export class Delete extends Component{
    constructor(props){
        super(props);

        this.cancelDelete = this.cancelDelete.bind(this);
        this.onConfimation = this.onConfimation.bind(this);

        this.state = {
            name: '',
            description: ''
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
                description: response.description
            })
        })
    }

    cancelDelete(){
        const {history} = this.props;
        history.push('/trips');
    }

    onConfimation(e){
        const {id} = this.props.match.params;
        const {history} = this.props;
        axios.delete('/api/Trips/DeleteTrip/'+id)
        .then(result => {
            history.push('/trips');
        })

    }

    render(){
        return(
            <div>
                <h2>Delete trip information</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.state.name}</h4>
                        <p className= "card-text"> {this.state.description}</p>
                        <button className="btn btn-default" onClick={this.cancelDelete}>Cancel</button>
                        <button className="btn btn-danger" onClick={this.onConfimation}>Confirm</button>
                    </div>
                </div>
            </div>
        )
    }
}