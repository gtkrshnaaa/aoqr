// pages/index.jsx
import React from 'react';

const HomePage = () => {
  return (
    <section className="bg-zinc-800 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-yellow-400 via-orange-300 to-orange-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Understand User Flow.

            <span className="sm:block"> Increase Conversion. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
            numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-yellow-600 bg-yellow-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded border border-yellow-600 px-12 py-3 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring active:bg-yellow-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
