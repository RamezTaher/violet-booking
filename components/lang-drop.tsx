import { Listbox, Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"
const LangDrop = () => {
  const languages = [
    { verbose: "arabic", value: "ar" },
    { verbose: "english", value: "en" },
  ]
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const { t, i18n } = useTranslation(["common"])
  const [selectedLanguage, setSelectedLanguage] = useState(locale)
  const changeLanguage = (language: string) => {
    setSelectedLanguage(language)
    router.push({ pathname, query }, asPath, { locale: language })
    i18n.changeLanguage(language)
  }

  return (
    <div className="relative w-full lg:w-auto">
      <div className="mobile flex lg:hidden">
        <div
          onClick={() => {
            changeLanguage("en")
          }}
          className={`w-full text-center text-base py-4 ${
            selectedLanguage === "en"
              ? "bg-primary text-white"
              : "text-dark-shade"
          }`}
        >
          {t(`common:english`)}
        </div>
        <div
          onClick={() => {
            changeLanguage("ar")
          }}
          className={`w-full text-center text-base py-4  ${
            selectedLanguage === "ar"
              ? "bg-primary text-white"
              : "text-dark-shade"
          }`}
        >
          {t(`common:arabic`)}
        </div>
      </div>
      <div className="web hidden lg:flex">
        <div
          onClick={() => {
            changeLanguage("en")
          }}
          className={` text-center text-base p-5 cursor-pointer ${
            selectedLanguage === "en"
              ? "bg-primary text-white"
              : "text-dark-shade"
          }`}
        >
          EN
        </div>
        <div
          onClick={() => {
            changeLanguage("ar")
          }}
          className={` text-center text-base  cursor-pointer p-5  ${
            selectedLanguage === "ar"
              ? "bg-primary text-white"
              : "text-dark-shade"
          }`}
        >
          AR
        </div>
      </div>
    </div>
  )
}

export default LangDrop
