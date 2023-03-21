import { Combobox, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo, useState } from "react";

type Num = {
	id: number;
	value: string;
};
type Props = {
	onChangeDirection: (data: any) => void;
	chosenNum?: { id: number; value: string };
};

const numbers = [
	{ id: 1, value: "1" },
	{ id: 2, value: "2" },
	{ id: 3, value: "3" },
	{ id: 4, value: "4" },
	{ id: 5, value: "5" },
	{ id: 6, value: "6" },
	{ id: 7, value: "7" },
	{ id: 8, value: "8" },
	{ id: 9, value: "9" },
	{ id: 10, value: "10" },
];

const RoomsNumberDrop = ({ onChangeDirection, chosenNum }: Props) => {
	const { t, i18n } = useTranslation(["input", "button", "home"]);
	const [selectedNumber, setSelectedNumber] = useState(numbers[0]);
	useEffect(() => {
		setSelectedNumber({
			id: chosenNum.id ? chosenNum.id : 1,
			value: chosenNum.value ? chosenNum.value : "1",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chosenNum]);
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [isMobileDropOpen, setIsMobileDropOpen] = useState(false);

	return (
		<Fragment>
			<Combobox
				className={`hidden   relative justify-between lg:flex flex-col gap-2  p-2.5 w-3/12  border-r border-solid  border-dark-tint`}
				as={"div"}
				value={selectedNumber}
				onChange={setSelectedNumber}>
				{({ open }) => (
					<>
						<Combobox.Button className={"h-full flex items-center gap-2"}>
							<i className="icon-king_bed_black_24dp text-primary text-2xl"></i>
							<div className="flex flex-col items-start">
								<div className={`text-xs text-dark-dates  `}>
									{t("common:rooms-number")}
								</div>
								<div className="flex justify-between items-center gap-4  px-2  w-full bg-white ">
									<Combobox.Input
										className="p-0 placeholder-dark-shade border-0 font-bold"
										onChange={(event) => setQuery(event.target.value)}
										placeholder={t("common:rooms-number")}
										displayValue={(number: Num) => number.value}
									/>
									<i className="icon-arrow_drop_down_black_24dp-2  text-primary text-lg"></i>
								</div>
							</div>
						</Combobox.Button>
						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => setQuery("")}>
							<Combobox.Options
								className={`absolute start-0 w-full overflow-y-auto bg-white flex flex-col gap-1 p-4 z-50 ${
									router.pathname !== "/hotel/search" ? " top-24" : "top-full"
								}`}>
								{numbers.map((number, idx) => (
									<Combobox.Option
										key={number.id}
										value={number}
										className={
											"cursor-pointer border-b border-solid border-dark-tint last:border-b-0 pb-1 last:pb-0"
										}
										onClick={() => {
											setSelectedNumber(number);
											onChangeDirection(number.id);
										}}>
										{number.value}
									</Combobox.Option>
								))}
							</Combobox.Options>
						</Transition>
					</>
				)}
			</Combobox>

			<div className="lg:hidden p-2.5 lg:p-5 pt-0 ">
				<div className=" flex items-center gap-2 border-b border-dark-tint border-solid">
					<i className="icon-king_bed_black_24dp text-primary text-xl"></i>
					<div
						onClick={() => setIsMobileDropOpen(true)}
						className={`lg:hidden flex flex-col gap-1 w-full `}>
						<div className="text-dark-dates text-xs">
							{t("common:rooms-number")}
						</div>

						<div className="flex items-center justify-between text-sm md:text-xl py-2 px-4 ">
							<input
								className="p-0 placeholder-dark-shade border-0 font-bold"
								type="text"
								placeholder={t("common:rooms-number")}
								readOnly
								value={selectedNumber.id}
							/>
							<i className="icon-arrow_drop_down_black_24dp-2  text-primary"></i>
						</div>
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
				afterLeave={() => setQuery("")}>
				<div className="fixed flex lg:hidden flex-col w-full h-full top-0 start-0 z-50 bg-white">
					<div className="flex justify-between items-center mb-2 shadow-md py-5 px-6">
						<i
							onClick={() => {
								setTimeout(() => {
									setIsMobileDropOpen(false);
								}, 0);
							}}
							className="icon-close_black_24dp text-2xl text-primary cursor-pointer transform ltr:rotate-180"></i>
						<div className="font-bold">{t("common:rooms-number")}</div>
						<i className="icon-chevron_left_black_24dp-1 text-2xl invisible"></i>
					</div>
					<div className="w-full flex flex-col gap-2 py-5 px-4 overflow-y-scroll">
						{numbers.map((number) => (
							<div
								onClick={() => {
									setSelectedNumber(number);
									onChangeDirection(number.id);
								}}
								key={number.id}
								className="flex justify-between items-center gap-2 border-b border-solid border-dark-tint pb-4">
								<div>{number.value}</div>

								<label className="inline-flex items-center">
									<input
										type="radio"
										className="form-radio focus:ring-0 text-secondary"
										name="radio"
										onChange={() => setSelectedNumber(number)}
										checked={selectedNumber.id === number.id}
									/>
								</label>
							</div>
						))}
					</div>
					<div className="px-6 py-5 mt-auto w-full shadow-t-md">
						<button
							onClick={() => {
								setIsMobileDropOpen(false);
							}}
							className="btn btn-primary ">
							{t("button:apply")}
						</button>
					</div>
				</div>
			</Transition>
		</Fragment>
	);
};

export default RoomsNumberDrop;
