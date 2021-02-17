import  axios  from "axios";

// Constants

const dataInicial = {
    count  : 0,
    next   : null,
    previous: null,
    results: []
}

//types
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const GET_NEXT_POKE_SUCCESS = 'GET_NEXT_POKE_SUCCESS'
const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS'

// Reducer
export default function pokeReducer(state = dataInicial, action){
    switch (action.type){
        case GET_POKE_SUCCESS:
            return {...state, ...action.payload}
        case GET_NEXT_POKE_SUCCESS:
            return {...state, ...action.payload}
        case GET_DETAILS_SUCCESS:
            return {...state, unPokemon: action.payload}
        default:
            return state
    }
}

// Actions

export const getDetailsAction = (url = "https://pokeapi.co/api/v2/pokemon/1/") => async (dispatch, getState) => {

    const res = await axios.get(url)
    // console.log(res.data);

    if (localStorage.getItem(url)) {
        console.log('Datos desde LocalStorage');

        dispatch({
            type: GET_DETAILS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }

    try {
        console.log('Datos desde la API');

        dispatch({
            type: GET_DETAILS_SUCCESS,
            payload: {
                nombre     : res.data.name,
                peso       : res.data.weight,
                alto       : res.data.height,
                experiencia: res.data.base_experience,
                img        : res.data.sprites.other.dream_world.front_default
                // img   : res.data.sprites.front_default
            }
        })

        localStorage.setItem(url, JSON.stringify({
            nombre     : res.data.name,
            peso       : res.data.weight,
            alto       : res.data.height,
            experiencia: res.data.base_experience,
            img        : res.data.sprites.other.dream_world.front_default
            }))
        
    } catch (error) {
        console.log(error.mesage);
    }
}

export const getPokemonsAction = () => async (dispatch, getState) => {
    // console.log('getState', getState().pokeArray.offset);
    // const offset = getState().pokeArray.offset

    if (localStorage.getItem('offset=0')) {
        console.log('Datos desde LocalStorage');

        dispatch({
            type: GET_POKE_SUCCESS,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    } 

    try {
        console.log('Datos desde la api');
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))
    } catch (error) {
        console.log(error.message);
    }
}

export const getNextPokemonsAction = () => async (dispatch, getState) => {
    // const offset = getState().pokeArray.offset
    // const siguiente = offset + next
    const {next} = getState().pokeArray

    if (localStorage.getItem(next)) {
        console.log('Datos desde LocalStorage');
        dispatch({
            type: GET_NEXT_POKE_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return        
    }

    try {
        console.log('Datos desde la api');
        const res = await axios.get(next)
        dispatch({
            type: GET_NEXT_POKE_SUCCESS,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
    } catch (error) {
        console.log(error.message);
    }
}

export const getPreviousPokemonsAction = () => async (dispatch, getState) => {

    const {previous} = getState().pokeArray

    if (localStorage.getItem(previous)) {
        console.log('Datos desde LocalStorage');
        dispatch({
            type: GET_NEXT_POKE_SUCCESS,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return        
    }

    try {
        const res = await axios.get(previous)
        dispatch({
            type: GET_NEXT_POKE_SUCCESS,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error.message);
    }

}