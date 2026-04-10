import { useNavigate } from 'react-router-dom';
import React,{useEffect,useState,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loddingStart, userUpdateFailed, userUpdateSuccess } from '../../redux/admin/adminSlice.js';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTranslate from "../../hooks/useTranslate.js";

export default function Profile() {
  const { t } = useTranslate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentAdmin } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({});


  
  const dispatch = useDispatch();
  





  



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true)
    try {
      dispatch(loddingStart());
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/users/update/${currentAdmin._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const userData = await res.json();

      //===checking reqest success or not ===//
      if (userData.success === false) {
        dispatch(userUpdateFailed(userData.message));

        //===showing error in tostify====//
        toast.error(userData.message, {
          autoClose: 5000,
        });
      } else {
        dispatch(userUpdateSuccess(userData));
        setPathName(true)
        toast.success("Profile updated successfully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      dispatch(userUpdateFailed(error.message));
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

 
  const [pathname,setPathName]=useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);








  return (
    <div>
        {pathname?
          <div className='sm:grid sm:grid-cols-2'>
            <div className='col-span-1 '>
            <div className='rounded-lg bg-white shadow-md shadow-black text-center items-center justify-center mx-10 py-40 px-5 h-[400px]'>
            <div className='flex items-center justify-center text-center text-lg my-2 font-bold'> {t("username")} : {currentAdmin.username}</div>
            <div className='flex items-center justify-center text-center text-lg my-2 font-bold'> {t("email")} : {currentAdmin.email}</div>
            
        </div>
            </div>
            <div className=' py-10 flex text-center justify-center items-center sm:mt-0'>
              <button onClick={()=>setPathName(false)}
                className='bg-green text-white px-20 py-10 rounded-lg text-lg font-bold hover:text-gray-900 '
                >{t("update")}</button>
            </div>
          </div>
          :
          <div className='sm:grid sm:grid-cols-2 '>
            <div className='flex text-center justify-center items-center'>
              <button onClick={()=>setPathName(true)}
                className='bg-green text-white px-20 mb-10 py-10 rounded-lg text-lg font-bold hover:text-gray-900'
                >{t("view")}</button>
            </div>
            <div className='col-span-1  '>
            <div className="profile_info rounded-lg bg-white  mx-10 py-4 px-5 shadow-lg shadow-black h-[400px] pt-20">
            <form className="w-full text-center" onSubmit={handleSubmit}>
              <div>
              <label className="text-left font-heading text-sm pl-1 ">
                {t("username")}
              </label>
              </div>
              <div>
              <input
                defaultValue={currentAdmin.username}
                name="username"
                type="text"
                placeholder="Username"
                className="form_input bg-white w-[80%] text-center rounded-md  mt-1 !border-[1px]  mb-3"
                onChange={handleChange}
              />
              </div>
              <div>
              <label className="text-left font-heading text-sm pl-1 ">
                {t("email")}
              </label>
              </div>
              <div>
              <input
                defaultValue={currentAdmin.email}
                name="email"
                type="email"
                placeholder="email"
                className="  form_input bg-white w-[80%] text-center rounded-md  !border-[1px]  mb-3"
                onChange={handleChange}
              />
              </div>
              <div>
              <label className="text-left font-heading text-sm pl-1 ">
                {t("password")}
              </label>
              </div>
              <div>
              <input
                type="password"
                name="password"
                placeholder={t("password")}
                className="mt-1  form_input bg-white w-[80%] text-center rounded-md  !border-[1px] "
                onChange={handleChange}
              />
              </div>
              <button
                
                type="submit"
                className="py-2 px-5 bg-green text-white rounded-md w-full font-heading  mt-4 hover:opacity-90"
              >
                {t("save")}
              </button>
            </form>
          </div>
            </div>
            
          </div>
        }
      
    </div>
  );
}

