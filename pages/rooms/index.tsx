import { NextPage, GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Layout from "../../components/layout";
import nextI18NextConfig from "../../i18n/next-i18next.config";
import HeadSeo from "../../components/HeadSeo";
import siteMetadata from "../../data/siteMetadata";
import { useState } from "react";

const Rooms: NextPage<{ rooms: any }> = ({ rooms }) => {
	const [selectedPhoto, setSelectedPhoto] = useState(0);
	const { t, i18n } = useTranslation(["common", "search", "button"]);
	console.log(rooms);
	return (
		<>
			<HeadSeo
				title={t("home:rooms")}
				description={t("home:violet")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<div className="bg-secondary-tint pt-[82px] lg:pt-[64px] ">
					{rooms.map((room) => {
						return (
							<section key={room.Id} className="relative py-10">
								<div className="container px-6 sm:mx-auto relative  lg:px-10 py-6">
									<h1 className="text-3xl text-dark font-bold">
										{i18n.language === "ar" ? room.NameAr : room.Name}
									</h1>
								</div>
								<div className="relative h-[600px] bg-cover">
									{/* <div
										onClick={() => {
											if (selectedPhoto > 0) {
												setSelectedPhoto(selectedPhoto - 1);
											}
										}}
										className="h-7 w-7 start-0 top-[calc(50%-14px)] z-10 absolute flex justify-center items-center bg-dark-shade/60">
										<i className="icon-vuesax-outline-arrow-right-1 text-2xl text-secondary"></i>
									</div> */}
									<Image
										layout="fill"
										objectFit="cover"
										alt="hotelSlugName"
										src={`${room?.Image.secure_url}`}></Image>
									{/* <div
										onClick={() => {
											if (selectedPhoto < room?.pictures.length - 1) {
												setSelectedPhoto(selectedPhoto + 1);
											}
										}}
										className="h-7 w-7 end-0 top-[calc(50%-14px)] z-10 absolute flex justify-center items-center bg-dark-shade/60">
										<i className="icon-vuesax-outline-arrow-right-1 text-2xl transform rtl:rotate-180 text-secondary"></i>
									</div> */}
								</div>

								<div className="container px-6 sm:mx-auto relative  lg:px-10 flex flex-col gap-10 py-10">
									<p>
										{i18n.language === "ar"
											? room.DescriptionAr
											: room.Description}
									</p>

									<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
										{room.AmenitiesRoomType &&
											room.AmenitiesRoomType.map((am) => {
												return (
													<div
														key={am.Id}
														className="col-span-1 flex items-center gap-2">
														<i
															className={`icon-${am.Logo} text-primary text-xl`}></i>
														<span className="text-xs">{am.Name}</span>
													</div>
												);
											})}
										{/* <div className="col-span-1 flex items-center gap-2">
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
										</div> */}
									</div>
								</div>

								<div className="bg-primary-tint text-dark py-8 lg:container lg:mx-auto lg:px-10">
									<div className="container px-6 lg:px-0  sm:mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-5">
										<div className="flex flex-col gap-2">
											<div className="font-bold">{t("home:foods-drinks")}</div>
											<div>{t("home:foods-drinks-text")}</div>
										</div>
										<div className="flex flex-col gap-2">
											<div className="font-bold">{t("home:social-media")}</div>
											<div>{t("home:social-media-text")}</div>
										</div>
										<div className="flex flex-col gap-2">
											<div className="font-bold">{t("home:shower")}</div>
											<div>{t("home:shower-text")}</div>
										</div>
									</div>
								</div>
							</section>
						);
					})}
				</div>
			</Layout>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const resRooms = await fetch(
		`${process.env.NEXT_PUBLIC_API}/hotels/GetHotelRooms/${process.env.NEXT_PUBLIC_VIOLET_ID}`
	);
	const rooms = await resRooms.json();

	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input"],
				nextI18NextConfig
			)),
			rooms: rooms,
		},
	};
};
export default Rooms;
