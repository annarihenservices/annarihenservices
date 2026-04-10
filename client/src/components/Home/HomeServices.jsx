import React,{useState,useEffect} from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ServiceCard from '../../components/ServiceCard'
import useTranslate from "../../hooks/useTranslate";

export default function HomeServices() {
const { t } = useTranslate();
const [services,setServices]=useState([]);
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        color:"#ffffff",
        backgroundColor: "#CD212A",
        borderRadius: "40px",
      }}
      onClick={onClick}
    />
  );
}
useEffect(() => {
  (async () => {
      try {
          const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/service/`)
          const json = await res.json()
          if (json.success != false) {
            setServices(json)         
          }
      } catch (error) {
          console.log(error);
      }
  })()
}, []) 
const settings = {
  dots: false,
  infinite: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SampleNextArrow />,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay:true,
  autoplaySpeed: 1500,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
  ],
};
const sliderRef = React.useRef(null);
  return (
    <div className='bg-white w-full px-10  px-auto'>
      <h1 className='text-3xl  font-bold font-inter z-10'>
          {t("nos_services")}
      </h1><br/>
      <div className='text-center justify-between items-center pb-5 '>
      <Slider ref={sliderRef} {...settings} className='z-10  gap-3 col-span-10'>
        {
          services && services.map(service => <ServiceCard key={service._id} service={service} />)
        }
      </Slider>
    </div>
    </div>
  )
}
