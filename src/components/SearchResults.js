import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import MovieCard from './MovieCard';
import Pagination from "react-js-pagination";
import { 
    updateQueryAction, updateResultsAction, updateStatusAction,
    updateCurrentPageAction, updateNumPagesAction
} from '../actions/actions';
import { search } from '../services/moviesService';

const SearchResults = ({
    results, numberOfPages, currentPage, totalResults, query,
    updateCurrentPage, updateNumPages, updateStatus, updateResults
}) => {
    
    const handlePageChange = async (pageNumber) => {
        updateStatus(true);
        
        let res = await search(query, {page: pageNumber})
        
        updateResults(res);
        updateCurrentPage(pageNumber);
        updateStatus(false);
    }

    return (
        <div>
            <div id="search-results">
                {
                    results.length > 0 ? results.map((movie, index) => (
                        <MovieCard
                                key={movie.imdbID}
                                Title={movie.Title}
                                Poster={movie.Poster}
                                Year={movie.Year}
                                imdbID={movie.imdbID}
                            />
                    )) : (<Jumbotron>
                                <h1>Movies</h1>
                                <p>
                                    Find movies and series by entering their title. You can also 
                                    change the default settings to reorder the results.
                                </p>
                            </Jumbotron>)
                } 
           </div>
           {
               totalResults > 0 &&
                <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={10}
                        totalItemsCount={totalResults}
                        pageRangeDisplayed={5}
                        itemClass="page-item"
                        linkClass="page-link"
                        onChange={handlePageChange}
                    />
           }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuery: (query) => dispatch(updateQueryAction(query)),
        updateResults: (results) => dispatch(updateResultsAction(results)),
        updateStatus: (loading) => dispatch(updateStatusAction(loading)),
        updateNumPages: (totalPages) => dispatch(updateNumPagesAction(totalPages)),
        updateCurrentPage: (currentPage) => dispatch(updateCurrentPageAction(currentPage))
    }
}


const mapStateToProps = (state) => {
    const countRes = parseInt(state.results.totalResults)
    const countPages = Math.ceil(countRes/10);
    return {
        query: state.query,
        totalResults: countRes,
        totalPages: countPages,
        currentPage: state.currentPage,
        results: state.results.Search ? state.results.Search : []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
