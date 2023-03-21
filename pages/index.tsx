import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/layout";
import nextI18NextConfig from "../i18n/next-i18next.config.js";
import HotelSearch from "../components/hotels-search";
import Image from "next/image";
import { useRef, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";

import HeadSeo from "../components/HeadSeo";
import siteMetadata from "../data/siteMetadata";
import ModalError from "../components/ModalError";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";

const Home: NextPage<{}> = () => {
	const { t } = useTranslation(["common", "home", "button", "validation"]);

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		reValidateMode: "onChange",
		mode: "all",
	});

	const onSubmit = (data) => {
		if (isValid) {
			console.log(data);
		} else {
			setShowModal(true);
		}
	};
	const [isFollowUsOpen, setIsFollowUsOpen] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [videoPlaying, setVideoPlaying] = useState(false);
	const videoHandler = (playing: boolean) => {
		if (videoRef.current) {
			if (playing) {
				videoRef.current.play();
				setVideoPlaying(true);
			} else {
				videoRef.current.pause();
				setVideoPlaying(false);
			}
		}
	};

	const router = useRouter();
	const [service, setService] = useState("restaurant");
	const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
		useLocalStorage("chosenRooms", []);
	const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
		useLocalStorage("chosenHotel", {});
	const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
		"guestInfo",
		{}
	);
	const [
		selectedHotelStorage,
		setSelectedHotelStorage,
		removeSelectedHotelStorage,
	] = useLocalStorage("selectedHotel", {});

	const [showModal, setShowModal] = useState(false);
	const handleGoToSearch = (data) => {
		if (true) {
			router.push({
				pathname: "hotel/search",
				query: data,
			});
			removeChosenRoomsStorage();
			removeChosenHotelStorage();
			removeGuestInfo();
			removeSelectedHotelStorage();
		} else {
			setShowModal(true);
		}
	};
	return (
		<>
			<HeadSeo
				title={t("home:violet")}
				description={t("home:violet")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<Disclosure
					onMouseEnter={() => {
						setIsFollowUsOpen(true);
					}}
					onMouseLeave={() => {
						setIsFollowUsOpen(false);
					}}
					as="div"
					className="fixed z-30 hidden lg:inline-flex top-[calc(50%-56px)] ltr:origin-top-right ltr:right-full rtl:origin-top-left rtl:left-full transform ltr:-rotate-90 rtl:rotate-90">
					<div className="relative">
						<Disclosure.Button
							className={
								"flex flex-col justify-center items-center gap-4 p-4 h-14 w-32 bg-secondary"
							}>
							<div className="text-xs">{t("button:follow-us")}</div>
						</Disclosure.Button>
						<Transition
							as={Fragment}
							show={isFollowUsOpen}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0">
							<Disclosure.Panel
								static
								as="div"
								className={
									"absolute rtl:left-full ltr:right-full bottom-0 w-32 py-4 h-14 bg-secondary flex flex-row-reverse gap-6"
								}>
								<a
									href="https://twitter.com/violet1hotel"
									className="transform rotate-90 rtl:-rotate-90"
									target="_blank"
									rel="noopener noreferrer">
									<i className="icon-icons8-twitter text-lg text-primary "></i>
								</a>
								<a
									href="https://www.facebook.com/violet1hotel"
									className="transform rotate-90 rtl:-rotate-90"
									target="_blank"
									rel="noopener noreferrer">
									<i className="icon-icons8-facebook text-lg text-primary "></i>
								</a>
								<a
									href="https://instagram.com/violet1hotel?igshid=wivx9bmiwmfc"
									className="transform rotate-90 rtl:-rotate-90"
									target="_blank"
									rel="noopener noreferrer">
									<i className="icon-Group-102 text-lg text-primary "></i>
								</a>
							</Disclosure.Panel>
						</Transition>
					</div>
				</Disclosure>
				<section className="bg-hero-pattern bg-cover bg-center relative w-screen h-screen flex justify-center items-center">
					<div className="container pt-20 lg:pt-80 sm:mx-auto px-6 lg:px-10">
						<HotelSearch goToSearch={handleGoToSearch} />
					</div>
				</section>

				<section className="relative py-20 lg:py-28">
					<div className="grid grid-cols-2 gap-10 container sm:mx-auto px-10 lg:px-48 ">
						<div className="col-span-2  flex flex-col justify-center items-center gap-4 text-dark">
							<i className="icon-room_service_FILL0_wght400_GRAD0_opsz48 text-primary text-4xl"></i>
							<h2 className=" font-bold text-xl">{t("home:lux-hotel")}</h2>
							<p className="text-center text-sm leading-7">
								{t("home:lux-hotel-paragraph")}
							</p>
						</div>

						<div className="col-span-2 lg:col-span-1 flex flex-col justify-center items-center gap-4 text-dark">
							<i className="icon-loyalty_black_24dp text-primary text-4xl"></i>
							<h2 className=" font-bold text-xl">{t("home:reward")}</h2>
							<p className="text-center text-sm leading-7">
								{t("home:reward-paragraph")}
							</p>
						</div>

						<div className="col-span-2 lg:col-span-1 flex flex-col justify-center items-center gap-4 text-dark">
							<i className="icon-payments_black_24dp text-primary text-4xl"></i>
							<h2 className=" font-bold text-xl">{t("home:ratio-price")}</h2>
							<p className="text-center text-sm leading-7">
								{t("home:ratio-price-paragraph")}
							</p>
						</div>
					</div>
				</section>

				<section className=" pb-16">
					<div className="container sm:mx-auto px-6 lg:px-10 flex flex-col gap-10">
						<h1 className="text-dark text-xl font-extrabold">
							{t("home:services")}
						</h1>

						<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-fitness_center_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:gym")}</span>
							</div>

							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-mosque_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:mosquet")}</span>
							</div>
							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-cake_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:events")}</span>
							</div>
							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-spa_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:sawna")}</span>
							</div>

							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-hot_tub_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:hot-tub")}</span>
							</div>

							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-child_care_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:children-club")}</span>
							</div>

							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-restaurant_black_24dp-1 text-primary text-xl"></i>
								<span className="text-xs">{t("home:restaurant")}</span>
							</div>

							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-pool_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:pool")}</span>
							</div>
							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-local_cafe_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:cafe")}</span>
							</div>

							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-wifi_black_24dp-1 text-primary text-xl"></i>
								<span className="text-xs">{t("home:free-wifi")}</span>
							</div>
							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-room_service_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:rooms-service")}</span>
							</div>
							<div className="col-span-1 flex items-center gap-2">
								<i className="icon-drive_eta_black_24dp text-primary text-xl"></i>
								<span className="text-xs">{t("home:free-parking")}</span>
							</div>
						</div>
					</div>
				</section>

				<section className="pt-8 bg-secondary">
					<div className="flex flex-col  lg:flex-row gap-4">
						<div className="flex flex-col gap-8 text-dark container sm:mx-auto px-6 lg:px-10 lg:w-full lg:justify-center text-sm leading-7 ">
							<h1 className=" text-4xl font-extrabold">{t("home:summary")}</h1>
							<p> {t("home:summary-paragraph-1")}</p>
							<p>{t("home:summary-paragraph-2")}</p>
							<p>{t("home:summary-paragraph-3")}</p>
							<p>{t("home:summary-paragraph-4")}</p>
							<p>{t("home:summary-paragraph-5")}</p>
						</div>
						<div className="lg:w-full">
							<div className="relative w-full h-[270px] lg:hidden">
								<Image
									layout="fill"
									src="/photos/summary.png"
									alt="violet-hotel-image"
									objectFit="fill"></Image>
							</div>
							<div className="relative w-full h-[400px] hidden lg:block">
								<Image
									layout="fill"
									src="/photos/summary.png"
									alt="violet-hotel-image"
									objectFit="fill"></Image>
							</div>
							<div className="bg-dark text-white p-4 pb-20 md:p-10 lg:p-12 flex flex-col gap-4 lg:gap-8">
								<h2 className="text-xl font-extrabold">
									{t("home:address-1")}
								</h2>
								<h2 className="text-xl">{t("home:address-2")}</h2>
								<div className="w-16 h-[2px] bg-primary"></div>
								<div className="flex items-center gap-4 font-extrabold">
									<span>{t("home:phone")}</span>
									<span dir="ltr">{t("home:phone-number")}</span>
								</div>
								<div className="w-16 h-[2px] bg-primary"></div>
								<div className="grid grid-cols-1 lg:grid-cols-2 text-xl gap-4">
									<div className="col-span-1 flex items-center gap-2">
										<i className="icon-email_black_24dp-3"></i>
										<span>{t("home:address-mail")}</span>
									</div>
									<div className="col-span-1 flex items-center gap-2">
										<i className="icon-fmd_good_black_24dp-2"></i>
										<span>{t("home:see-map")}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12 text-dark">
					<div className="container sm:mx-auto px-6 lg:px-10 flex flex-col gap-8 ">
						<h1 className="text-5xl font-extrabold">{t("home:rooms")}</h1>
						<div className="my-5 flex flex-col gap-5">
							<div className="flex items-center gap-2 text-xl">
								<span className=" font-medium">{t("home:rooms")}</span>
								<span>(6 {t("home:types")})</span>
							</div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<Link
									passHref
									href={{
										pathname: `/rooms`,
									}}>
									<div className="flex flex-col gap-3 cursor-pointer  ">
										<div className="relative w-full h-[240px] lg:hidden">
											<Image
												layout="fill"
												src="/photos/king-bed.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="relative w-full h-[410px] hidden lg:block">
											<Image
												layout="fill"
												src="/photos/king-bed.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="font-bold text-xl">
											{t("home:king-room")}
										</div>
										<div className="text-sm">{t("home:king-room-details")}</div>
										<div className="w-16 h-[2px] bg-primary"></div>
									</div>
								</Link>
								<Link
									passHref
									href={{
										pathname: `/rooms`,
									}}>
									<div className="flex flex-col gap-3 cursor-pointer ">
										<div className="relative w-full h-[240px] lg:hidden">
											<Image
												layout="fill"
												src="/photos/familial-suit.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="relative w-full h-[410px] hidden lg:block">
											<Image
												layout="fill"
												src="/photos/familial-suit.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="font-bold text-xl">
											{t("home:familial-suit")}
										</div>
										<div className="text-sm">
											{t("home:familial-suit-details")}
										</div>
										<div className="w-16 h-[2px] bg-primary"></div>
									</div>
								</Link>
							</div>

							<div className="lg:hidden border border-solid border-primary py-4 cursor-pointer text-center text-dark">
								{t("home:see-all-rooms")}
							</div>
							<div className="hidden lg:flex justify-center mt-8  items-center gap-8">
								<div className="w-1/4 h-[2px] bg-primary"></div>
								<div className="border border-solid w-[260px] border-primary py-4 cursor-pointer text-center text-dark">
									{t("home:see-all-rooms")}
								</div>
								<div className="w-1/4 h-[2px] bg-primary"></div>
							</div>
						</div>

						<div className="my-5 flex flex-col gap-5">
							<div className="flex items-center gap-2">
								<span className="text-xl font-medium">{t("home:suits")}</span>
								<span>(3 {t("home:types")})</span>
							</div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<Link
									passHref
									href={{
										pathname: `/rooms`,
									}}>
									<div className="flex flex-col gap-3 cursor-pointer ">
										<div className="relative w-full h-[240px] lg:hidden">
											<Image
												layout="fill"
												src="/photos/king-bed.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="relative w-full h-[410px] hidden lg:block">
											<Image
												layout="fill"
												src="/photos/king-bed.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>

										<div className="font-bold text-xl">
											{t("home:king-room")}
										</div>
										<div className="text-sm">{t("home:king-room-details")}</div>

										<div className="w-16 h-[2px] bg-primary"></div>
									</div>
								</Link>
								<Link
									passHref
									href={{
										pathname: `/rooms`,
									}}>
									<div className="flex flex-col gap-3 cursor-pointer ">
										<div className="relative w-full h-[240px] lg:hidden">
											<Image
												layout="fill"
												src="/photos/king-bed.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="relative w-full h-[410px] hidden lg:block">
											<Image
												layout="fill"
												src="/photos/king-bed.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="font-bold text-xl">
											{t("home:familial-suit")}
										</div>
										<div className="text-sm">
											{t("home:familial-suit-details")}
										</div>
										<div className="w-16 h-[2px] bg-primary"></div>
									</div>
								</Link>
							</div>

							<div className="lg:hidden border border-solid border-primary py-4 cursor-pointer text-center text-dark">
								{t("home:see-all-rooms")}
							</div>
							<div className="hidden lg:flex justify-center mt-8  items-center gap-8">
								<div className="w-1/4 h-[2px] bg-primary"></div>
								<div className="border border-solid w-[260px] border-primary py-4 cursor-pointer text-center text-dark">
									{t("home:see-all-suits")}
								</div>
								<div className="w-1/4 h-[2px] bg-primary"></div>
							</div>
						</div>

						<div className="my-5 flex flex-col gap-5">
							<div className="flex items-center gap-2">
								<span className="text-xl font-medium">
									{t("home:appartements")}
								</span>
								<span> {t("home:one-type")}</span>
							</div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<Link
									passHref
									href={{
										pathname: `/rooms`,
									}}>
									<div className="flex flex-col gap-3 cursor-pointer ">
										<div className="relative w-full h-[240px] lg:hidden">
											<Image
												layout="fill"
												src="/photos/familial-suit.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="relative w-full h-[410px] hidden lg:block">
											<Image
												layout="fill"
												src="/photos/familial-suit.png"
												alt="violet-hotel-image"
												objectFit="fill"></Image>
											<div className="absolute right-1/2 bottom-7 flex items-center justify-center gap-4 translate-x-1/2">
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_next_black_24dp-2"></i>
												</div>
												<div className="btn-primary p-5 h-[42px] w-[42px] flex items-center justify-center cursor-pointer">
													<i className="icon-navigate_before_black_24dp"></i>
												</div>
											</div>
										</div>
										<div className="font-bold text-xl">
											{t("home:familial-suit")}
										</div>
										<div className="text-sm">
											{t("home:familial-suit-details")}
										</div>
										<div className="w-16 h-[2px] bg-primary"></div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12 flex flex-col gap-8">
					<div className="container sm:mx-auto px-6 lg:px-10">
						<h1 className="text-dark text-3xl font-extrabold lg:hidden">
							{t("home:summary")}
						</h1>

						<h1 className="text-dark text-3xl font-extrabold hidden lg:block">
							{t("home:summary-in-desktop")}
						</h1>
					</div>
					<div className="relative">
						<video
							autoPlay
							loop
							muted
							onClick={() => videoHandler(false)}
							ref={videoRef}
							className=" w-full ">
							<source src={"/vids/violet-hotel.mp4"} type="video/mp4" />
						</video>

						{!videoPlaying && (
							<div
								onClick={() => videoHandler(true)}
								className="icon-Group-101 z-10 absolute text-8xl right-1/2 text-black top-1/2 translate-x-1/2 -translate-y-1/2  cursor-pointer flex items-center justify-center h-10 w-10 rounded-full bg-white gap-1">
								<span className="h-5 w-1 bg-black"></span>
								<span className="h-5 w-1 bg-black"></span>
							</div>
						)}
					</div>
				</section>

				<section className="pb-32 text-dark">
					<div className="container sm:mx-auto px-6 lg:px-10 flex flex-col gap-8 ">
						<h1 className="text-4xl font-bold">{t("home:gouts")}</h1>
						<div className="flex flex-col lg:flex-row lg:items-center gap-8">
							<div className="flex gap-4 w-full h-[300px] lg:h-[400px] lg:gap-20">
								<div className="w-[1px] h-[90%] bg-primary"></div>
								<div className="relative w-full h-full">
									<Image
										layout="fill"
										src="/photos/summary.png"
										alt="violet-hotel-image"
										objectFit="fill"></Image>
								</div>
							</div>
							<div className="text-sm leading-7 p-7">
								{t("home:gouts-details")}
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};
export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input", "validation"],
				nextI18NextConfig
			)),
		},
	};
};
export default Home;
