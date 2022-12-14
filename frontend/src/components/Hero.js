import React from "react";

const Hero = () => {
  return (
    <div className="hero container">
      <div className="hero__content__right">
        <h1>Salient Resort</h1>
        <p>
          Salient Resort Center is a full-service resort management company that
          provides
        </p>
        <button>Learn More</button>
      </div>
      <div className="hero__content__left">
        <img
          src="https://thumbs.dreamstime.com/b/resort-pool-relaxing-ambience-40691341.jpg"
          alt="Salient Resort Center"
        />
      </div>
    </div>
  );
};

export default Hero;
