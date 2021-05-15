import { useState, createContext } from 'react'

export const MovieContext = createContext()

export const MovieProvider = (props) => {

    const [movies, setMovies] = useState([
        {
            name: 'Matrix',
            watchOn: 'DisneyPlus',
            id: 1
        },
        {
            name: 'Jojo Rabbit',
            watchOn: 'Netflix',
            id: 2
        },
        {
            name: 'Tenet',
            watchOn: 'Amazon Prime Video',
            id: 3
        },
    ])

    return (
        <MovieContext.Provider value={[movies,setMovies]}>
            {props.children}
        </MovieContext.Provider>
    );
}