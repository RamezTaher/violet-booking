import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { type } from "os"
import React, { useEffect, useState } from "react"
import DatePicker from "./date-picker"
import DirectionDrop from "./direction-drop"
import format from "date-fns/format"
import { addDays } from "date-fns"
import ClientsNumberDrop from "./ClientsNumberDrop"
import RoomsNumberDrop from "./RoomsNumberDrop"

type Props = {
  goToSearch: (_data: any) => void
}

const HotelSearch = ({ goToSearch }: Props) => {
  const { t } = useTranslation(["input", "button", "home"])
  const router = useRouter()
  const [queriesObject, setQueriesObject] = useState<{
    checkin: string
    checkout: string
    clients: number
    rooms: number
    promocode: string
  }>({
    clients: 2,
    rooms: 1,
    checkin: router.query.checkin
      ? (router.query.checkin as string)
      : format(addDays(new Date(), 1), "yyyy-MM-dd"),
    checkout: router.query.checkout
      ? (router.query.checkout as string)
      : format(addDays(new Date(), 2), "yyyy-MM-dd"),
    promocode: router.query.promocode ? (router.query.promocode as string) : "",
  })
  const handleChangeDate = (data) => {
    setQueriesObject({
      ...queriesObject,
      checkin: format(data.startDate, "yyyy-MM-dd"),
      checkout: format(
        data.endDate ? data.endDate : data.startDate,
        "yyyy-MM-dd"
      ),
    })
  }

  useEffect(() => {
    setQueriesObject({
      ...queriesObject,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <div
      className={` flex flex-col lg:flex-row lg:justify-between w-full   pt-2.5  lg:p-0 bg-transparent lg:gap-10`}
    >
      <div className="bg-white w-full  lg:flex ">
        <DatePicker
          chosenDates={{
            startDate: new Date(queriesObject.checkin),
            endDate: new Date(queriesObject.checkout),
          }}
          changeDate={handleChangeDate}
        />
        <ClientsNumberDrop
          chosenNum={{
            id: queriesObject.clients,
            value: queriesObject.clients.toString(),
          }}
          onChangeDirection={(clients) =>
            setQueriesObject({ ...queriesObject, clients: clients })
          }
        />
        <RoomsNumberDrop
          chosenNum={{
            id: queriesObject.rooms,
            value: queriesObject.rooms.toString(),
          }}
          onChangeDirection={(rooms) =>
            setQueriesObject({ ...queriesObject, rooms: rooms })
          }
        />
        <div
          className={`relative w-full  flex border-r border-solid   items-center gap-2 p-2.5  border-b lg:border-b-0   border-dark-tint ${
            router.pathname !== "/hotel" ? "lg:w-4/12" : "lg:w-3/12"
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
                setQueriesObject({
                  ...queriesObject,
                  promocode: event.target.value,
                })
              }
              value={queriesObject.promocode}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => goToSearch(queriesObject)}
        className={`btn w-full btn-primary py-5 px-2 lg:w-2/12 text-xl font-bold mt-4 lg:mt-0 bg-primary `}
      >
        <i className="icon-search_black_24dp-3 text-2xl"></i>
        {t("common:search")}
      </button>
    </div>
  )
}

export default HotelSearch
