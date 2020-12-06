import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { search, order, orderBy, plot } from '../services/moviesService';
import { FaSearch } from 'react-icons/fa';
import { addNotification } from '../services/notificationsService';
import { 
    updateQueryAction, updateResultsAction, updateStatusAction,
    updateCurrentPageAction, updateNumPagesAction
} from '../actions/actions';
import { 
    Navbar as BNavbar, Form, FormControl, Button, Spinner, Modal
} from 'react-bootstrap';

const initSettings = {
    orderBy: orderBy.year,
    order: order.desc,
    plot: plot.short
}
 
const Navbar = (props) => {

    const [show, setShow] = useState(false);
    
    let storedSettings = localStorage.getItem("settings");
    storedSettings = storedSettings !== null ? JSON.parse(storedSettings) : null
    const [settings, setSettings] = useState(storedSettings ? storedSettings : initSettings);
    
    if(!storedSettings){
        localStorage.setItem("settings", JSON.stringify(initSettings));
    }

    const makeSearch = async (e, query=props.query, params={}) => {
        if(e){
            e.preventDefault();
        }
        props.updateStatus(true);
        try {
            const page = params.page || 1
            const results = await search(query, page);
            setTimeout(()=>{
                if(results.Response === "False"){
                    addNotification(results.Error,`No movie found for "${query}"`, "danger");
                } else {
                    props.updateResults(results);
                    props.updateCurrentPage(page);
                }
            })
        } catch(err){
            console.log(err);
            addNotification("Error", err.message, "danger")
        }
        
        props.updateStatus(false);
    }

    const handleChange = (e) => {
        props.updateQuery(e.target.value);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const reset = () => {
        setSettings(initSettings);
        localStorage.setItem("settings", JSON.stringify(settings));
        addNotification("Settings saved", "Your settings have been reset!", "success")
        makeSearch(null, props.query);
    }
    
    const saveChanges = () => {
        localStorage.setItem("settings", JSON.stringify(settings));
        addNotification("Settings saved", "Your new settings have been saved!", "success")
        makeSearch(null, props.query, {page: props.currentPage});
    }

    const handleSettingsChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <Fragment>
            <BNavbar bg="dark" variant="dark" fixed="top" >
                <BNavbar.Brand className="mr-auto" href="/">Movies</BNavbar.Brand>
                <Form 
                    style={{display: 'flex'}} 
                    className="mr-auto col-lg-6 col-xs-5 col-sm-6"
                >
                
                    <FormControl 
                        type="text" 
                        placeholder="Movie title" 
                        className="mr-2"
                        value={props.query}
                        onChange={handleChange} 
                    />
                    
                    <Button 
                        variant="primary" 
                        type="submit"
                        className="mr-auto"
                        onClick={makeSearch} 
                        disabled={props.loading || props.query === "" || props.query === null ? true : false}
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
                <Button 
                    onClick={handleShow}
                    variant="primary"
                    size="md">
                        Settings
                </Button>
            </BNavbar>
            <Modal show={show} onHide={handleClose} keyboard={false}>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="orderBy">
                                Plot:
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="float-right"
                                id="plot"
                                name="plot"
                                value={settings.plot}
                                onChange={handleSettingsChange}
                                custom
                            >
                                <option value="0" disabled>Plot</option>
                                <option value={plot.short}>Short</option>
                                <option value={plot.full}>Full</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="orderBy">
                                Order by:
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="float-right"
                                id="orderBy"
                                name="orderBy"
                                value={settings.orderBy}
                                onChange={handleSettingsChange}
                                custom
                            >
                                <option value="0" disabled>Order by</option>
                                <option value={orderBy.title}>Title</option>
                                <option value={orderBy.year}>Year</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="order">
                                Order:
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="float-right"
                                id="order"
                                name="order"
                                custom
                                value={settings.order}
                                onChange={handleSettingsChange}
                            >
                                <option value="0" disabled>Order</option>
                                <option value={order.asc}>Ascending</option>
                                <option value={order.desc}>Descending</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" className="mt-5" onClick={saveChanges}>Save changes</Button>
                        <Button variant="info" className="mt-5 ml-2" onClick={reset}>Reset Default</Button>
                        <Button variant="danger" className="mt-5 ml-2" onClick={handleClose}>Close</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        query: state.query,
        loading: state.loading,
        currentPage: state.currentPage
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
