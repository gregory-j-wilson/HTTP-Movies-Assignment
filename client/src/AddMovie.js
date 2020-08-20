import React, { useState } from 'react'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'



const initialNewMovie = {
    id: 100,
    title: '',
    director: '',
    metascore: '',
    stars: ['Joe', 'Bob'] 
}

export const AddMovie = () => {

    const { id } = useParams();

    const history = useHistory()

    const [newMovie, setNewMovie] = useState(initialNewMovie)

    const handleChange = e => {
        setNewMovie({ 
            ...newMovie,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        console.log(newMovie)
        e.preventDefault()

        axios.post(`http://localhost:5000/api/movies`, {
            title: newMovie.title,
            director: newMovie.director,
            metascore: newMovie.metascore,
            stars: newMovie.stars
        })
        .then((res) => {
            console.log(res.data);
            history.push(`/`);
          })
          .catch((err) => console.error(err.message));
      };


    return (
        <div><center>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input id="title"
                        type="text"
                        name="title"
                        value={newMovie.title}
                        onChange={handleChange}
                        />
                        <br></br>
                <label htmlFor="director">Director:</label>
                <input id="director"
                        type="text"
                        name="director"
                        value={newMovie.director}
                        onChange={handleChange}
                        />
                        <br></br>
                <label htmlFor="metascore">Metascore:</label>
                <input id="metascore"
                        type="number"
                        name="metascore"
                        value={newMovie.metascore}
                        onChange={handleChange}
                        />
                        <br></br>
                <label htmlFor="stars">Stars:</label>
                <input id="stars"
                        type="text"
                        name="stars"
                        value={newMovie.stars}
                        onChange={handleChange}
                        />
                        <br></br><br></br>
                <button type="submit">Submit</button>
            </form>
            </center>
        </div>
    )
}