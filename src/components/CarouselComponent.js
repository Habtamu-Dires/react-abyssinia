import React, { Component } from 'react';
import {
  Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption,
} from 'reactstrap';
import {Link} from 'react-router-dom';

class Carousal extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
 
  next() {
    
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    
    const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    this.setState({ activeIndex: newIndex });
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  render() {
    const { activeIndex } = this.state;

    const slides = this.props.items.map((item) => {
      return (
        <CarouselItem
            className="custom-tag"
            tag="div"
            key={item.id}
          >  
          <img className='carouselBackgrund img-fluid' src={item.image} alt={"bdr"} />
          <div className='carousel-center-text animate__animated animate__fadeInDown animate__slower'>
                  <h2>{item.title}</h2>
                  <p>{item.sub_title}</p>       
          </div>
            <CarouselCaption  captionText={""} 
                captionHeader={
                  <Link to='/register' className=' btn-register justify-self-center 
                  animate__animated animate__fadeInUp animate__slower'>Register</Link>
                } />
        </CarouselItem>
      );
    });

    return (
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          slide={false}
          fade={true}
          interval={6000}
        >
            <CarouselIndicators items={this.props.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      
    );
  }
}

export default Carousal;
