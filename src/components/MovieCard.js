import React from 'react';
import { Card } from 'react-bootstrap';

const MovieCard = (props) => {
    return (
        <div >
            <Card style={{ backgroundImage: `url(${props.Poster})` }} />
        </div>
    );
}

export default MovieCard;
