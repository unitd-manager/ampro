import React, { useEffect,useState,Component } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import api from "../constants/api";
import imageBase from "../constants/imageBase";
import TopDealSingle from "./Deal/TopDealSingle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }
export default function SlickCarousel(){
 
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    const images= [
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree", // Network image
      // require('./assets/images/abc.jpg'),          // Local image
    ]

    const[products,setProducts]=useState([]);

    useEffect(()=>{
        api.get('/product/getAllProducts').then((res)=>{
          res.data.data.forEach(element => {
            element.images=String(element.images).split(',')
          });
          setProducts(res.data.data);
        }).catch(()=>{
          console.log('error')
        })
      },[])
    return (
        <Container>
      {/* <div> */}
        
        <Slider {...settings}>
        {images && images.map((product,index) => {
    return(
         <div  key={index}>
          <image className="carousel-image" src={product} style={{width:'250px',height:'250px'}} alt='pic'/>
          </div>);
      })}
<div>
    <h3 style={{width:'250px',height:'250px',backgroundColor:'blueviolet'}}></h3>
</div>
<div>
    <h3 style={{width:'250px',height:'250px',backgroundColor:'blueviolet'}}></h3>
</div>
<div>
    <h3 style={{width:'250px',height:'250px',backgroundColor:'blueviolet'}}></h3>
</div>
<div>
    <h3 style={{width:'250px',height:'250px',backgroundColor:'blueviolet'}}></h3>
</div>
<div>
    <h3 style={{width:'250px',height:'250px',backgroundColor:'blueviolet'}}></h3>
</div>
        </Slider>
      {/* </div> */}
      </Container>
    );
  }

