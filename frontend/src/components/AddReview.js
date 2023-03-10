import React, { useState } from "react";

const initialValues = {
  author: "",
  review_text: "",
  rating: "",
};

export default function AddReview() {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <><hr></hr>Leave a Playground Review
        <form>
          <input
            value={values.author}
            onChange={handleInputChange}
            name="author"
            label="Author"
            placeholder="Add your name here"
          />
          
          <input
            value={values.rating}
            onChange={handleInputChange}
            name="rating"
            label="Rating"
            type="number"
            placeholder="Playground rating (1-5)"
          />
          <hr></hr>
          <textarea rows="5" cols="42"
            value={values.review_text}
            onChange={handleInputChange}
            name="review_text"
            label="Description"
            placeholder="Please Leave a detailed Playground Review here"
          /><hr></hr>
          <button type="submit"> Submit </button>
        </form></>
  );
}