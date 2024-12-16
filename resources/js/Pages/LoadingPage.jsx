import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; 
import "../../css/LoadingPage.css"; 

const LoadingPage = () => {
    const [steps, setSteps] = useState([]);
    const [isButtonVisible, setButtonVisible] = useState(false);
    const [isLoadingIconVisible, setLoadingIconVisible] = useState(true); // Track loading icon visibility

    // Define the loading steps
    const loadingSteps = [
        "Creating your profile",
        "Preparing your portfolio",
        "Giving some final touches",
        "Almost there",
        "Your portfolio is ready",
    ];

    useEffect(() => {
        let stepIndex = 0;
        const stepInterval = setInterval(() => {
            if (stepIndex < loadingSteps.length) {
                setSteps((prevSteps) => [...prevSteps, loadingSteps[stepIndex]]);
                stepIndex++;
            } else {
                clearInterval(stepInterval);
                setButtonVisible(true);
            }
        }, 1000);

        // Remove the loading icon after 3 seconds
        const loadingIconTimeout = setTimeout(() => {
            setLoadingIconVisible(false); 
        }, 1000); 

        // Cleanup intervals and timeouts on component unmount
        return () => {
            clearInterval(stepInterval);
            clearTimeout(loadingIconTimeout);
        };
    }, []);

    const handleButtonClick = () => {
        Inertia.visit(route('dashboard'));
    };

    return (
        <div className="loading-container">
            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
                Just a moment while we personalize your portfolio
            </h1>
            <header id="loadingHeader" className="futuristic-header"></header>

            {/* Loading Spinner, will hide after 3 seconds */}
            {isLoadingIconVisible && <div className="loading-icon" id="loadingSpinner"></div>}

            <div className="loading-text">

                {/* Display each step one by one */}
                {steps.map((step, index) => (
                    <p key={index}>
                        {index === loadingSteps.length - 1 ? (
                            step
                        ) : (
                            <>
                                <i className="fas fa-check-circle"></i> {step}
                            </>
                        )}
                    </p>
                ))}
            </div>

            {/* Display the Get Started button after the last step */}
            {isButtonVisible && (
                <button id="getStartedBtn" className="futuristic-btn" onClick={handleButtonClick}>
                    Get Started
                </button>
            )}
        </div>
    );
};

export default LoadingPage;
