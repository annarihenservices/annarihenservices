import React,{useState} from 'react'
import logo from '../assets/logo.png'
import fbBlue from '../assets/fbBlue.png'
import instaBlue from '../assets/instaBlue.png'
import mailBlue from '../assets/mailBlue.png'
import locationBlue from '../assets/locationBlue.png'
import emailjs from 'emailjs-com';
import useTranslate from "../hooks/useTranslate";

export default function Footer() {

  const { t } = useTranslate();
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e) => {
  setLoading(true);
    e.preventDefault();

    const templateParams = {
        from_email: formData.email,
        message: formData.message,
    };

    emailjs.send('service_m4ugaxk', 'template_ys299g8', templateParams, 'YPiuF8oeR0-g56YLs')
        .then((result) => {
            console.log(result.text);
            alert('Message Envoyé!');
            setLoading(false)
        }, (error) => {
            console.log(error.text);
            alert('message non envoyé essayez plus tard!');
        });
    };
  return (
    <div className='w-full  bg-white p-6 lg:grid lg:grid-cols-6 items-center'>
      <div className='lg:col-span-2'>
        <div className='items-center justify-center text-center mx-auto'>
          <img src={logo} className='h-20 mx-auto'/>
        </div>
        
        <div className='p-5 text-sm font-inter font font-extralight text-center mb-5'>
          {t("footer_description")}
        </div>
        <div className='flex  space-x-8 text-center justify-center'>
            <a href='annarihenservices@gmail.com'>
              <img src={mailBlue} className='w-[30px]'/>
            </a>
            <a href='https://maps.app.goo.gl/pRhxh7wCuinCH4Ao8'>
              <img src={locationBlue} className='w-[30px]'/>
            </a>
            <a href='https://www.facebook.com/share/17UNXAkLeu/'>
              <img src={fbBlue} className='w-[30px]'/>
            </a>
            <a href='https://www.instagram.com/itannarihenservizzi'>
              <img src={instaBlue} className='w-[30px]'/>
            </a>
        </div>
      </div>
      <div className='flex lg:block lg:col-span-1 p-10 text-center text-sm w-full justify-between font-inter font-extralight lg:space-y-4 '>
                  <div><a className='hover:text-green' href="/">{t("Accueil")}</a></div>
                <div><a className='hover:text-green' href="/services">{t("Services")}</a></div>
                <div><a className='hover:text-green' href="/languagecourses">{t("Cours_de_Langue")}</a></div>
                <div><a className='hover:text-green' href="/contact">{t("Contact")}</a></div>
          
      </div>
      <div className='lg:col-span-3 text-center font-inter font-extralight'>
        <form onSubmit={handleSubmit}>
          <p className='text-2xl text-inter text-black'>{t("contact_us")}</p><br/>
          <label className='text-black text-lg'>{t("email")}</label><br/>
          <input type='email' name="email" placeholder={t("email")} value={formData.email} onChange={handleChange} className='w-[80%] lg:w-[50%] rounded-md p-2 shadow-md'/><br/>
          <label className='text-black text-lg'>{t("message")}</label><br/>
          <textarea type="text" name="message" placeholder={t("message")} value={formData.message} onChange={handleChange} className='w-[80%] lg:w-[50%] rounded-md p-2 shadow-md'/><br/>
          <button type='submit'  className='cursor-pointer mt-2 w-[50%] lg:w-[35%] bg-red border-[1px] border-green text-wite text-white hover:bg-green rounded-2xl p-2 '>
          {
            loading ? t("loading") : t("send")
          }
          </button>
        </form>
      </div>
    </div>
  )
}
