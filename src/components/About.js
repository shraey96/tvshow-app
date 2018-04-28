import React from 'react'
import PropTypes from 'prop-types'
import '../App.css';

const About = () => {
  return (
    <div className="App">
      <br/>
<h3 className="about_header">Binged.xyz is a web app that allows you to keep track of your favourite TV shows!</h3>
<br/>
  <p className="about_info">It is built using the the <i>tvmaze</i> API with ReactJS, ExpressJS and MongoDB.</p>
  <br/><br/>
  <p className="about_contact">For questions and info, contact us at: <i>some random email</i></p>
  </div>
  )
}

export default About
