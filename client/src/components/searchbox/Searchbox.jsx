import { Component } from "react";
import "./searchbox.scss"

class SearchBox extends Component {
    render(){
        return(
            <input
                className= {`search-box ${this.props.className} `}
                type= 'search'
                placeholder={ this.props.placeHolder }
                onChange={ this.props.onChangeHandler } // a class function no need to be declared all time optimisation
            /> 
        )
    }
}

export default SearchBox;