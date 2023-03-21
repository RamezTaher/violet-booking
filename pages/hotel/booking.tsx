import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import ModalError from "../../components/ModalError"
import StartsBox from "../../components/starts-box"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import { parseISO } from "date-fns"
import format from "date-fns/format"
import { useForm } from "react-hook-form"
import Link from "next/link"

type Props = {
  hotelInfo: any
}
const Booking: NextPage<{ hotelInfo }> = ({ hotelInfo }: Props) => {
  const router = useRouter()
  const { t } = useTranslation([
    "common",
    "button",
    "home",
    "input",
    "validation",
    "booking",
  ])
  const [choosenRoomStorage, setChoosenRoomStorage, removeChoosenRoomStorage] =
    useLocalStorage("choosenRoom", {
      clients: 2,
      rooms: 1,
      checkin: "",
      checkout: "",
      promocode: "",
    })
  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])

  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    {}
  )

  const [
    selectedRoomStorage,
    setSelectedRoomStorage,
    removeSelectedRoomStorage,
  ] = useLocalStorage("selectedRoom", {
    RoomTypeNameAr: "",
    ViewNameAr: "",
    MealAr: "",
    CheckIn: "",
    CheckOut: "",
    NbrNights: 1,
    Price: 0,
    VAT: 0,
    PriceNoFeeNoVAT: 0,
  })

  let totalPrice = 0
  let totalWithoutVat = 0
  let totalVAT = 0

  if (chosenRoomsStorage) {
    chosenRoomsStorage.forEach((x) => {
      totalPrice = totalPrice + x.PriceToPay * x.Quantity
    })
  }

  totalVAT = totalPrice * 0.15
  totalWithoutVat = totalPrice - totalVAT

  const [showModal, setShowModal] = useState(false)
  const closeErrorModal = () => {
    setShowModal(false)
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    reValidateMode: "onChange",
    mode: "all",
  })

  const onSubmit = (data) => {
    if (isValid) {
      setGuestInfo(data)
      router.push({
        pathname: "/hotel/booking-paiement",
      })
    } else {
      setShowModal(true)
    }
  }

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <HeadSeo
        title={t("booking:book-info")}
        description={t("home:violet")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-grayish pt-[82px] lg:pt-[64px] ">
          <section className="flex flex-col gap-4 py-10 ">
            <div className="w-full  pb-32 container mx-auto   gap-6 lg:px-10 relative grid grid-cols-3 ">
              <div className="flex items-center justify-start gap-1 text-xs col-span-3">
                <div className="text-primary font-light   flex justify-start items-center">
                  <Link passHref href={"/"}>
                    <div className="cursor-pointer mx-px">
                      {t("common:home")}
                    </div>
                  </Link>
                  <span className="text-stroke"> {" > "} </span>
                </div>
                <div className="text-primary font-light   flex justify-start items-center">
                  <Link
                    passHref
                    href={{
                      pathname: "/hotel/search",
                      query: {
                        clients: choosenRoomStorage.clients,
                        rooms: choosenRoomStorage.rooms,
                        checkin: choosenRoomStorage.checkin,
                        checkout: choosenRoomStorage.checkout,
                        promocode: choosenRoomStorage.promocode,
                      },
                    }}
                  >
                    <div className="cursor-pointer mx-px">
                      {t("common:search-title")}
                    </div>
                  </Link>
                  <span className="text-stroke"> {" > "} </span>
                </div>
                <div className=" flex justify-start items-center">
                  <div className=" text-dark mx-px">
                    {t("common:enter-data")}
                  </div>
                </div>
              </div>
              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2  order-2 lg:order-1">
                <h1 className="text-primary text-3xl font-bold">
                  {t("common:enter-data")}
                </h1>

                <form
                  className="grid grid-cols-2 gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      name="FirstName"
                      id="FirstName"
                      className="rounded-none"
                      placeholder={t("input:first-name")}
                      {...register("FirstName", {
                        required: true,
                      })}
                    />
                    {errors.FirstName && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      name="LastName"
                      placeholder={t("input:last-name")}
                      id="LastName"
                      className="rounded-none"
                      {...register("LastName", {
                        required: true,
                      })}
                    />
                    {errors.LastName && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>

                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      className="rounded-none"
                      placeholder={t("input:email")}
                      {...register("Email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                    />
                    {errors.Email && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      name="Phone"
                      id="Phone"
                      className="rounded-none "
                      placeholder={t("input:phone-number")}
                      {...register("Phone", {
                        required: true,
                        pattern:
                          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/,
                      })}
                    />
                    {errors.Phone && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>

                  <h1 className="text-primary text-3xl font-bold">
                    {t("booking:special-demands")}
                  </h1>

                  <label className="flex flex-col gap-4 col-span-2 ">
                    <textarea
                      className="h-36 rounded-none"
                      name="demandes"
                      placeholder={t("booking:special-demands-taxed")}
                      {...(register("demandes"), { required: false })}
                    />
                  </label>

                  <div className="flex flex-col gap-5 lg:flex-row lg:justify-between col-span-2 ">
                    <button
                      className="btn btn-dark text-sm lg:w-32 px-0 "
                      onClick={() => goBack()}
                    >
                      {t("button:review-order")}
                    </button>

                    <button
                      className="btn btn-primary text-sm lg:w-32 px-0 "
                      type="submit"
                    >
                      {t("button:go-to-pay")}
                    </button>
                  </div>
                </form>
              </div>
              {/* end guest information */}
              {/* Start Booking Info */}
              <div className="p-4 bg-white shadow-md col-span-3 lg:col-span-1 md:h-fit flex flex-col gap-4 order-1 lg:order-2 ">
                <h1 className="text-primary text-3xl font-bold mb-3">
                  {t("booking:book-info")}
                </h1>
                <div className="flex pb-3 border-b border-solid border-dark flex-between ">
                  <div className="flex flex-col w-1/2 gap-1">
                    <span className="text-primary text-xs">
                      {t("common:date")}
                    </span>
                    <span className="text-black font-bold text-xs">
                      بعد الساعة 2:00 مساءً
                    </span>
                  </div>
                  <div className="flex flex-col  w-1/2 gap-1">
                    <span className="text-primary text-xs">
                      {t("common:depart")}
                    </span>
                    <span className="text-black font-bold text-xs">
                      حتى الساعة 3:30 مساءً
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pb-3 border-b border-solid border-dark gap-2">
                  <div className="flex gap-1">
                    <span className="text-primary text-xs">
                      {chosenRoomsStorage[0].NbrNights}{" "}
                      {t("common:nights-word")}:
                    </span>
                    <div className="text-black font-bold text-xs">
                      {format(
                        parseISO(chosenRoomsStorage[0].CheckIn),
                        "yyyy-MM-dd"
                      )}{" "}
                      -{" "}
                      {format(
                        parseISO(chosenRoomsStorage[0].CheckOut),
                        "yyyy-MM-dd"
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-primary text-xs">
                      {choosenRoomStorage.clients} {t("common:clients-word")}:
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pb-3 border-b border-solid border-dark gap-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">{t("common:sum")}</span>
                    <div className="text-black font-bold text-base">
                      {totalWithoutVat.toFixed(2)} {t("common:sar")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">{t("common:TVA")}</span>
                    <div className="text-black font-bold text-base">
                      {totalVAT.toFixed(2)} {t("common:sar")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">
                      {t("common:period")}
                    </span>
                    <div className="text-black font-bold text-base">
                      {chosenRoomsStorage[0].NbrNights}{" "}
                      {t("common:nights-word")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-dark text-sm">
                    {t("common:sum-all")}
                  </span>
                  <div className="text-primary font-bold text-2xl">
                    {totalPrice.toFixed(2)} {t("common:sar")}
                  </div>
                </div>
              </div>
              {/* End Booking Info */}
            </div>
          </section>
        </div>
        {showModal && (
          <ModalError
            text={t("validation:fill-all-fields")}
            onClose={closeErrorModal}
          />
        )}
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation", "booking"],
        nextI18NextConfig
      )),
    },
  }
}
export default Booking
