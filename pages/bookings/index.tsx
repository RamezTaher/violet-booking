import { GetStaticProps, NextPage, GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import Layout from "../../components/layout"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Pagination from "../../components/pagination"
import { useState } from "react"

import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import SortDrop from "../../components/sort-drop"
import ReservationState from "../../components/ReservationState"
import { useBookings } from "../../hooks/useBookings"
import { useLocalStorage } from "react-use"
import { useRouter } from "next/router"

type Hotel = {
  Adress: string
  AdressAr: string
  DefaultPicture: string
  Stars: number
  Name: string
  NameAr: string
  Slug: string
}

const Bookings: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation(["common", "button", "home", "input", "search"])

  const [form, setForm] = useState({
    email: "",
    num: "",
  })
  const onChangeForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <>
      <HeadSeo
        title={t("common:my-bookings")}
        description={t("home:violet")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-grayish pt-[82px] lg:pt-[64px] h-screen">
          <section className="relative flex flex-col gap-8">
            <div className="bg-white ">
              <div className="container sm:mx-auto relative flex flex-col items-center gap-5">
                <div className="text-4xl text-center font-extrabold text-dark py-8">
                  {t("common:my-bookings")}
                </div>
                <div className="w-1/2 h-[1px] bg-primary"></div>
              </div>
            </div>

            <div className="container py-10 px-6 lg:px-10 sm:mx-auto relative flex flex-col items-center gap-5">
              <div className="p-2 lg:p-5 bg-white flex flex-col gap-5 w-full lg:grid lg:grid-cols-6">
                <div className="relative h-[190px] lg:col-span-2">
                  <Image
                    src="/photos/king-bed.png"
                    alt="hotel-image"
                    layout="fill"
                  ></Image>
                </div>
                <div className="lg:col-span-3 flex flex-col gap-5 lg:justify-center">
                  <h2 className="text-dark text-xl font-bold">
                    غرفة كينغ مع إطلالة على…
                  </h2>

                  <div className=" flex items-center gap-5 text-dark">
                    <div className="flex items-center gap-2">
                      <i className="icon-supervisor_account_black_24dp text-primary"></i>
                      <div className="text-sm">تتسع لشخصين</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="icon-king_bed_black_24dp text-primary"></i>
                      <div className="text-sm">1 سرير مزدوج كبير جداً</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-primary">5 ليالي:</span>
                      <span className="text-dark font-bold">
                        30/07/2021 - 05/08/2021
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">3 نزلاء:</span>
                      <span className="text-dark font-bold">
                        2 بالغين - 1 اطفال
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="btn btn-dark w-full py-2 text-lg font-bold text-white lg:h-[38px] cursor-pointer">
                    {t("common:more-info")}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "search"],
        nextI18NextConfig
      )),
    },
  }
}
export default Bookings
