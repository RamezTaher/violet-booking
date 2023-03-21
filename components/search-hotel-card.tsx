import React, { useState, useEffect } from "react"
import Image from "next/image"
import StartsBox from "./starts-box"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"

type Props = {
  room: any
  pic: any
  onSelectRoom: (_data: any) => void
}

const SearchHotelCard = ({ room, pic, onSelectRoom }) => {
  console.log(room)
  const { t } = useTranslation(["common", "search", "button"])
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [rooms, setRooms] = useState(room.Data)
  const { query } = useRouter()
  useEffect(() => {
    onSelectRoom()
  }, [])
  const inc = (choice) => {
    console.log(choice)
    choice.Quantity = parseInt(choice.Quantity) + 1
    onSelectRoom(choice)
  }
  const dec = (choice: any) => {
    if (!choice.Quantity) {
      choice.Quantity = 0
    } else {
      choice.Quantity = parseInt(choice.Quantity) - 1
    }
    onSelectRoom(choice)
  }

  const selectChoice = (choice) => {
    choice.selected = true
    choice.Quantity = 1
    onSelectRoom(choice)
  }

  return (
    <div className="flex flex-col  shadow-md w-full bg-white">
      <div className="flex flex-col md:flex-row shadow-md w-full bg-white">
        <div className="relative h-[250px] md:h-auto md:min-h-full w-full md:w-1/4">
          <Image
            alt="hotel"
            src={room.Image ? room.Image?.secure_url : "/images/no-hotel.jpg"}
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
        <div className="w-full flex flex-col md:flex-row md:w-3/4">
          <div className="md:w-2/3 w-full p-2.5 md:p-4 ">
            <div className=" flex flex-col gap-3 py-4 text-dark">
              <h2 className="font-bold text-xl ">
                {room.RoomTypeNameAr ?? room.RoomTypeName}
              </h2>

              <div className="flex  items-center gap-6  ">
                <div className="flex items-center gap-1 ">
                  <i className="icon-supervisor_account_black_24dp text-primary text-xl"></i>
                  <span className=" text-xs">
                    {t("search:capacity", {
                      capacity: room.Capacity,
                    })}
                  </span>
                </div>
                <div className=" items-center gap-1 hidden">
                  <i className="icon-king_bed_black_24dp text-primary text-xl"></i>
                  <span className=" text-xs">1 سرير مزدوج كبير جداً</span>
                </div>
              </div>
            </div>
            <div className="flex pb-3 md:pb-0 items-center flex-wrap gap-x-2   text-dark border-b md:border-0 border-solid border-dark-tint">
              {room?.AmenitiesRoomType?.map((item, idx) => (
                <div key={idx}>
                  {item?.Enabled && (
                    <span className="text-xxs">{item?.Name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between md:justify-start md:gap-10 md:flex-col gap-3 p-2.5 md:p-4 w-full md:w-1/3">
            <div className=" flex flex-col">
              <div className="text-primary font-bold text-3xl flex items-end gap-1">
                {room.Data[0].HasPromocode ? (
                  <div className="flex flex-col items-start justify-start">
                    <span className="line-through decoration-danger flex items-center gap-1">
                      <span>{room.Data[0].Price}</span>

                      <span className="text-sm  font-bold">
                        {t("common:sar")}{" "}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>{room.Data[0].PriceToPay}</span>
                      <span className="text-sm font-bold">
                        {t("common:sar")}{" "}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div>
                    <span>{room.Data[0].Price}</span>

                    <span className="text-sm  font-bold">
                      {t("common:sar")}{" "}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-dark text-xs">
                {t("search:for-x-nights", {
                  nights: room.Data[0].NbrNights,
                })}
              </div>
            </div>

            <button
              className={`btn btn-dark w-1/2 cursor-pointer md:w-full hidden `}
            >
              {t("button:book")}
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className={`btn btn-dark w-full cursor-pointer `}
      >
        {t("common:more-info")}{" "}
        <i
          className={`icon-expand_more_black_24dp-2 transition ${
            isAccordionOpen ? "rotate-180 " : ""
          }`}
        ></i>
      </button>
      {isAccordionOpen && (
        <div className="transition p-3 flex flex-col gap-6">
          {rooms.map((choice, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:justify-between gap-3 border-b border-solid border-dark-tint pb-3 last:border-b-0"
            >
              <div className="flex flex-col  gap-1">
                <div className="text-base text-dark font-bold">
                  {room.RoomTypeNameAr ?? room.RoomTypeName}{" "}
                  {choice.ViewNameAr ?? choice.ViewName}
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <i className="icon-local_cafe_black_24dp text-primary text-xl"></i>
                    <span className="text-xs">
                      {choice.MealAr ?? choice.Meal}{" "}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="icon-balcony_black_24dp text-primary text-xl"></i>
                    <span className="text-xs">
                      {choice.ViewNameAr ?? choice.ViewName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between md:w-2/5 items-center">
                <div>
                  {choice.selected && choice.Quantity > 0 && (
                    <div className="w-36 flex items-center">
                      <button
                        className="btn btn-primary w-5 h-5 p-5 text-white rounded-e-none"
                        onClick={() => dec(choice)}
                      >
                        <i className="icon-remove_black_24dp text-lg"></i>
                      </button>

                      <div className="w-full flex items-center justify-center text-dark h-[42px] border-primary border-2 border-solid bg-white font-bold">
                        {choice.Quantity}
                      </div>

                      <button
                        className=" btn btn-primary w-5 h-5 p-5 text-white rounded-s-none"
                        onClick={() => inc(choice)}
                      >
                        <i className="icon-add_black_24dp-2 text-lg"></i>
                      </button>
                    </div>
                  )}

                  {(!choice.selected || choice.Quantity == 0) && (
                    <button
                      className="btn btn-primary w-36"
                      onClick={() => selectChoice(choice)}
                    >
                      {t("button:book")}
                    </button>
                  )}
                </div>

                <div className="text-primary font-bold text-xl ">
                  {choice.HasPromocode ? (
                    <div className="flex flex-col items-start justify-start">
                      <span className="line-through decoration-danger flex items-center gap-1">
                        <span>{choice.Price}</span>

                        <span className="text-sm  font-bold">
                          {t("common:sar")}{" "}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>{choice.PriceToPay}</span>
                        <span className="text-sm font-bold">
                          {t("common:sar")}{" "}
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>{choice.Price}</span>

                      <span className="text-sm  font-bold">
                        {t("common:sar")}{" "}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchHotelCard
