import React, { useState } from 'react';
import './About.css';
import Header from "./Header";

const About = ({ setIsAdmin }) => {
    const [showPrompt, setShowPrompt] = useState(true);
    const [passwordStep, setPasswordStep] = useState(0);
    const [inputPassword, setInputPassword] = useState('');
    const [message, setMessage] = useState("You need the magic password to add/delete reviews. If you don't know it, you can only check my reviews!");

    const magicPassword = process.env.REACT_APP_MAGIC_PASSWORD;

    //when clicked "yes" on the password bubble
    const handleYesClick = () => {
        setPasswordStep(1);
        setMessage("Please enter the magic password 🧙🏻‍♀️🔮🪄:");
    };

    //when clicked "no" on the password bubble
    const handleNoClick = () => {
        setShowPrompt(false);
        setMessage("Have fun browsing the reviews! 🌸˚˖𓍢ִ໋🌷͙֒✧🩷˚⋆️");
    };

    const handlePasswordSubmit = () => {
        if (inputPassword === magicPassword) {
            setPasswordStep(3);
            setMessage("Correct password! Have fun!");
            setIsAdmin(true); // Grant admin access
        } else {
            if (passwordStep === 1) {
                setPasswordStep(2);
                setMessage("Wrong password. You have one more chance")
            } else {
                setPasswordStep(3);
                setMessage("Sorry! If you want to add a review, reach out to me! You can browse other reviews in the meantime.");
            }
        }
        setInputPassword('');
    };

    return (
        <div className="about-page">
            <Header />
            <div className="project-info-bubble">
                <h2>🌿 About this Project: Hasret's Hiraeth Blog 🌿</h2>
                <p>🌷 This website is coded using:</p>
                <p>JavaScript (React) for its frontend, Java (SpringBoot) for its backend, PostgreSQL for its database</p>
                <p>🌷 It is a blog where you can see my views on books, movies, and series.</p>
                <p>🌷 Enjoy the cozy reviews and join the journey!</p>
            </div>

            <div className="password-prompt-bubble">
                <p>{message}</p>

                {showPrompt && passwordStep === 0 && (
                    <div>
                        <p>Do you want to try?</p>
                        <button onClick={handleYesClick}>Yes</button>
                        <button onClick={handleNoClick}>No</button>
                    </div>
                )}

                {passwordStep > 0 && passwordStep < 3 && (
                    <div>
                        <input
                            type="password"
                            placeholder="Enter the magic password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordSubmit}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;
