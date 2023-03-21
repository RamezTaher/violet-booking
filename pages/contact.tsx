import { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useForm } from "react-hook-form"
import HeadSeo from "../components/HeadSeo"
import Layout from "../components/layout"
import siteMetadata from "../data/siteMetadata"
import nextI18nextConfig from "../i18n/next-i18next.config"

const Contact: NextPage = () => {
  const { t } = useTranslation([
    "common",
    "button",
    "home",
    "input",
    "validation",
  ])
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    reValidateMode: "onChange",
    mode: "all",
  })
  return (
    <>
      <HeadSeo
        title={t("common:contact-title")}
        description={t("home:violet")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <section className=" relative  w-full ">
          <div className=" pb-32 lg:pb-0 relative  flex flex-col lg:flex-row gap-12 pt-[82px] lg:pt-[64px]">
            <div className="w-full h-[60vh] lg:w-screen lg:h-screen   ">
              <div className="relative w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.2819341587165!2d39.851376715389236!3d21.418160579745493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c20488c4a29ca3%3A0x8fb006b08481a429!2sViolet%20Hotel!5e0!3m2!1sen!2stn!4v1659695171389!5m2!1sen!2stn"
                  width="100%"
                  height="100%"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="container px-6 lg:px-10 sm:mx-auto bg-white lg:absolute lg:top-24 lg:start-20 lg:py-8 lg:h-auto lg:w-1/3">
              <div className=" w-full   h-full bg-white">
                <h1 className="text-primary font-extrabold text-4xl lg:text-[50px] lg:mb-10 mb-2">
                  {t("common:contact-us")}
                </h1>

                <form className="flex flex-col gap-2 w-full text-dark text-xs lg:text-base">
                  <label className="flex flex-col gap-2 ">
                    <h3>{t("input:full-name")}*</h3>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="rounded-none"
                      {...register("fullName", {
                        required: true,
                      })}
                    />
                    {errors.fullName && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 ">
                    <h3>{t("input:email")}*</h3>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="rounded-none"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                    />
                    {errors.email && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-2  ">
                    <h3>{t("input:topic")}*</h3>
                    <input
                      type="text"
                      name="topic"
                      id="topic"
                      className="rounded-none"
                      {...register("topic", {
                        required: true,
                      })}
                    />
                    {errors.topic && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>

                  <label className="flex flex-col gap-2  ">
                    <h3>{t("input:letter")}*</h3>
                    <textarea
                      className="h-36 rounded-none"
                      name="letter"
                      {...(register("demandes"),
                      { required: true, minLength: 6 })}
                    />
                  </label>

                  <button
                    className="btn btn-primary text-xl py-4 w-full"
                    type="submit"
                  >
                    {t("button:send")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation"],
        nextI18nextConfig
      )),
    },
  }
}
export default Contact
