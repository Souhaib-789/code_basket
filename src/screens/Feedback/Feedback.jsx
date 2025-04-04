// FeedbackScreen.js
import React, { useState } from "react";
import styles from "./Feedback.module.css";
import { InputField, SubmitButton, TextComponent } from "../../components";


const Feedback = () => {
  const [formData, setFormData] = useState({ rating: "", review: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
  };

  return (
    <div className={styles.container}>
      <TextComponent className={styles.title} text={'We Value Your Feedback'} />
        <TextComponent className={styles.label} text={'Did you enjoy using Code Basket?'} />
        <div className={styles.ratingContainer}>
          {["Dreadful", "Blah", "Good", "Brilliant"].map((option, index) => (
            <label key={index} className={styles.radioLabel}>
              <input
                type="radio"
                name="rating"
                value={option}
                onChange={handleChange}
                className={styles.radioInput}
              />
              {option}
            </label>
          ))}
        </div>
        
        <TextComponent className={styles.label} text={'Short review :'} />
        <InputField
          type="text"
          name="review"
          placeholder="Write your review here..."
          value={formData.review}
          onChange={handleChange}
          className={styles.inputField}
          required
        />

        <SubmitButton type="submit" className={styles.button}  title={'Submit Feedback'} />
    </div>
  );
};

export default Feedback;
