import React, { useState } from 'react';
import {
  Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//const baseUrl = process.env.REACT_APP_BASE_URL;

function Carousal(props)  {
  
  let items = props.items;
  let base_url = '';
  const carouselItems = useSelector(state => state.carouselItems);

  if(carouselItems.status === 'succeeded') {
    items = carouselItems.carouselItems;
    base_url = baseUrl;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  
  const next = () => {
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex +1;
    setActiveIndex(nextIndex);
  }

  const previous = ()=>{
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex)=> {
    setActiveIndex(newIndex);
  }
  const[animating, setAnimating] = useState();
  
  const onExiting =()=>{
     setAnimating(true);
  }

  const onExited =() =>{
    setAnimating(false);
  }
  
  const slides = items.map((item) => {
    return (
      <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
        >  
        <img className='carouselBackgrund img-fluid' src={item.image_url} alt={"bdr"} />
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
        next={next}
        previous={previous}
        slide={false}
        fade={true}
        interval={6000}
      >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    
  );
  
}

export default Carousal;
