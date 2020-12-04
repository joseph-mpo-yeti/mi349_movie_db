import React from 'react';
import { connect } from 'react-redux';
import { search } from '../services/moviesService';
import { FaSearch } from 'react-icons/fa';
import { notify } from 'reapop';
import { 
    updateQueryAction, updateResultsAction, updateStatusAction 
} from '../actions/actions';
import { 
    Navbar as BNavbar, Nav, Form, FormControl, Button, Spinner
} from 'react-bootstrap'
 
const Navbar = (props) => {
    
    const makeSearch = async (e, query=props.query) => {
        if(e){
            e.preventDefault();
        }
        props.updateStatus(true);
        try {
            const results = await search(query);
            setTimeout(()=>{
                props.updateResults(results);
            }, 500)
        } catch(err){
            console.log(err);
            props.alert("Error", err.message, "error");
        }
        
        props.updateStatus(false);
    }

    const handleChange = (e) => {
        props.updateQuery(e.target.value);
    }
    
    return (
        
        <BNavbar bg="dark" variant="dark" fixed="top" >
            <BNavbar.Brand href="/">Movies</BNavbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
                <FormControl 
                    type="text" 
                    placeholder="Search" 
                    className="mr-sm-2"
                    value={props.query}
                    onChange={handleChange} 
                />
                <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={makeSearch} 
                    disabled={props.loading ? true : false}
                    >
                    {
                        props.loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <FaSearch
                                aria-hidden="true"
                            />
                    }
                </Button>
            </Form>
        </BNavbar>

    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        query: state.root.query,
        loading: state.root.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        alert: (title, message, status) => dispatch(notify({ 
            title, 
            message, 
            status, 
            position: "bottom-right", 
            dismissible: true, 
            dismissAfter: 3
        })),
        updateQuery: (query) => dispatch(updateQueryAction(query)),
        updateResults: (results) => dispatch(updateResultsAction(results)),
        updateStatus: (loading) => dispatch(updateStatusAction(loading))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
