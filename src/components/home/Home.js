import React, { Component } from "react"
import ImageFadeIn from "react-image-fade-in";
import "./home.css"

export const Home = () => {


    return (
        <article className="home__page" >
            <ImageFadeIn src="images/logo.png"  alt="logo" className="logo" opacityTransition={4}/>
            
        </article>

    )
}