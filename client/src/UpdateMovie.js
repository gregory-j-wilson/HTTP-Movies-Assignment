import React, { useState } from 'react'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'



const initialUpdatedMovie = {
    id: 100,
    title: '',
    director: '',
    metascore: '',
    stars: ['Joe', 'Bob'] 
}

export const UpdateMovie = (props) => {

    const { id } = useParams();

    const history = useHistory()

    const [updatedMovie, setUpdatedMovie] = useState(initialUpdatedMovie)

    const handleChange = e => {
        setUpdatedMovie({ 
            ...updatedMovie,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        console.log(updatedMovie)
        e.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
        .then((res) => {
            console.log(res.data);
            return props.setMovieList(props.movieList.map((movie) => {
                if (res.data.id === id) {
                    return res.data
                } else {
                    return movie
                }
            })),
            history.push(`/`)
          })
        .catch((err) => console.error(err.message));
      };


    return (
        <div><center>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input id="title"
                        type="text"
                        name="title"
                        value={updatedMovie.title}
                        onChange={handleChange}
                        />
                        <br></br>
                <label htmlFor="director">Director:</label>
                <input id="director"
                        type="text"
                        name="director"
                        value={updatedMovie.director}
                        onChange={handleChange}
                        />
                        <br></br>
                <label htmlFor="metascore">Metascore:</label>
                <input id="metascore"
                        type="number"
                        name="metascore"
                        value={updatedMovie.metascore}
                        onChange={handleChange}
                        />
                        <br></br>
                <label htmlFor="stars">Stars:</label>
                <input id="stars"
                        type="text"
                        name="stars"
                        value={updatedMovie.stars}
                        onChange={handleChange}
                        />
                        <br></br><br></br>
                <button type="submit">Submit</button>
            </form>
            </center>
        </div>
    )
}