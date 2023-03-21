import { Transition } from "@headlessui/react"
import { GetServerSideProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { Fragment, useState, useRef, useEffect } from "react"
import DatePicker from "../../components/date-picker"
import Filter from "../../components/filter"
import HotelSearch from "../../components/hotels-search"
import Layout from "../../components/layout"
import SearchHotelCard from "../../components/search-hotel-card"
import SortDrop from "../../components/sort-drop"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Link from "next/link"
import { useLocalStorage, useClickAway } from "react-use"
import Router, { useRouter } from "next/router"
import format from "date-fns/format"
import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import { addDays } from "date-fns"
import ClientsNumberDrop from "../../components/ClientsNumberDrop"
import RoomsNumberDrop from "../../components/RoomsNumberDrop"
import { useRoomsInfo } from "../../hooks/useRoomsInfo"

import { useRooms } from "../../hooks/useRooms"
import LoadingCard from "../../components/LoadingCard"

const Search: NextPage = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation(["common", "search", "button", "search"])

  const { roomsInfo, isLoading } = useRoomsInfo()

  const roomsFetch = useRooms(router.query)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isSearchCardOpen, setIsSearchCardOpen] = useState(false)
  const [searchData, setSearchData] = useState<{
    checkin: string
    checkout: string
    clients: number
    rooms: number
    promocode: string
  }>({
    checkin: "",
    checkout: "",
    clients: 2,
    rooms: 1,
    promocode: "",
  })

  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])

  const [choosenRoomStorage, setChoosenRoomStorage, removeChoosenRoomStorage] =
    useLocalStorage("choosenRoom", {})

  const goToSearch = (data) => {
    setIsSearchCardOpen(false)
    router.push({
      pathname: "./search",
      query: {
        clients: data.clients,
        rooms: data.rooms,
        checkin: data.checkin,
        checkout: data.checkout,
        promocode: data.promocode,
      },
    })
  }
  useEffect(() => {
    setSearchData({
      ...searchData,
      clients: router.query.clients ? Number(router.query.clients) : 2,
      rooms: router.query.rooms ? Number(router.query.rooms) : 1,
      checkin: router.query.checkin
        ? (router.query.checkin as string)
        : format(addDays(new Date(), 1), "yyyy-MM-dd"),
      checkout: router.query.checkout
        ? (router.query.checkout as string)
        : format(addDays(new Date(), 2), "yyyy-MM-dd"),
      promocode: router.query.promocode
        ? (router.query.promocode as string)
        : "",
    })
  }, [router.query])

  const handleChangeDate = (data) => {
    setSearchData({
      ...searchData,
      checkin: format(data.startDate, "yyyy-MM-dd"),
      checkout: format(
        data.endDate ? data.endDate : data.startDate,
        "yyyy-MM-dd"
      ),
    })
  }

  const handleChangeFilter = (data) => {
    console.log(data)
  }

  const getRoomPicture = (id: any) => {
    let room = roomsInfo?.filter((a: any) => a.Id === id)
    if (room?.length > 0) {
      if (room[0].ImageUrl !== null) {
        return room[0].ImageUrl
      } else {
        return null
      }
    }
  }

  let totalPrice
  let roomsCount
  const [total, setTotal] = useState(0)
  const [totalRooms, setTotalRooms] = useState(0)

  const selectRoom = () => {
    totalPrice = 0
    roomsCount = 0
    roomsFetch.data.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity) {
          totalPrice = totalPrice + room.Quantity * room.PriceToPay
          roomsCount = roomsCount + room.Quantity
        }
      })
    })
    let selectedRooms: any = []
    roomsFetch.data.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity > 0) {
          selectedRooms.push(room)
        }
      })
    })
    setTotal(totalPrice)
    setTotalRooms(roomsCount)
  }

  const getChosenRooms = () => {
    let selectedRooms: any = []
    roomsFetch.data.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity > 0) {
          selectedRooms.push(room)
        }
      })
    })
    return selectedRooms
  }

  const reservation = () => {
    if (total > 0) {
      let chosenRoomsList = getChosenRooms()
      setChosenRoomsStorage(chosenRoomsList)
      setChoosenRoomStorage({
        clients: router.query.clients,
        rooms: router.query.rooms,
        checkin: router.query.checkin,
        checkout: router.query.checkout,
        promocode: router.query.promocode,
      })
      router.push({
        pathname: "/hotel/booking",
      })
    }
  }

  return (
    <>
      <HeadSeo
        title={t("common:search-title")}
        description={t("home:violet")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="fixed w-full bg-white z-[35] bottom-0 start-0 px-4 py-2   shadow-t-md ">
          <div className="flex items-end justify-between container sm:mx-auto px-6 lg:px-10">
            <div className="flex flex-col ">
              <div className="text-stroke font-bold text-xs">
                {t("search:x-rooms", {
                  rooms: roomsFetch.data && totalRooms,
                })}
              </div>
              <div className="text-primary flex gap-1 items-end font-bold text-3xl ">
                {total.toFixed(2)}
                <span className="text-sm text-primary ">{t("common:sar")}</span>
              </div>

              <div className="text-dark-tint text-sm">
                {t("common:VAT-included")}*
              </div>
            </div>

            <button
              onClick={() => reservation()}
              className="btn btn-primary py-4 px-0 w-[150px] "
            >
              {t("button:gonna-book")}
            </button>
          </div>
        </div>
        <div className="bg-grayish pt-16 lg:pt-20 ">
          <section className="flex flex-col  container sm:mx-auto px-6 lg:px-10 gap-4">
            <div className="hidden md:flex items-center justify-start gap-1 text-xs">
              <div className="text-primary font-light   flex justify-start items-center">
                <Link passHref href={"/"}>
                  <div className="cursor-pointer mx-px">{t("common:home")}</div>
                </Link>
                <span className="text-stroke"> {" > "} </span>
              </div>
              <div className=" flex justify-start items-center">
                <div className=" text-dark mx-px">
                  {t("common:search-title")}
                </div>
              </div>
            </div>
            <div className="w-full hidden lg:block">
              <HotelSearch goToSearch={goToSearch} />
            </div>

            <div className="flex gap-5">
              <div className="lg:w-3/12  lg:flex gap-4 flex-col items-start max-w-[18rem]">
                <div className="w-full hidden lg:block">
                  <Filter onFilterChange={handleChangeFilter} />
                </div>
                <Transition
                  show={isMobileFilterOpen}
                  as={Fragment}
                  enter="transition ease-in-out duration-100"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in-out duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed flex lg:hidden flex-col w-full h-full top-0 start-0 z-50 bg-white">
                    <div className="flex justify-between items-center mb-2 shadow-md w-full py-5 px-6">
                      <i
                        onClick={() => {
                          setTimeout(() => {
                            setIsMobileFilterOpen(false)
                          }, 0)
                        }}
                        className="icon-close_black_24dp text-2xl text-primary cursor-pointer transform ltr:rotate-180"
                      ></i>
                      <div className="font-bold">{t("button:filter")}</div>
                      <i className="icon-chevron_left_black_24dp-1 text-2xl invisible"></i>
                    </div>
                    <div className="w-full flex flex-col gap-2 overflow-y-auto">
                      <Filter onFilterChange={handleChangeFilter} />
                    </div>
                    <div className="px-6 py-5 mt-auto w-full shadow-t-md">
                      <button
                        onClick={() => {
                          setIsMobileFilterOpen(false)
                        }}
                        className="btn btn-primary "
                      >
                        {t("button:apply")}
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>

              <div className="lg:w-9/12 w-full py-1 lg:py-0  flex flex-col  ">
                {roomsFetch.isLoading ? (
                  <LoadingCard />
                ) : (
                  <>
                    <div className=" justify-between items-center mb-5 hidden md:flex">
                      <div className="text-xl font-bold text-dark">
                        {t("search:available-x-rooms", {
                          room:
                            roomsFetch.data?.length > 0 &&
                            roomsFetch.data?.length,
                        })}
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xl text-dark-tint">
                          {t("common:sort-by")}
                        </span>
                        <div className="z-[5]">
                          <SortDrop />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Transition as={Fragment} show={isSearchCardOpen}>
                  <div className=" fixed flex lg:hidden flex-col w-full h-full top-0 start-0 z-50 bg-white">
                    <div className="flex justify-between items-center mb-2 shadow-md w-full py-5 px-6">
                      <i
                        onClick={() => {
                          setTimeout(() => {
                            setIsSearchCardOpen(false)
                          }, 0)
                        }}
                        className="icon-close_black_24dp text-2xl text-primary cursor-pointer transform ltr:rotate-180"
                      ></i>
                      <div className="font-bold">
                        {" "}
                        {t("common:search-title")}
                      </div>
                      <i className="icon-chevron_left_black_24dp-1 text-2xl invisible"></i>
                    </div>
                    <div>
                      <DatePicker
                        chosenDates={{
                          startDate: new Date(searchData.checkin),
                          endDate: new Date(searchData.checkout),
                        }}
                        changeDate={handleChangeDate}
                      />

                      <ClientsNumberDrop
                        chosenNum={{
                          id: searchData.clients,
                          value: searchData.clients.toString(),
                        }}
                        onChangeDirection={(clients) =>
                          setSearchData({ ...searchData, clients: clients })
                        }
                      />
                      <RoomsNumberDrop
                        chosenNum={{
                          id: searchData.rooms,
                          value: searchData.rooms.toString(),
                        }}
                        onChangeDirection={(rooms) =>
                          setSearchData({ ...searchData, rooms: rooms })
                        }
                      />
                      <div
                        className={`relative w-full  flex    items-center gap-2 p-2.5   ${
                          router.pathname !== "/hotel"
                            ? "lg:w-4/12"
                            : "lg:w-3/12"
                        } `}
                      >
                        <i className="icon-local_offer_black_24dp text-primary text-2xl"></i>

                        <div className="">
                          <div className="text-dark-dates text-xs  ">
                            {t("input:promo-code")}
                          </div>
                          <input
                            className="p-0 placeholder-dark-shade border-0 font-bold"
                            type="text"
                            placeholder={t("input:promo-code") + "..."}
                            onChange={(event) =>
                              setSearchData({
                                ...searchData,
                                promocode: event.target.value,
                              })
                            }
                            value={searchData.promocode}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-5 mt-auto w-full">
                      <button
                        className="btn btn-primary "
                        onClick={() =>
                          goToSearch({
                            clients: searchData.clients,
                            rooms: searchData.rooms,
                            checkin: searchData.checkin,
                            checkout: searchData.checkout,
                            promocode: searchData.promocode,
                          })
                        }
                      >
                        {t("button:apply")}
                      </button>
                    </div>
                  </div>
                </Transition>

                {/* End Card for update date and promocode */}
                <div className="  flex flex-col gap-5 mt-10 ">
                  {/* Start Filter mobile buttons */}
                  <div className="flex items-center bg-white  lg:hidden py-[2px]">
                    <button
                      onClick={() => setIsSearchCardOpen(true)}
                      className="py-2 w-full flex items-center gap-1 justify-center border-l border-solid border-dark-tint text-sm font-bold px-0"
                    >
                      <i className="icon-search_black_24dp-3 text-primary"></i>
                      {t("common:search-title")}
                    </button>
                    <button
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="py-2 w-full flex items-center gap-1 border-l justify-center border-solid border-dark-tint text-sm font-bold px-0"
                    >
                      <i className="icon-filter_alt_black_24dp text-primary"></i>
                      {t("button:filter")}
                    </button>
                    <button className="py-2 justify-center w-full flex items-center gap-1 text-sm font-bold px-0">
                      <i className="icon-filter_list_black_24dp text-primary"></i>
                      {t("button:sort")}
                    </button>
                  </div>
                  {/* End Filter mobile buttons */}

                  <div className="flex flex-col items-start gap-5 mb-8 relative">
                    {/* {rooms.map((room) =>
                      room.Data.map((item, idx) => (
                        <div
                          key={idx}
                          className="w-full shadow-md cursor-pointer"
                          onClick={() => {
                            setSelectedRoomStorage(item)
                          }}
                        >
                          <Link
                            passHref
                            href={{
                              pathname: `/hotel/room-details`,
                              query: {
                                ...router.query,
                              },
                            }}
                          >
                            <div className="h-full">
                              <SearchHotelCard
                                pic={getRoomPicture(item.RoomTypeId)}
                                room={item}
                              />
                            </div>
                          </Link>
                        </div>
                      ))
                    )} */}

                    {roomsFetch.isLoading ? (
                      <LoadingCard />
                    ) : (
                      roomsFetch.data &&
                      roomsFetch.data.map((room, idx) => (
                        <div key={idx} className="h-full w-full">
                          <SearchHotelCard
                            onSelectRoom={selectRoom}
                            pic={room.Image}
                            room={room}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* <Pagination /> */}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queries = context.query

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

export default Search
