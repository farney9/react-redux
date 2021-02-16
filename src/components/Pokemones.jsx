import React from 'react'
// hooks react redux
import {useDispatch, useSelector} from 'react-redux'
// importamos la acción
import { getMorePokemonsAction, getPokemonsAction } from "../redux/pokeDucks";

const Pokemones = () => {
    // declaramos displach para llamar a la acción o acciones
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    const pokemones = useSelector(store => store.pokeArray.pokemonLIst)
    console.log(pokemones);

    return (
        <div className="container">
            <h4>Fundamentos Redux</h4>
            <hr/>
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">Lista de Tareas</h4>
                    <div className="d-grid mt-2">
                        <button
                            onClick={()=> dispatch(getPokemonsAction())} 
                            className="btn btn-primary btn-md fw-bold">
                            Get Pokemons
                        </button>
                    </div> 
                    <div className="d-grid mt-2">
                        <button
                            onClick={()=> dispatch(getMorePokemonsAction(20))} 
                            className="btn btn-secondary btn-md fw-bold">
                            Get more...
                        </button>
                    </div>                   

                    <div className="list-group list-group-flush my-4">
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            pokemones.map(item => (
                                <li className="list-group-item list-group-item-action fw-bold" key={item.name}>
                                    {item.name}
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Pokemones
