import React, { Component } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import Default_Vienna from '../../Static_Content/Default_Vienna.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";


export class Trip extends Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            imageUrls : [],
            tripInfo : null,
            index: 0,
            direction: null,
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        axios.get('api/Trips/SingleTrip/'+id).then(result => {
            const response = result.data;
            // console.log(response);
            this.setState({
                tripInfo: response
            });
        });

        axios.get('api/Trips/GetImageUrls/'+id).then(result => {
            const response = result.data;
            this.setState({
                imageUrls: response
            });
        });
    }

    handleSelect(selectedIndex, e) {
        this.setState({index: selectedIndex, direction: e.direction});
    }

    render() {
        return (
            this.state.tripInfo == null ? (
                <div></div>
            ) :
            (
                <div>
                    <div style={{backgroundColor: 'grey'}}>
                        <Carousel showThumbs={false}
                            showStatus={false}
                            useKeyboardArrows
                            className="presentation-mode">
                            {
                                this.state.imageUrls.map( url => (
                                    <div key ={url}>
                                        <img style ={{maxHeight: '800px', maxWidth: '1200px', width:'auto', height:'auto'}}
                                        src={url}
                                        />
                                        <p className="legend">{this.state.tripInfo.name}</p>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                    <div className='card'>
                        <div className="card-body">
                            {this.state.tripInfo.description}
                        </div>
                    </div>
                </div>
        ));
    }

}