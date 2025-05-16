import React, { useState } from 'react';
import api from './api'; // Import the axios instance
import './App.css'; // Make sure to import the CSS file
import { computeHeadingLevel } from '@testing-library/react';

function App() {
    const [inputText, setInputText] = useState('');
    const [modelName, setModelName] = useState('gemma-7b-it');
    const [prediction, setPrediction] = useState('');

    const handlePredict = async () => {
        console.log('clicked on this button')
        try {
            const response = await api.post('http://127.0.0.1:8000/predict', {
                inputText,
                modelName
            });
            if(response.status === 200){
        console.log('clicked on this buttongood response')
        setPrediction(response.data.prediction);

            }else{
                console.log('bad response',response.status)
            }
        } catch (error) {
            console.error('Prediction error:', error);
        }
    };

    return (
        <div className="App">
            <h1 className="large-text">Mental Health Prediction System</h1>
            <label htmlFor="modelSelect" className="small-text">Select a model:</label>
            <select
                id="modelSelect"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="small-input"
            >
                <option value="gemma-7b-it">Gemma-7b-it</option>
                <option value="mixtral-8x7b-32768">Mixtral-8x7b-32768</option>
                <option value="llama3-70b-8192">Llama3-70b-8192</option>
                <option value="bert">BERT Model</option>
            </select>
            <textarea
                placeholder="Enter your text here"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="large-input"
            ></textarea>
            <button onClick={handlePredict} className="large-button">Predict</button>
            {prediction && (
                <div className="prediction">
                    <h3>Prediction:</h3>
                    <p>{prediction}</p>
                </div>
            )}
        </div>
    );
}

export default App;
