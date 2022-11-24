/* eslint-disable jsx-a11y/anchor-is-valid */
const CHARS = 'jeffsabolJEFFSABOL3540';

const MIN_STREAM_SIZE = 15;
const MAX_STREAM_SIZE = 50;

const getRandInRange = (min,max)=> (Math.floor(Math.random()*(max-min))+min);

const randChar = () => {
    return CHARS.charAt(Math.floor(Math.random()*CHARS.length));
}

const getRandStream = () =>
    new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE)) // generate a new empty array of a random size [empty,empty,empty]
        .fill() // now array is initialized with undefined [undefined,undefined,undefined]
        .map(_=>randChar()) // maps random characters [j,3,f]

const RainStream = () => {
    return (
        <div style={{
            color: '#1FFFFF', 
            writingMode: 'vertical-lr', //
            textOrientation: 'upright', // ^ font writes downwards instead of left to right
            whiteSpace: 'nowrap', // once the font writes to the bottom of the stream,
                                  // we don't wrap around to the next column
            userSelect: 'none', // no highlighting the font
            textShadow: '0px 0px 8px rgba(62, 228, 255, 1)', // outerglow
            fontSize: 50,
        }}>
        {getRandStream().map(char=>(
            // a tag must be used to keep font vertical
            <a style={{
                marginTop: -12, //change to margin not marginTop later on
            }}>{char}</a> 
        ))}
        </div>
    );
}

export default RainStream;