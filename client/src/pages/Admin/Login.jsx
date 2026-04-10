import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loddingStart, signinSuccess, signinFailed } from '../../redux/admin/adminSlice';
import 'react-toastify/dist/ReactToastify.css';
import  { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTranslate from "../../hooks/useTranslate";


const SingIn = () => {
    const { t } = useTranslate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.admin)



    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const { currentAdmin } = useSelector(state => state.admin)
    const [isNewUser, setIsNewUser] = useState(true)
    const [isFormSubmit, setIsformSubmit] = useState(false);
    const [responseData, setResponseData] = useState();

    //======handlign Notification for user =====//
    const handleTostify = async () => {
        await responseData.success && setIsNewUser(!isNewUser)
        toast(responseData.message, {
            autoClose: 2000,
        })
    }
    useEffect(() => {
        isFormSubmit && handleTostify();
        setIsformSubmit(false)
    }, [responseData])

    useEffect(() => {
        if (currentAdmin && currentAdmin.email) {
            navigate("/admin")
        }
    }, [])

    //======handling form submting function =====//
    const onSubmit = async (formData) => {
        dispatch(loddingStart())
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const userData = await res.json();

            //===checking reqest success or not ===//
            if (userData.success === false) {
                dispatch(signinFailed(userData.message))

                //===showing error in tostify====//
                toast.error(userData.message, {
                    autoClose: 2000,
                })
            }
            else {
                dispatch(signinSuccess(userData))
                navigate('/admin')
            }
        }
        catch (error) {
            dispatch(signinFailed(error.message))
            toast.error(userData.message, {
                autoClose: 2000,
            })
        }
    };





    return (
        <>
            {
                currentAdmin && currentAdmin.email
                    ?
                        <div className=" bg-white">
                            <p className='text-base md:text-xl text-center text-black font-heading font-bold '>User existe! Redirection au page admin</p>
                        </div>

                    :
                        <div className="pt-20 bg-white pb-24">
                            <div className=" px-4   max-w-xl mx-auto rounded-sm border-[1px] border-black">
                                <div className='text-center text-green mb-3 pt-6 font-medium font-heading text-lg'>
                                    {t("login")}
                                </div>
                                
                                <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='text-center'
            >
                <div>
                <input {...register("email", { required: true })} type="email" placeholder={t("email")} className=" mt-5 w-[60%] rounded-md border-black border-[1px] bg-white" />
                {errors.email && <span className='text-black font-semibold text-sm mb-2 mt-1'>{t("user_exists")}</span>}
                </div>
                <div>
                <input {...register("userPassword", { required: true })} type="password" placeholder={t("password")} className=" mt-5 w-[60%] rounded-md border-black border-[1px] bg-white" />
                {errors.password && <span className='text-black font-semibold text-sm mb-2 mt-1'>{t("required_field")}</span>}
                </div>
                <div>
                <button
                    type='submit'
                    disabled={loading}
                    className="bg-green text-CustomWhite text-lg w-[50%] hover:bg-green hover:text-black my-5 rounded-md ">
                    {
                        loading ? t("loading") : t("login")
                    }
                </button>
                </div>
            </form>
            <ToastContainer limit={0} />
        </>
                                <ToastContainer limit={0} />
                            </div>
                        </div>

            }
            
        </>
        
    )
}

export default SingIn