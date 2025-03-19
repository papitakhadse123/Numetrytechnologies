import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container">
                <div className="row min-vh-100 align-items-center">
                    <div className="col-md-6">
                        <h1 className="display-4 fw-bold text-white mb-3">
                            Hi, I'm Renuka Kulkarni
                        </h1>
                        <h2 className="h3 text-white-50 mb-4">
                            A Web Developer
                        </h2>
                        <p className="lead text-white-50 mb-4">
                            Building modern and responsive web applications with a passion for creating seamless user experiences.
                        </p>
                        <div className="hero-buttons">
                            <a href="#portfolio" className="btn btn-primary btn-lg me-3">
                                View My Work
                            </a>
                            <a href="#contact" className="btn btn-outline-light btn-lg">
                                Hire Me
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;