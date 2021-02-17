import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDetailsAction } from "../redux/pokeDucks";

const Details = () => {
    const dispatch = useDispatch()

    React.useEffect(()=>{
        const fetchData = () => {
            dispatch(getDetailsAction())
        }
        fetchData()
    },[dispatch])

    const pokemonDetails = useSelector(store => store.pokeArray.unPokemon)
    // console.log(pokemonDetails);
    return pokemonDetails ? (
        <div className="card my-5">

        {/* {
            pokemonDetails.map(item => (

            ))
        } */}
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={pokemonDetails.img} className="img-fluid" alt=""/>
                </div>
                <div className="col-md-8">
                    <div className="card-body ms-1">
                        <h5 className="card-title text-capitalize mb-3">{pokemonDetails.nombre}</h5>
                        <ul className="no-bullets">
                            <li className="card-text">Peso: {pokemonDetails.peso}</li>
                            <li className="card-text">Alto: {pokemonDetails.alto}</li>
                            <li className="card-text">Puntos de Experiencia: {pokemonDetails.experiencia}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    ): null

}

export default Details
