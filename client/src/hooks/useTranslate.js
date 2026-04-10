import { useSelector } from "react-redux";
import { translations } from "../i18n/translations";

export default function useTranslate() {
  const lang = useSelector((state) => state.language.currentLanguage);

  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  return { t, lang };
}