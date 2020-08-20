import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useHistory } from "react-router-dom"

function Movie({ addToSavedList }) {

  const history = useHistory()

  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [setMovie]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        history.push("/");
        // afternoon project
        // server returns the id of the deleted item
        // you will have to filter out that item from the item list
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button
        className="edit-button"
        onClick={() => history.push(`/update-movie/${params.id}`)}>
        Edit
      </button>
      <button
        className="delete-button"
        onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
