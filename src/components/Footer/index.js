import React from "react";
import classes from "./index.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.corporate}>
        <h3>Corporate</h3>
        <ul>
          <li>
            <a href="#">Faq</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">carrer</a>
          </li>
        </ul>
      </div>

      <div className={classes.socialLinks}>
        <h3>Connect With Us</h3>
        <ul>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
        </ul>
      </div>
      <div className={classes.newspaper}>
        <h3>About Our Store</h3>
        <p>
          Welcome to our online store! We're passionate about bringing you the
          best selection of books across various genres. Whether you're a
          fiction enthusiast, a history buff, or looking for educational
          materials, we've got you covered. Explore our collection and embark on
          new literary adventures. From timeless classics to contemporary
          bestsellers, we curate our selection to cater to diverse interests and
          tastes. Our team of dedicated bibliophiles is committed to providing
          exceptional service and helping you discover your next favorite read.
          Dive into our virtual shelves and discover hidden gems, explore niche
          subjects, and broaden your horizons.
        </p>
      </div>
      <div className={classes.contactInfo}>
        <h3>Contact Us</h3>
        <ul>
          <li>Email: prajapatichirag2162003@gmail.com</li>
          <li>Phone: +91 7487935333</li>
          <li>Address: 123 Main Street, City, Country</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
