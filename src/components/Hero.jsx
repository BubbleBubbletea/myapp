import React from 'react';

const Hero = ({
  title = 'Welcome to NUFindGroup',
  subtitle = 'Discover your community at Northwestern! Whether you’re into STEM, Humanities, or the Arts, our platform brings together students who share your passions and goals. Join a group, spark connections, and build friendships that inspire and last!',
}) => {
  return (
    <section className="bg-[#4E2A84] py-20 text-white text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
};

export default Hero;
