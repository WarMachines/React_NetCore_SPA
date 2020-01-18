import React, { Component } from 'react';

export class ImageUpload extends Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.props.triggerFileUploadHandler} multiple="multiple"></input>
            </div>
        );
    }

}