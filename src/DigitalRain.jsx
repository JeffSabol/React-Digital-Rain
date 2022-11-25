import RainStream from './RainStream';

function DigitalRain() {
  const streamCount = Math.floor(window.innerWidth / 26);
  return <div style={{
    fontFamily: 'NFS',
    position:'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'black',
    display: 'flex', //stops multiple streams from overlaping
  }}>
    {new Array(streamCount).fill().map(_ => (
      <RainStream />
    ))}
  </div>
}

export default DigitalRain;
