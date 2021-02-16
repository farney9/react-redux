import React from 'react'
// hooks react redux
import {useDispatch, useSelector} from 'react-redux'
// importamos la acción
import { getPreviousPokemonsAction, getNextPokemonsAction, getPokemonsAction, getDetailsAction } from "../redux/pokeDucks";
import Details from './Details';

const Pokemones = () => {
    // declaramos displach para llamar a la acción o acciones
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    const pokemones = useSelector(store => store.pokeArray.results)
    const next = useSelector(store => store.pokeArray.next)
    const previous = useSelector(store => store.pokeArray.previous)
    console.log(pokemones);

    return (
        <div className="container">
            <h4>Fundamentos Redux</h4>
            <hr/>
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center text-danger">Lista de Pokemones</h4>
                    <div className="d-grid mt-2">
                        {
                            pokemones.length === 0 &&
                            <button
                                onClick={()=> dispatch(getPokemonsAction())} 
                                className="btn btn-primary btn-md fw-bold">
                                Get Pokemons
                            </button>
                        }
                    </div> 
                    <div className="mt-3 d-flex justify-content-center">
                        {
                            previous &&
                            <button
                                onClick={()=> dispatch(getPreviousPokemonsAction())} 
                                className="btn btn-secondary btn-md fw-bold me-2">
                                <i className="fas fa-chevron-left"></i> Previus
                            </button>
                            
                        }
                        {
                            next &&
                            <button
                                onClick={()=> dispatch(getNextPokemonsAction())} 
                                className="btn btn-secondary btn-md fw-bold justify-content-center align-items-center align-self-center">
                                Next <i className="fas fa-chevron-right"></i>
                            </button>

                        }
                    </div>                   


                </div>
                
            </div>
            <div className="row my-2">
                <div className="col-6">
                <h5 className="text-center">Pokemones</h5>

                    <ul className="list-group list-group-flush">
                        {
                            pokemones.map(item => (
                                <li className="list-group-item list-group-item-action fw-bold text-capitalize" key={item.name}>
                                    {item.name}
                                    <button
                                        onClick={()=> dispatch(getDetailsAction(item.url))} 
                                        className="btn btn-outline-primary btn-sm float-end">
                                            <i className="fas fa-info-circle text-primary"></i> Info 
                                    </button>
                                </li>
                            ))
                        }
                    </ul>

                </div>
                <div className="col-6">
                    <h5 className="text-center">Detalles</h5>
                    <Details/>
                </div>
            </div>
        </div>
    )
}

export default Pokemones
