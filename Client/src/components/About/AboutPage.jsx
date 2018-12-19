import React from 'react';
import Fade from 'react-reveal/Fade'

const AboutPage = () => (
    <Fade left>
        <div className="about">
            <h1>About Us</h1>
            <div>
                <section className="about-us">
                    <h2>Web Application</h2>
                    <p>
                        With Catify, it’s easy to find the right music for every moment.
                    </p>
                    <p>
                        There are many tracks that you can upload to Catify. So whether you’re working out, partying or relaxing,
                        the right music is always at your fingertips. Choose what you want to listen to, or let Catify surprise you.
                    </p>
                    <p>
                        You can also browse through the music playlists of other users
                        or create one and just sit back.
                    </p>
                    <p>
                        Soundtrack your life with Catify.
                    </p>
                </section>
                <section className="about-us">
                    <h2>About me</h2>
                    <p>
                        I am Stoqn Kalpakchiev and i am 20 years old, and this is my ReactJS project.
                    </p>
                    <p>
                        I start learning programing since i was kid (I am still a kid). First thing that I've learned was php, html and css.
                        That grab me so much into programing so i couldn't stop doing it. And i really wanted to get into
                        game programing, but that doesn't happened.
                    </p>
                    <p>
                        I've tried many languages like C#, Python, C++, JavaScript, PHP and i think any of this programing
                        languages have specific function. Which make them different.
                    </p>
                </section>
            </div>
            <h3>Enough talking let's get into the app</h3>
        </div>
    </Fade>
);

export default AboutPage;