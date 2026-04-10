import  { useEffect, useState } from 'react'
import {  useParams,useLocation  } from 'react-router-dom'
import {  toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomeServices from '../components/Home/HomeServices';
import 'react-quill/dist/quill.snow.css';
import emailjs from 'emailjs-com';
import { useSelector, useDispatch } from "react-redux";
import useTranslate from "../hooks/useTranslate";




const Service = () => {
      const { t } = useTranslate();
  
    const location = useLocation();
    const [service, setService] = useState({})
    const { name,  description ,imgUrl, _id, userRef } = service;
    const params = useParams();

    const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    
  });
  const dispatch = useDispatch();
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    console.log(currentLanguage)
  const displayName =
        currentLanguage === "ar" ? service.name_ar :
        currentLanguage === "en" ? service.name_eng :
        currentLanguage === "it" ? service.name_it :
        service.name;

    const displaydesc =
        currentLanguage === "ar" ? service.description_ar :
        currentLanguage === "en" ? service.description_eng :
        currentLanguage === "it" ? service.description_it :
        service.description;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};


const handleSubmit = async(e) => {
  setLoading(true);
    e.preventDefault();  
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/service/${params.id}`)
    const json = await res.json();
    if (json.success === false) {
        toast.error(json.message, {
            autoClose: 2000,
        })
    }
    else {
        const templateParams = {
            email: formData.email,
            message: json.name,
        };
    
        emailjs.send('service_6fjbgdj', 'template_c4ywjuk', templateParams, 'jzgxH2TWNYTLVqvu0')
            .then((result) => {
                console.log(result.text);
                alert('Demande Devis Envoyé!');
                setLoading(false)
            }, (error) => {
                console.log(error.text);
                alert('Demande non envoyé! essayez plus tard!');
            });           
    }
    
    };


    useEffect(() => {
        window.scrollTo(0, 0);
}, [location]);
    //====== Loading Project Data Here ======//
    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            
            const res = await fetch(`http://localhost:4000/annaservice/service/${params.id}`)
            const json = await res.json();
            if (json.success === false) {
                toast.error(json.message, {
                    autoClose: 2000,
                })
            }
            else {
                setService(json)                
            }
        })()
    }, [params.id])

    //====SLider Functions=====//
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              display: "block",
              color:"#ffffff",
              backgroundColor: "#008C45",
              borderRadius: "40px",
            }}
            onClick={onClick}
          />
        );
      }
      const [currentIndex, setCurrentIndex] = useState(0);
    const settings = {
        infinite: false,
        lazyLoad: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SampleNextArrow />,
        beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex),
        appendDots: dots => (
            <div style={{ bottom: 25, }}>
                <ul style={{ margin: "0px", color: '#fff' }}> {dots} </ul>
            </div>
        ),
    };
    function removeLastNCharacters(url, numChars) {
        if (typeof url === 'string' && url.length > numChars) {
            return url.slice(0, -numChars);
        }
        return url; // Return original URL if it's shorter than or equal to numChars
    }
    function isMp4(fileName) {
        console.log(fileName)
        return fileName.endsWith('.mp4');
    }
    return (
        <>
            {
                    <div className=" pb-16 bg-white lg:grid lg:grid-cols-5 items-center">
                        <div className='col-span-2 mx-10'>
                            <Slider {...settings} className='z-10 relative '>
                                {
                                    service.imgUrl && service.imgUrl.map((prod, index) => (
                                        <div
                                            key={index}
                                            className="w-full mx-auto z-10"
                                        >
                                            {isMp4(removeLastNCharacters(prod,53))?
                                            <video className='h-[200px] sm:h-[350px]  mx-auto rounded-lg rounded-b-lg' src={prod} alt="video" autoPlay="true" muted="true" loop="true"/>
                                            :
                                            <img className='h-[200px] sm:h-[350px]  mx-auto rounded-lg rounded-b-lg' src={prod} alt={`Slide ${index+1}`}  />
                                            }
                                        </div>
                                    ))
                                }
                            </Slider>
                            <div className="flex justify-center gap-2 mt-4">
                                    {service.imgUrl && service.imgUrl.map((prod, index) => (
                                        <div
                                        key={index}
                                        className={` border-2 rounded-lg overflow-hidden ${
                                        index === currentIndex ? 'border-green' : 'border-none'
                                    }`}
                                >
                                    <img src={prod} alt={`Thumbnail ${index + 1}`} className="w-16 h-16 object-cover" />
                                </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="col-span-3 ">
                            <div className="property_info p-5 shadow-lg rounded-lg mx-1 mb-3">
                                <h1 className='text-3xl font-inter font-extralight'>
                                    {displayName}
                                </h1>
                                    <div className="description">
                                        <p className='text-xl font-inter font-extralight'>{t("description_test")}</p>
                                        <div  dangerouslySetInnerHTML={{ __html: displaydesc }} />
                                    </div>                  
                            </div>
                                        
                        </div>
                        
                    </div>
            }
            <HomeServices/>
        </>
    )
}

export default Service