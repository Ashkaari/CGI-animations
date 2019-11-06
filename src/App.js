import React from 'react';
import './styles/index.scss';

class App extends React.Component {
  state = {coordinates: {x: 0, y: 0}, imgSize: {h: 0, w: 0}, scale: 1, cursorScale: 1};

  componentDidMount() {
    this.cgiBlock.addEventListener('mousemove', this.onMousemove, false);
    this.cgiBlock.addEventListener('mousewheel', this.onWheel, false);

    let img = new Image();
    img.src = require('./images/livingroom1_1.jpg');
    img.onload = () => {
      const MAX_WIDTH = 1200;
      const MAX_HEIGHT = 1000;

      let h = img.height;
      let w = img.width;
      let ratio = img.width / img.height;

      if (img.width > img.height) {
        w = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
        h = w / ratio;
      } else if (img.height > img.width) {
        h = img.height > MAX_HEIGHT ? MAX_HEIGHT :img.height;
        w = h * ratio
      } else if (img.height > MAX_HEIGHT) {
        h = MAX_HEIGHT;
        w = MAX_HEIGHT;
      }

      this.setState({imgSize: {h, w}});
    }
  }

  onMousemove = event => {
    this.setState({
      coordinates: {x: event.offsetX, y: event.offsetY},
      scale: 1,
    })
  };

  onWheel = event => {
    event.preventDefault();
    let newScale = event.deltaY * -0.05;

    this.setState({
      scale: Math.min(Math.max(1, newScale), 50)
    });
  };

  render() {
    const {coordinates, imgSize, scale} = this.state;

    return (
      <div className="App">
        <header className="_header">
          Why are
          <span>computer generated images important</span>
        </header>
        <div className="cgi-block__wrapper" ref={el => this.cgiBlock = el}>
          <div className="cgi-block__mask" style={{
            width: imgSize.w,
            height: imgSize.h
          }}>
            <img src={require('./images/livingroom1_2.jpg')} style={{width: imgSize.w, height: imgSize.h}}/>
            <div className="cgi-block__mask-cursor" style={{transform: `translate3d(${coordinates.x}px, ${coordinates.y}px, 0px) scale3d(1, 1, 1)`}}>
              <img src={require('./images/livingroom1_1.jpg')} style={{
                transformOrigin: `${coordinates.x}px ${coordinates.y}px`,
                transform: `translate3d(${-coordinates.x + 200}px, ${-coordinates.y + 200}px, 0px) scale3d(${scale}, ${scale}, ${scale})`,
                width: imgSize.w,
                height: imgSize.h
              }}/>
            </div>
          </div>
          <div className="cgi-block__description">
            Artists have many tools. <br/>
            Technology is one of them. <br/>
            Computer generated imagery (CGI) <br/>
            uses modelling, software and graphics <br/>
            to produce an image.
          </div>
        </div>
      </div>
    )
  }

}

export default App;
