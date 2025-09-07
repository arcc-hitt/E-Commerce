import React, { useState } from "react";

const AddMovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !openingText || !releaseDate) return;

    onAddMovie({ title, openingText, releaseDate });

    setTitle("");
    setOpeningText("");
    setReleaseDate("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Add a New Movie</h5>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Movie Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter movie title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Opening Text</label>
            <textarea
              className="form-control"
              rows="3"
              value={openingText}
              onChange={(e) => setOpeningText(e.target.value)}
              placeholder="Enter opening text"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Release Date</label>
            <input
              type="date"
              className="form-control"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
