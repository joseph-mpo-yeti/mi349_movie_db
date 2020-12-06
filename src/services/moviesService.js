require('dotenv/config');

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export const orderBy = {
    year: 'year',
    title: 'title',
}

export const order = {
    desc: 'desc',
    asc: 'asc'
}

export const plot = {
    short: 'short',
    full: 'full'
}
/**
 * 
 * @param {String} query 
 * @param {object} params 
 */
export const search = async (query, params={}) => {
    if(query === "" || query === null){
        return Promise.reject(new Error("Your must fill the search box!"))
    }

    let url = new URL("https://www.omdbapi.com/");
    url.searchParams.set('s', query.trim());
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('type', 'movie');
    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }
    let results = await fetch(url.toString());
    results = await results.json();
    
    if(results.Response === "True"){
        results.Search = reorder(results.Search || [])
    }
    
    return results
}

export const searchMovie = async (id) => {
    let url = new URL("https://www.omdbapi.com/");
    url.searchParams.set('i', id);
    url.searchParams.set('plot', (JSON.parse(localStorage.getItem('settings'))).plot)
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('type', 'movie');
  
    let results = await fetch(url.toString());
    results = await results.json();

    return results
}

const reorder = (results) => {
    const settings = JSON.parse(localStorage.getItem("settings"))
    
    if(settings.orderBy === orderBy.year){
        if(settings.order === order.desc){
            return results.sort((a, b)=>parseInt(b.Year)-parseInt(a.Year))
        } else {
            return results.sort((a, b)=>parseInt(a.Year)-parseInt(b.Year))
        }
    } else {
        if(settings.order === order.desc){
            return results.sort((a, b)=>b.Title-a.Title)
        } else {
            return results.sort((a, b)=>a.Title-b.Title)
        }
    }
}