import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loaders = ({loading}) => {
    return (
        <div>
            <BeatLoader
             css={{
                margin: 'calc(50vh - 35.5px) auto !important',
                display: 'block',
                width: 87
             }}
             size={25}
             color={"#2196f3"}
             loading={loading}/>
        </div>
    );
}

export default Loaders;
