import { Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, Fragment } from "react";
import Image from "next/image";
import LangDrop from "./lang-drop";
import { useLocalStorage } from "react-use";
import SortDrop from "./sort-drop";
const Header = () => {
	const { t } = useTranslation(["common", "button"]);
	const router = useRouter();
	const [pathName, setPathName] = useState(router.pathname);
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [isAuthNavOpen, setIsAuthNavOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const mobileNavRef = useRef(null);
	const [user, setUser, removeUser] = useLocalStorage("user", {
		FirstName: "",
		LastName: "",
	});
	const [token, setToken, removeToken] = useLocalStorage("token", "");
	const [isLogged, setIsLogged] = useState(
		token != null && token != undefined && token != ""
	);
	const openAndCloseAuth = () => {
		setIsMobileNavOpen(false);
		setIsAuthNavOpen(!isAuthNavOpen);
	};
	const openAndCloseMobile = () => {
		setIsAuthNavOpen(false);
		setIsMobileNavOpen(!isMobileNavOpen);
	};
	return (
		<header className={`fixed z-20 w-full bg-white shadow-md text-dark-shade`}>
			<nav
				id="mobile-nav"
				className="flex justify-between items-center gap-4 lg:hidden px-6 container sm:mx-auto z-10 relative">
				<i
					onClick={() => openAndCloseMobile()}
					className="icon-menu_black_24dp-4
          text-primary text-3xl cursor-pointer"></i>
				<Transition as={Fragment} show={isMobileNavOpen}>
					<div
						className="fixed h-full w-full top-[76px] start-0 bg-black/60 z-50"
						onClick={() => openAndCloseMobile()}>
						<Transition.Child
							enter="transition ease-in-out transform duration-300"
							enterFrom="-translate-y-full"
							enterTo="translate-y-0"
							leave="transition ease-in-out transform duration-300"
							leaveFrom="translate-y-0"
							leaveTo="-translate-y-full"
							as={Fragment}>
							<div
								ref={mobileNavRef}
								className={`h-fit w-full bg-white pb-5 pt-3`}>
								<div className="flex flex-col items-start p-5 gap-6 text-base text-dark-shade">
									<div className="w-full  border-solid  border-b border-dark-tint  text-white text-center"></div>
									<Link passHref href={"/"}>
										<div className={`cursor-pointer  w-full`}>
											{t("common:home")}
										</div>
									</Link>
									<Link passHref href={"/rooms"}>
										<div className={`cursor-pointer  w-full`}>
											{t("common:rooms")}
										</div>
									</Link>

									<Link passHref href={"/bookings"}>
										<div className={` cursor-pointer w-full hidden`}>
											{t("common:my-bookings")}
										</div>
									</Link>

									<Link passHref href={"/"}>
										<div className={`w-full cursor-pointer    `}>
											{t("common:terms-conditions")}
										</div>
									</Link>
									<Link passHref href={"/"}>
										<div className={`w-full cursor-pointer     `}>
											{t("common:privacy-policy")}
										</div>
									</Link>
									<Link passHref href={"/contact"}>
										<div
											className={`w-full cursor-pointer py-4 border-solid  border-b border-dark-tint bg-primary text-white text-center`}>
											{t("common:contact-us")}
										</div>
									</Link>
									<div className="w-full  border-solid  border-b border-dark-tint  text-white text-center"></div>

									<LangDrop />
								</div>
							</div>
						</Transition.Child>
					</div>
				</Transition>
				<Link passHref href={"/"}>
					<div className={`relative`}>
						<Image
							alt={"violet-logo"}
							src={"/photos/logo.png"}
							width={75}
							height={75}></Image>
					</div>
				</Link>
				<div className="relative">
					<i
						onClick={() => openAndCloseAuth()}
						className="icon-person_black_24dp-1
          text-primary text-3xl cursor-pointer"></i>
					<Transition as={Fragment} show={isAuthNavOpen}>
						<div
							className="fixed h-full w-full top-[76px] start-0 bg-black/60 z-50"
							onClick={() => openAndCloseAuth}>
							<Transition.Child
								enter="transition ease-in-out transform duration-300"
								enterFrom="-translate-y-full"
								enterTo="translate-y-0"
								leave="transition ease-in-out transform duration-300"
								leaveFrom="translate-y-0"
								leaveTo="-translate-y-full"
								as={Fragment}>
								<div
									ref={mobileNavRef}
									className={`h-fit w-full bg-white pb-5 pt-3`}>
									<div className="flex flex-col items-start p-5 gap-6 text-md font-bold text-dark-shade">
										<div className="w-full  border-solid  border-b border-dark-tint  text-white text-center"></div>
										<Link passHref href={"/auth/login"}>
											<div
												className={`w-full cursor-pointer bg-primary text-white py-4 text-center`}>
												{t("common:auth-login")}
											</div>
										</Link>
										<Link passHref href={"/auth/register"}>
											<div
												className={`w-full cursor-pointer bg-secondary border border-solid border-primary text-primary py-4 text-center`}>
												{t("common:auth-register")}
											</div>
										</Link>
									</div>
								</div>
							</Transition.Child>
						</div>
					</Transition>
				</div>
			</nav>

			<nav className="hidden lg:flex justify-between items-center gap-16 px-6 container md:mx-auto ">
				<LangDrop />
				<div className="flex justify-center items-center h-full gap-6">
					<Link href="/rooms" passHref>
						<div className={`  h-full cursor-pointer  py-5`}>
							{t("common:rooms")}
						</div>
					</Link>

					<Link href="/bookings" passHref>
						<div className={`  h-full cursor-pointer  py-5 hidden   `}>
							{t("common:my-bookings")}
						</div>
					</Link>

					<Link passHref href={"/"}>
						<div
							className={`relative flex items-center justify-center  cursor-pointer `}>
							<Image
								alt={"violet-logo"}
								src={"/photos/logo.png"}
								width={52}
								height={52}></Image>
						</div>
					</Link>

					<Link href="/terms-of-use" passHref>
						<div className={`  h-full cursor-pointer  py-5    `}>
							{t("common:terms-conditions")}
						</div>
					</Link>

					<Link href="/privacy-policy" passHref>
						<div className={` h-full cursor-pointer  py-5    `}>
							{t("common:privacy-policy")}
						</div>
					</Link>
				</div>

				<div className="flex items-center h-full relative">
					<Link href="/contact" passHref>
						<div className={`bg-primary text-white h-full cursor-pointer  p-5`}>
							{t("common:contact-us")}
						</div>
					</Link>
					<div
						className="flex justify-center items-center h-full relative"
						onClick={() => openAndCloseAuth()}>
						<i
							className="icon-person_black_24dp-1
          text-primary text-2xl cursor-pointer px-5"></i>
						<Transition as={Fragment} show={isAuthNavOpen}>
							<div
								className="absolute h-auto w-[250px] top-[76px] rtl:left-0 ltr:right-0 z-50"
								onClick={() => openAndCloseAuth}>
								<Transition.Child
									enter="transition ease-in-out transform duration-300"
									enterFrom="-translate-y-full"
									enterTo="translate-y-0"
									leave="transition ease-in-out transform duration-300"
									leaveFrom="translate-y-0"
									leaveTo="-translate-y-full"
									as={Fragment}>
									<div
										ref={mobileNavRef}
										className={`h-fit w-full bg-white pb-5 pt-3`}>
										<div className="flex flex-col items-start p-5 gap-6 text-md font-bold text-dark-shade">
											<Link passHref href={"/auth/login"}>
												<div
													className={`w-full cursor-pointer bg-primary text-white py-4 text-center`}>
													{t("common:auth-login")}
												</div>
											</Link>
											<Link passHref href={"/auth/register"}>
												<div
													className={`w-full cursor-pointer bg-secondary border border-solid border-primary text-primary py-4 text-center`}>
													{t("common:auth-register")}
												</div>
											</Link>
										</div>
									</div>
								</Transition.Child>
							</div>
						</Transition>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
