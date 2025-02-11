import { useRef, useState } from 'react';
import Confetti from 'react-confetti'; // Import the Confetti component
import dancingCat from './images/dancing-cat.gif';
import knife from './images/knife.png';
import asking from './images/asking.gif';
import bear from './images/bear.gif';
import dancing from './images/dancing-rabbit.gif';
import shake from './images/shake.gif';
import './App.css';

const Intro = ({ scrollToQuestion }) => {
  return (
    <div className="greeting-section container">
      <img src={dancingCat} alt="Dancing Cat" className="intro-cat allImg" />
      <p className="greeting">Hello Keleena!</p>

      <div className="arrow-container" onClick={scrollToQuestion}>
        <div className="arrow"></div>
      </div>
    </div>
  );
};

const Question = ({ questionRef, onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [response, setResponse] = useState(null); // Track response

  const handleYes = () => {
    setResponse('yes'); // Set response to "yes"
    onYes(); // Trigger the confetti effect in the parent component
  };

  const handleNo = () => {
    if (noCount < 5) {
      setNoCount(noCount + 1);
    } else {
      // At limit, treat the No button as a Yes button.
      setResponse('yes'); // Set response to "yes"
      onYes(); // Trigger the confetti effect in the parent component
    }
  };

  // Increase the size of the Yes button each time a No is clicked (max 5 times)
  const yesButtonStyle = {
    transform: `scale(${1 + noCount * 0.2})`,
  };

  // Change the No button label to Yes when the limit is reached
  const noButtonLabel = noCount >= 5 ? 'Yes' : 'No';

  // Change image based on response or noCount
  const currentImage = response === 'yes' ? bear : noCount > 0 ? knife : asking;

  return (
    <div ref={questionRef} className="valentine-container container">
      <img src={currentImage} alt="Valentine" className="top-image allImg" />
      <h2 className="question-text">Can you be my valentine?</h2>
      <div className="button-group">
        <button onClick={handleYes} style={yesButtonStyle} className="yes-btn">
          Yes
        </button>
        <button onClick={handleNo} className="no-btn">
          {noButtonLabel}
        </button>
      </div>

      {/* Dancing/Shake image at the bottom */}
      {response === 'yes' && (
        <img src={dancing} alt="Dancing" className="dancing-image-1 allImg" />
      )}
      {response === 'yes' && (
        <img src={shake} alt="Shaking" className="dancing-image-2 allImg" />
      )}
    </div>
  );
};

function App() {
  const questionRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti

  const scrollToQuestion = () => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to trigger confetti
  const handleYes = () => {
    setShowConfetti(true); // Show confetti
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000)
  };

  return (
    <>
      {/* Render Confetti if showConfetti is true */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
        />
      )}

      <Intro scrollToQuestion={scrollToQuestion} />
      <Question questionRef={questionRef} onYes={handleYes} />
    </>
  );
}

export default App;