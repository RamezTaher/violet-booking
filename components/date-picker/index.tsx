import { Popover, Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import React, { Fragment, useState } from "react"
import { useRouter } from "next/router"
import {
  FocusedInput,
  OnDatesChangeProps,
  START_DATE,
  useDatepicker,
  useMonth,
} from "@datepicker-react/hooks"

import { addDays, getMonth } from "date-fns"
import DatePickerContext from "./date-picker-context"
import Month from "./month"
import { getDayName, getMonthName } from "../../utils/date-utils"
type Props = {
  changeDate: (data: any) => void
  updateInfo?: any
  chosenDates?: { startDate: Date; endDate: Date }
}
const date = new Date()
const DatePicker = ({ changeDate, chosenDates }: Props) => {
  const [state, setState] = useState<{
    startDate: Date | null
    endDate: Date | null
    focusedInput: FocusedInput
  }>({
    startDate: chosenDates.startDate ? chosenDates.startDate : addDays(date, 1),
    endDate: chosenDates.endDate ? chosenDates.endDate : addDays(date, 2),
    focusedInput: START_DATE,
  })
  const { pathname } = useRouter()

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    isStartDate,
    isEndDate,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToNextMonthsByOneMonth,
    goToPreviousMonthsByOneMonth,
  } = useDatepicker({
    startDate: state.startDate,
    endDate: state.endDate,
    focusedInput: state.focusedInput,
    onDatesChange: handleDateChange,
    minBookingDate: addDays(date, 1),
  })
  function handleDateChange(data: OnDatesChangeProps) {
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE })
    } else {
      setState(data)
    }
    changeDate(data)
  }

  const { t, i18n } = useTranslation(["input", "button", "home"])
  const router = useRouter()

  const [isMobileDropOpen, setIsMobileDropOpen] = useState(false)
  return (
    <Fragment>
      <div
        className={`hidden relative justify-between lg:flex flex-col gap-4 h-full p-2.5 border-l border-solid  border-dark-tint w-6/12`}
      >
        <Popover className="h-full">
          {({ open }) => (
            <>
              <Popover.Button
                as="div"
                className={"w-full h-full flex   gap-4 cursor-pointer"}
              >
                <div className="flex items-center gap-4  w-1/2">
                  <i className="icon-calendar_today_black_24dp-1 text-2xl text-primary"></i>
                  <div className="flex flex-col gap-1">
                    <span className="text-dark-dates text-xs">
                      {t("input:arrival-date")}
                    </span>
                    <div className="text-dark-shade text-base font-medium">
                      {state.startDate
                        ? state.startDate.toLocaleDateString(
                            i18n.language === "ar" ? "ar-eg" : "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : t("input:choose-date")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 w-1/2">
                  <div className="flex flex-col gap-1">
                    <span className="text-dark-dates text-xs">
                      {t("input:exit-date")}
                    </span>
                    <div className="text-dark-shade text-base font-medium">
                      {state.endDate
                        ? state.endDate.toLocaleDateString(
                            i18n.language === "ar" ? "ar-eg" : "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : t("input:choose-date")}
                    </div>
                  </div>
                  <i className="icon-calendar_today_black_24dp-1 text-2xl text-primary"></i>
                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-50 w-[30rem] ltr:right-[calc(50%-15rem)] rtl:left-[calc(50%-15rem)] bg-white shadow-md p-2.5 lg:p-5 top-28">
                  <DatePickerContext.Provider
                    value={{
                      focusedDate,
                      isDateFocused,
                      isDateSelected,
                      isDateHovered,
                      isDateBlocked,
                      isStartDate,
                      isEndDate,
                      isFirstOrLastSelectedDate,
                      onDateSelect,
                      onDateFocus,
                      onDateHover,
                      goToNextMonthsByOneMonth,
                      goToPreviousMonthsByOneMonth,
                    }}
                  >
                    <div className="text-center text-sm pb-2.5 border-b border-solid border-secondary-tint">
                      {t("input:pick-enter-exit-date")}
                    </div>
                    <div className="py-2 flex">
                      {activeMonths.map((month, index) => (
                        <div
                          key={`${month.year}-${month.month}`}
                          className="w-1/2 first:border-e border-solid border-secondary-tint"
                        >
                          <Month
                            index={index}
                            year={month.year}
                            month={month.month}
                            firstDayOfWeek={firstDayOfWeek}
                          />
                        </div>
                      ))}
                    </div>
                  </DatePickerContext.Provider>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      <div
        onClick={() => setIsMobileDropOpen(true)}
        className={`lg:hidden w-full flex flex-col justify-between gap-2 p-2.5 lg:p-5 cursor-pointer `}
      >
        <div className="flex items-center gap-4 border-b border-dark-tint border-solid pb-3">
          <i className="icon-calendar_today_black_24dp-1 text-xl text-primary"></i>
          <div className="flex flex-col gap-1">
            <span className="text-dark-dates text-xs">
              {t("input:arrival-date")}
            </span>
            <div className="text-dark-shade text-base font-medium">
              {state.startDate
                ? state.startDate.toLocaleDateString(
                    i18n.language === "ar" ? "ar-eg" : "en-US",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : t("input:choose-date")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 border-b border-dark-tint border-solid pb-3">
          <i className="icon-calendar_today_black_24dp-1 text-xl text-primary"></i>
          <div className="flex flex-col gap-1">
            <span className="text-dark-dates text-xs">
              {t("input:exit-date")}
            </span>
            <div className="text-dark-shade text-base font-medium">
              {state.endDate
                ? state.endDate.toLocaleDateString(
                    i18n.language === "ar" ? "ar-eg" : "en-US",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : t("input:choose-date")}
            </div>
          </div>
        </div>

        <Transition
          show={isMobileDropOpen}
          as={Fragment}
          enter="transition ease-in-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed flex flex-col items-start w-full h-full inset-0 z-50 bg-white">
            <DatePickerContext.Provider
              value={{
                focusedDate,
                isDateFocused,
                isDateSelected,
                isDateHovered,
                isDateBlocked,
                isStartDate,
                isEndDate,
                isFirstOrLastSelectedDate,
                onDateSelect,
                onDateFocus,
                onDateHover,
                goToNextMonthsByOneMonth,
                goToPreviousMonthsByOneMonth,
              }}
            >
              <div className="shadow-md px-6 py-5 w-full">
                <div className="flex justify-between items-center mb-2">
                  <i
                    onClick={() => {
                      setTimeout(() => {
                        setIsMobileDropOpen(false)
                      }, 0)
                    }}
                    className="icon-navigate_next_black_24dp-2 text-2xl text-primary cursor-pointer transform ltr:rotate-180"
                  ></i>
                  <div className="text-sm font-bold">
                    {t("common:calendar")}
                  </div>
                  <i className="icon-navigate_before_black_24dp-2 text-2xl invisible"></i>
                </div>
                <div className="flex justify-center items-center gap-8">
                  <div>
                    <div className="text-xxs text-dark leading-none">
                      {t("input:enter")}
                    </div>
                    <div className="flex justify-start items-center gap-1">
                      <div className="text-5xl font-bold">
                        {state?.startDate ? state.startDate.getDate() : "01"}
                      </div>
                      <div className="flex flex-col text-xxs leading-none">
                        <div>
                          {state?.startDate
                            ? getDayName(
                                state.startDate,
                                i18n.language === "ar" ? "ar-eg" : "en-US"
                              )
                            : t("common:day")}
                        </div>
                        <div className="text-dark">
                          {state?.endDate
                            ? getMonthName(
                                state.endDate,
                                i18n.language === "ar" ? "ar-eg" : "en-US"
                              )
                            : t("common:day")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <i className="icon-Path-8650 text-2xl transform ltr:rotate-180"></i>
                  <div>
                    <div className="text-xxs text-dark leading-none">
                      {t("input:exit")}
                    </div>
                    <div className="flex justify-start items-center gap-1">
                      <div className="text-5xl font-bold">
                        {state?.endDate ? state.endDate.getDate() : "01"}
                      </div>
                      <div className="flex flex-col text-xxs leading-none">
                        <div>
                          {state?.endDate
                            ? getDayName(
                                state.endDate,
                                i18n.language === "ar" ? "ar-eg" : "en-US"
                              )
                            : t("common:day")}
                        </div>
                        <div className="text-dark">
                          {state?.endDate
                            ? getMonthName(
                                state.endDate,
                                i18n.language === "ar" ? "ar-eg" : "en-US"
                              )
                            : t("common:day")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start w-full p-6 overflow-y-auto">
                {activeMonths.map((month, index) => (
                  <div key={`${month.year}-${month.month}`} className="w-full">
                    <Month
                      index={index}
                      year={month.year}
                      month={month.month}
                      firstDayOfWeek={firstDayOfWeek}
                    />
                  </div>
                ))}
              </div>
              <div
                className="px-6 py-5 mt-auto w-full shadow-t-md"
                onClick={() => {
                  setTimeout(() => {
                    setIsMobileDropOpen(false)
                  }, 0)
                }}
              >
                <button className="btn btn-primary ">
                  {t("button:apply")}
                </button>
              </div>
            </DatePickerContext.Provider>
          </div>
        </Transition>
      </div>
    </Fragment>
  )
}

export default DatePicker
