import React from 'react';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        }
    }
    
    render(){
        return (
            <div>
                {this.props.data.results}
            </div>
        )

    }
};

export default SearchResults;