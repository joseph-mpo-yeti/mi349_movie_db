import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import MovieCard from './MovieCard';

const SearchResults = ({results}) => {
    return (
        <div id="search-results">
           {
               results ? results.map(movie => (
                   <MovieCard
                        key={`${movie.Title}-${movie.Year}`}
                        Title={movie.Title}
                        Poster={movie.Poster}
                        Year={movie.Year}
                    />
               )) : (<Jumbotron>
                        <h1>Hello, world!</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                    </Jumbotron>)
           } 

        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        results: state.root.results.Search
    }
}

export default connect(mapStateToProps)(SearchResults);
