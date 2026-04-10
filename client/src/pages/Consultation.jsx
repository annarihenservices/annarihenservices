import React, { useState } from 'react';
import useTranslate from "../hooks/useTranslate";
import emailjs from 'emailjs-com';
export default function ConsultationPage() {
  const { t } = useTranslate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
    };

    emailjs.send('service_sqv5btj', 'template_avrskc8', templateParams, 'YPiuF8oeR0-g56YLs')
        .then((result) => {
            console.log(result.text);
            alert('Message Envoyé!');
            setLoading(false)
        }, (error) => {
            console.log(error.text);
            alert('message non envoyé essayez plus tard!');
        });
    console.log('Form submitted:', formData);
    alert(t("consultation_alert"));
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center  px-6 lg:px-20 font-inter">
      <div className="w-full max-w-3xl bg-gray-50 p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">{t("request_consultation")}</h1>
        <p className="text-lg font-extralight mb-8 text-center">
          {t("consultation_form_text")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold" htmlFor="name">{t("request_nom")}</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold" htmlFor="email">{t("email")}</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold" htmlFor="phone">{t("request_tel")}</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>


          {/* Message */}
          <div>
            <label className="block mb-2 font-semibold" htmlFor="message">{t("message")}</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("request_message_placeholder")}
              className="w-full px-4 py-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red text-white px-8 py-3 rounded-lg font-bold hover:bg-green transition-colors duration-300"
            >
              {t("send_request")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}