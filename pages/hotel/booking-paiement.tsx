import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import ModalError from "../../components/ModalError"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Mask from "../../components/Mask"

import { parseISO } from "date-fns"
import format from "date-fns/format"
import Booking from "./booking"
import Link from "next/link"

type Props = {
  banks: any
}

const BookingPaiement: NextPage<{ banks: any }> = ({ banks }: Props) => {
  const { t } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
  ])
  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    { FirstName: "", LastName: "" }
  )
  const [choosenRoomStorage, setChoosenRoomStorage, removeChoosenRoomStorage] =
    useLocalStorage("choosenRoom", {
      clients: 2,
      rooms: 1,
      checkin: "",
      checkout: "",
      promocode: "",
    })

  console.log(banks)
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
    HotelId: 0,
  })

  const [showModal, setShowModal] = useState(false)
  const [showMask, setShowMask] = useState(false)

  const router = useRouter()
  const closeErrorModal = () => {
    setShowModal(false)
  }

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

  const [form, setForm] = useState({
    banks: 2,
  })

  const onChangeForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validator = (form) => {
    return form.banks
  }
  const confirmPaiement = async () => {
    if (validator(form)) {
      let booking = {
        HotelId: chosenRoomsStorage[0].HotelId,
        Bookings: chosenRoomsStorage,
        User: {
          ...guestInfo,
          GuestName: guestInfo.FirstName + " " + guestInfo.LastName,

          ClientPaymentType: "2",
          BankAccountId: form.banks,
        },
      }
      setShowMask(true)

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/booking/book_multi_rooms`,
          options
        )
        const data = await res
        if (data.ok) {
          setShowMask(false)

          router.push("/hotel/booking-success")
        }
      } catch (err) {}
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
        title={t("booking:bank-transfer")}
        description={t("home:violet")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-grayish pt-[82px] lg:pt-[64px] ">
          <section className="flex flex-col gap-4  lg:gap-10 py-10">
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
                <div className="text-primary font-light   flex justify-start items-center">
                  <Link
                    passHref
                    href={{
                      pathname: "/hotel/booking",
                    }}
                  >
                    <div className="cursor-pointer mx-px">
                      {t("common:enter-data")}
                    </div>
                  </Link>
                  <span className="text-stroke"> {" > "} </span>
                </div>
                <div className=" flex justify-start items-center">
                  <div className=" text-dark mx-px">
                    {t("booking:bank-transfer")}
                  </div>
                </div>
              </div>

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
                      {chosenRoomsStorage[0]?.NbrNights}{" "}
                      {t("common:nights-word")}:
                    </span>
                    <div className="text-black font-bold text-xs">
                      {chosenRoomsStorage[0]?.CheckIn.substring(0, 10)} -{" "}
                      {chosenRoomsStorage[0]?.CheckOut.substring(0, 10)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-primary text-xs">
                      {choosenRoomStorage?.clients} {t("common:clients-word")}:
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
                      {chosenRoomsStorage[0]?.NbrNights}{" "}
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

              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2 order-2 lg:order-1">
                <h1 className="text-primary text-3xl font-bold">
                  {t("booking:bank-transfer")}
                </h1>

                <form className="flex flex-col gap-4  mb-7 lg:mb-12">
                  <h1 className="text-dark text-sm">
                    {t("booking:choose-bank-we-send-details")}
                  </h1>
                  {banks.map((bank, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between py-4 border-b border-dark-tint border-solid gap-4 last:border-0"
                    >
                      <span className="ms-1.5 text-base font-bold text-dark-shade ">
                        {bank.AccountNameAr} - {bank.BankNameAr}
                      </span>

                      <input
                        type="checkbox"
                        className="form-radio outline-none text-primary ring-0 ring-offset-0 rounded-full checked:ring-primary ring-primary h-3 w-3 "
                        value={bank.Id}
                        name={"banks"}
                        onChange={(e) => onChangeForm(e)}
                        checked={form.banks == bank.Id}
                      />
                    </label>
                  ))}
                </form>

                <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                  <button
                    className="btn btn-dark lg:w-32 px-0 text-sm"
                    onClick={() => {
                      goBack()
                    }}
                  >
                    {t("button:review-booking")}
                  </button>
                  <button
                    className="btn btn-primary lg:w-32 px-0 text-sm"
                    onClick={() => confirmPaiement()}
                  >
                    {t("button:next")}
                  </button>
                </div>
              </div>
              {/* end guest information */}
            </div>
          </section>
        </div>
        {showModal && (
          <ModalError
            text={t("validation:fill-all-fields")}
            onClose={closeErrorModal}
          />
        )}
        {showMask && <Mask />}
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const resBank = await fetch(
    `${process.env.NEXT_PUBLIC_API}/booking/bankAccounts`
  )
  const banks = await resBank.json()

  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation", "booking"],
        nextI18NextConfig
      )),
      banks,
    },
  }
}
export default BookingPaiement
