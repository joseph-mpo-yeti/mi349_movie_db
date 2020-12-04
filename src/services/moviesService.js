require('dotenv/config');

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

/**
 * 
 * @param {String} query 
 * @param {object} params 
 */
export const search = async (query, params={}) => {
    if(query === "" || query === null){
        return Promise.reject(new Error("Search box empty! :("))
    }

    const url = new URL("https://www.omdbapi.com/");
    url.searchParams.set('s', query);
    url.searchParams.set('apikey', apiKey);
    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }
    const results = await fetch(url.toString());

    return results.json()
}

/**
 * 
 * @param {Number} id the movie's imdbID 
 */
export const getMovieData = async (id) => {
    if(id === "" || id === null){
        return Promise.reject(new Error("Invalid id provided!"))
    }
    const url = new URL("https://www.omdbapi.com/");
    url.searchParams.set('t', id);
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('plot', 'short');
    
    const results = await fetch(url.toString());
    console.log(results);

    return results.json()
}