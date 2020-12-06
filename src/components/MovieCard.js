import React, { Fragment, useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import bgImg from '../assets/icons8-movie-96.png';
import { searchMovie } from '../services/moviesService';
import { addNotification } from '../services/notificationsService';

const MovieCard = (props) => {
    
    const getplotSetting = () => {
        return JSON.parse(localStorage.getItem("settings")).plot
    }

    const [state, setState] = useState({
        show: false,
        metadata: props,
        updated: false,
        plot: getplotSetting()
    });
    
    const handleClose = ()=>{
        hideModal()
    }

    const handleShow = ()=>{
        if(!state.updated || state.plot !== getplotSetting()){
            searchMovie(state.metadata.imdbID).then( res => {
                setState({
                    updated: true,
                    metadata: res,
                    show: true
                });
            }).catch(e => {
                addNotification("Error", e.message, "danger")
                showModal()
            })
        } else {
            showModal();
        }

    }
    
    const showModal = () => {
        setState({
            ...state,
            show: true
        })
    }
    
    const hideModal = () => {
        setState({
            ...state,
            show: false
        })
    }

    const getValue = (val, defaultValue) => {
        return val !== "N/A" ? val :  "Unknown"
    }

    return (
        <div >
            <Card onClick={handleShow}
                style={{ 
                    backgroundImage: state.metadata.Poster !== "N/A" ? `url(${state.metadata.Poster})` : null,
                    backgroundColor: '#ececec'
                 }} >
                {
                    state.metadata.Poster === "N/A" && 
                    <Fragment>
                        <img src={bgImg} className="movie-icon" alt="movie" />
                        <p className="movie-title">{state.metadata.Title}</p>
                    </Fragment>
                }
            </Card>
            <Modal show={state.show} onHide={handleClose} keyboard={false}>
                <Modal.Header>
                    <h4>{state.metadata.Title}</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="metadata-card"
                        style={{ 
                            backgroundImage: state.metadata.Poster !== "N/A" ? `url(${state.metadata.Poster})` : null,
                        }} >
                        {
                            state.metadata.Poster === "N/A" && 
                                <img src={bgImg} className="movie-icon" alt="movie" />
                        }
                    </div>
                    <p>
                        <strong>Year: </strong>
                        {
                            getValue(state.metadata.Year)
                        }
                    <br />
                        <strong>Language: </strong>
                        {
                            getValue(state.metadata.Language)
                        }
                    <br />
                        <strong>Country: </strong>
                        {
                            getValue(state.metadata.Country)
                        }
                    <br />
                        <strong>Writer: </strong>
                        {
                            getValue(state.metadata.Writer)
                        }
                    <br />
                        <strong>Actors: </strong>
                        {
                            getValue(state.metadata.Actors)
                        }
                    <br />
                        <strong>Plot: </strong>
                       {
                           getValue(state.metadata.Plot)
                       } 
                        
                    </p>
                    <p>
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MovieCard;
