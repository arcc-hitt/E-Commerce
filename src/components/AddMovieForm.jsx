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
    <form onSubmit={submitHandler} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Opening Text"
        value={openingText}
        onChange={(e) => setOpeningText(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;
