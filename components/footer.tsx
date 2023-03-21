import { useTranslation } from "next-i18next";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
	const { t }: { t: any } = useTranslation(["common", "button"]);
	return (
		<footer className="w-full flex relative  bg-dark text-white">
			<div className="  w-full container sm:mx-auto px-6 lg:px-10 pt-6 lg:pt-10">
				<div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 pb-8">
					<div className="hidden lg:flex flex-col items-center -mt-4">
						<i className="icon-Group-103 text-[100px]"></i>
						<div className="text-base font-bold">{t("home:violet")}</div>
					</div>
					<div className="flex flex-col ">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<div className=" flex items-center gap-2 font-semibold text-xs">
									<i className="icon-fmd_good_black_24dp-2"></i>
									<span> {t("home:address")} </span>
								</div>
								<span className="text-xs">{t("home:address-3")}</span>
							</div>

							<div className="flex flex-col gap-2">
								<div className=" flex items-center gap-2 font-semibold text-xs">
									<i className="icon-fmd_good_black_24dp-2"></i>
									<span> {t("home:phone")} </span>
								</div>
								<span dir="ltr" className="text-start text-xs">
									{t("home:phone-number-1")} - {t("home:phone-number-2")}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-5">
						<h3 className="text-xs">{t("home:first-news")}</h3>
						<form>
							<label className="flex flex-col gap-4 col-span-2 relative ">
								<input
									required
									className="rounded-none placeholder:text-dark-tint border-white border boder-solid rtl:pr-14 ltr:pl-14 placeholder:text-xxs"
									type="text"
									name="phone"
									id="phone"
									placeholder={t("home:enter-phone-number")}
								/>
								<div className="absolute start-1 top-1 bottom-1  w-10 text-base cursor-pointer flex justify-center items-center bg-primary font-bold">
									<i className="icon-send_black_24dp text-white"></i>
								</div>
							</label>
						</form>
						<div className="flex items-center justify-center lg:justify-start gap-4">
							<a
								href="https://www.facebook.com/violet1hotel"
								target="_blank"
								rel="noopener noreferrer">
								<i className="icon-icons8-facebook text-2xl cursor-pointer"></i>
							</a>
							<a
								href="https://twitter.com/violet1hotel"
								target="_blank"
								rel="noopener noreferrer">
								<i className="icon-icons8-twitter text-2xl cursor-pointer"></i>
							</a>
							<a
								href="https://instagram.com/violet1hotel?igshid=wivx9bmiwmfc"
								target="_blank"
								rel="noopener noreferrer">
								<i className="icon-Group-102 text-2xl cursor-pointer"></i>
							</a>
							<a
								href="https://t.me/+-Ux2J4KWnNc5NjM8"
								target="_blank"
								rel="noopener noreferrer">
								<i className="icon-telegram-1 text-2xl cursor-pointer"></i>
							</a>
							<a
								href="https://www.snapchat.com/add/violet1hotel"
								target="_blank"
								rel="noopener noreferrer">
								<i className="icon-iconmonstr-snapchat-1 text-2xl cursor-pointer"></i>
							</a>
						</div>
					</div>
				</div>
				<div className="py-2 grid grid-cols-5 lg:flex lg:justify-center lg:gap-20  justify-items-center text-xxs border-t border-b border-solid border-secondary-tint ">
					<Link href="/" passHref>
						<h3 className=" cursor-pointer ">{t("common:book-now")}</h3>
					</Link>

					<Link href="/rooms" passHref>
						<h3 className=" cursor-pointer ">{t("common:rooms")}</h3>
					</Link>
					<Link href="/bookings" passHref>
						<h3 className=" cursor-pointer ">{t("common:my-bookings")}</h3>
					</Link>
					<Link href="/privacy-policy" passHref>
						<h3 className=" cursor-pointer ">{t("common:privacy-policy")}</h3>
					</Link>

					<Link href="/contact" passHref>
						<h3 className=" cursor-pointer ">{t("common:contact-us")}</h3>
					</Link>

					<Link href="/terms-of-use" passHref>
						<h3 className=" cursor-pointer col-span-2">
							{t("common:terms-conditions")}
						</h3>
					</Link>
				</div>

				<div className="text-xs text-white text-center py-2">
					<span>{new Date().getFullYear()}</span> &copy; Copyright Violet
				</div>
			</div>
		</footer>
	);
};

export default Footer;
