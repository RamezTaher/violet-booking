import { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import StartsBox from "../../components/starts-box"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"

import { parseISO } from "date-fns"
import format from "date-fns/format"
import Link from "next/link"

const BookingSuccess: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
  ])
  const [chosenRoomsStorage, setchosenRoomsStorage, removechosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setchosenHotelStorage, removechosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setguestInfo, removeguestInfo] = useLocalStorage(
    "guestInfo",
    { FirstName: "", LastName: "", Phone: 0, Email: "", Demandes: "" }
  )

  const [choosenRoomStorage, setChoosenRoomStorage, removeChoosenRoomStorage] =
    useLocalStorage("choosenRoom", {
      clients: 1,
      rooms: 1,
      checkin: "",
      checkout: "",
      promocode: "",
    })

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
  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage("selectedHotel", {
    NameAr: "",
    Name: "",
    Stars: 0,
    AdressAr: "",
    Adress: "",
    DefaultPicture: "",
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

  const goToHome = () => {
    router.push("/")
  }

  console.log(chosenRoomsStorage)
  return (
    <>
      <HeadSeo
        title={t("validation:success-book")}
        description={t("home:violet")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-grayish pt-[57px] lg:pt-12 ">
          <section className="flex flex-col justify-start  ">
            <div className="bg-[#00800A] px-5 lg:px-20 py-4 z-10 w-full flex items-center gap-5 text-white text-2xl font-bold mt-5">
              <div className="w-10 h-10 flex justify-center items-center border border-solid border-white">
                <i className="icon-done_black_24dp text-2xl"></i>
              </div>

              <p>{t("validation:success-book")}</p>
            </div>
            <div className="w-full pt-6 pb-36 container sm:mx-auto px-6 lg:px-10 gap-6  relative grid grid-cols-3 bg-grayish">
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
                <div className="text-primary font-light   flex justify-start items-center">
                  <Link
                    passHref
                    href={{
                      pathname: "/hotel/booking-paiement",
                    }}
                  >
                    <div className="cursor-pointer mx-px">
                      {t("booking:bank-transfer")}
                    </div>
                  </Link>
                  <span className="text-stroke"> {" > "} </span>
                </div>
                <div className=" flex justify-start items-center">
                  <div className=" text-dark mx-px">
                    {t("common:booking-info")}
                  </div>
                </div>
              </div>
              {/* Start Booking Card */}
              <div className="flex flex-col w-full bg-white col-span-3 lg:col-span-2 gap-10 h-fit">
                <h1 className="hidden lg:block text-3xl text-primary font-bold m-5">
                  {t("common:booking-info")}
                </h1>
                {chosenRoomsStorage.map((room, idx) => (
                  <div key={idx} className="flex flex-col lg:flex-row">
                    <div className="relative h-44  w-full  md:hidden">
                      <Image
                        alt="hotel"
                        src={
                          room.Picture ? room.Picture : "/images/no-hotel.jpg"
                        }
                        layout="fill"
                        objectFit="cover"
                      ></Image>
                    </div>
                    <div className="hidden md:block relative h-80 lg:h-44  w-full lg:w-1/4">
                      <Image
                        alt="hotel"
                        src={
                          room.Picture ? room.Picture : "/images/no-hotel.jpg"
                        }
                        layout="fill"
                        objectFit="cover"
                      ></Image>
                    </div>
                    <div className="w-full flex flex-col  md:flex-row md:w-3/4">
                      <div className=" w-full p-4 flex flex-col gap-5">
                        <h1 className="text-black text-base font-bold">
                          {room.RoomTypeNameAr ?? room.RoomTypeName}{" "}
                          {room.ViewNameAr ?? room.ViewName}
                        </h1>
                        <div className="flex  items-center gap-6  ">
                          <div className="flex items-center gap-1 ">
                            <i className="icon-supervisor_account_black_24dp text-primary text-xl"></i>
                            <span className=" text-xs">تتسع لشخصين</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <i className="icon-king_bed_black_24dp text-primary text-xl"></i>
                            <span className=" text-xs">
                              1 سرير مزدوج كبير جداً
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col pb-3  gap-2">
                          <div className="flex gap-1">
                            <span className="text-primary text-xs">
                              {chosenRoomsStorage[0]?.NbrNights}{" "}
                              {t("common:nights-word")}:
                            </span>
                            <div className="text-black font-bold text-xs">
                              {choosenRoomStorage?.checkin} -{" "}
                              {choosenRoomStorage?.checkout}{" "}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <span className="text-primary text-xs">
                              {choosenRoomStorage?.clients}{" "}
                              {t("common:clients-word")}:
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* End Booking Card */}

              {/* Start Booking Info */}
              {/* Start Booking Info */}
              <div className="p-8 bg-white shadow-md col-span-3 lg:col-span-1 md:h-fit flex flex-col gap-4 ">
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
                      {choosenRoomStorage?.checkin} -{" "}
                      {choosenRoomStorage?.checkout}{" "}
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
                      {totalWithoutVat?.toFixed(2)} {t("common:sar")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-dark text-sm">{t("common:TVA")}</span>
                    <div className="text-black font-bold text-base">
                      {totalVAT?.toFixed(2)} {t("common:sar")}
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
                    {totalPrice?.toFixed(2)} {t("common:sar")}
                  </div>
                </div>
              </div>
              {/* End Booking Info */}
              {/* End Booking Info */}

              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2 ">
                <h1 className="text-primary text-3xl font-bold">
                  {t("booking:guest-data")}
                </h1>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {t("input:first-name")}
                    </span>
                    <span> {guestInfo?.FirstName}</span>
                  </div>
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {t("input:last-name")}
                    </span>
                    <span>{guestInfo?.LastName}</span>
                  </div>
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {t("input:email")}
                    </span>
                    <span>{guestInfo?.Email}</span>
                  </div>
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {t("input:phone-number")}
                    </span>
                    <span> {guestInfo?.Phone}</span>
                  </div>
                  <div className="flex items-center gap-4  ">
                    <span className=" font-bold  text-base">
                      {" "}
                      {t("common:special-demandes")}
                    </span>
                    <span>{guestInfo?.Demandes}</span>
                  </div>
                </div>
              </div>
              {/* end guest information */}

              <div className="px-4 py-8 flex  gap-8 bg-white shadow-md col-span-3 lg:col-span-2  lg:justify-start">
                <button
                  className="btn btn-dark lg:w-[200px]"
                  onClick={() => {
                    goToHome()
                  }}
                >
                  {t("button:okay")}
                </button>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
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
export default BookingSuccess
