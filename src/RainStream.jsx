/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react';
import useInterval from '@use-it/interval';

const CHARS = 'abcdefghijklmnopqrstuvwxyz1234567890';

const MUTATION_PROBABILITY = 0.01;



const MIN_STREAM_SIZE = 7;
const MAX_STREAM_SIZE = 25;

const getRandInRange = (min,max)=> (Math.floor(Math.random()*(max-min))+min);

const randChar = () => {
    return CHARS.charAt(Math.floor(Math.random()*CHARS.length));
}

const getRandStream = () =>
    new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE)) // generate a new empty array of a random size [empty,empty,empty]
        .fill() // now array is initialized with undefined [undefined,undefined,undefined]
        .map(_=>randChar()) // maps random characters [j,3,f]

const RainStream = () => {
    const [stream, setStream] = useState(getRandStream());
    const [topPadding, setTopPadding] = useState(stream.length * -50); //using margin to update to give animated effect
    // to get the stream to start at the bottom character we take the length of the strength and multiply it by the font size

    // in addition we use a 3rd party useInterval hook because the JS alternative would glitch out
    useInterval(()=> {
        if (topPadding > window.innerHeight){ // once it hits the bottom of the page, then restart animation
            setTopPadding(stream.length * -44);
        }
        else {

            setTopPadding(topPadding+44); // 23 is found after trail and error of overlapping characters (height of characters after applying negative margin??)
            setStream(getMutatedStream) // getMutatedStream = stream => getMutatedStream(stream) because that's the callback
        }
    },100);

    const getMutatedStream = stream => {
        const newStream = [];
        for(let i=1; i<stream.length; i++){
            if(Math.random() < MUTATION_PROBABILITY){
                newStream.push(randChar())
            } else {
                newStream.push(stream[i])
            }
        }
        newStream.push(randChar())
        return newStream;
    }

    return (
        <div style={{
            marginTop: topPadding, // give font falling effect
            color: '#1FFFFF', 
            writingMode: 'vertical-lr', //
            textOrientation: 'upright', // ^ font writes downwards instead of left to right
            whiteSpace: 'nowrap', // once the font writes to the bottom of the stream,
                                  // we don't wrap around to the next column
            userSelect: 'none', // no highlighting the font
            textShadow: '0px 0px 8px rgba(62, 228, 255, 1)', // outerglow
            fontSize: 50,
        }}>
        {stream.map((char,index)=>(
            // a tag must be used to keep font vertical
            <a style={{
                color: index === stream.length - 1 ? '#fff' : undefined, // if char is last in stream make white
                opacity: index < 6 ? 0.1 + index * 0.15 : 1, // gradient top to bottom
                textShadow: index === stream.length - 1 ? '0px 0px 20px rgba(255, 255, 255, 1)' : undefined, // if last char in stream give light glow
                marginTop: -12, //change to margin not marginTop later on
            }}>{char}</a> 
        ))}
        </div>
    );
}

export default RainStream;