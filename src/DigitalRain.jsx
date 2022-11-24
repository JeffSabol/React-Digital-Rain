import RainStream from './RainStream';

function DigitalRain() {
  return <div style={{
    fontFamily: 'NFS',
    position:'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'black',
  }}>
    <RainStream />
  </div>
}

export default DigitalRain;
