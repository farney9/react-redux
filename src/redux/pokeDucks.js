import  axios  from "axios";

// Constants

const dataInicial = {
    pokemonLIst : [],
    offset: 0
}

//types
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const GET_MORE_POKE_SUCCESS = 'GET_MORE_POKE_SUCCESS'

// Reducer
export default function pokeReducer(state = dataInicial, action){
    switch (action.type){
        case GET_POKE_SUCCESS:
            return {...state, pokemonLIst: action.payload}
        case GET_MORE_POKE_SUCCESS:
            return {...state, pokemonLIst: action.payload.array, offset: action.payload.offset}
        default:
            return state
    }
}

// Actions

export const getPokemonsAction = () => async (dispatch, getState) => {
    // console.log('getState', getState().pokeArray.offset);
    const offset = getState().pokeArray.offset


    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const getMorePokemonsAction = (next) => async (dispatch, getState) => {
    const offset = getState().pokeArray.offset
    const siguiente = offset + next
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_MORE_POKE_SUCCESS,
            payload: {
                array: res.data.results,
                offset: siguiente

            }
        })

        
    } catch (error) {
        console.log(error.message);
        
    }

}