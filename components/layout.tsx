import Header from "./header"
import Footer from "./footer"
import Image from "next/image"
import { ReactNode } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

interface Props {
  children: ReactNode
}
export default function Layout({ children }: Props) {
  const router = useRouter()
  return (
    <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
      <Header />
      {children}
      <a
        href={
          "https://wa.me/966545050062?text=السلام عليكم، أرغب في الاستفسار عن عروض الفنادق "
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-[40px] h-[40px] rounded-full bg-[#00e676] flex justify-center items-center text-xl text-dark-shade shadow-md fixed bottom-5 right-14 z-50 cursor-pointer">
          <Image
            src="/images/whatsapp.svg"
            height="50px"
            width="50px"
            alt="whatsapp icon"
          />
          <span className="absolute text-[8px] w-[110px] bg-black/60 text-center bottom-[calc(100%+10px)] rounded-sm text-white">
            {" "}
            هل تحتاج إلى المساعدة؟
          </span>
        </div>
      </a>
      <Footer />
    </div>
  )
}
