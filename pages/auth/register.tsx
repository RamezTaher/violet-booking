import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import ModalError from "../../components/ModalError"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"

import { parseISO } from "date-fns"
import format from "date-fns/format"
import { useForm } from "react-hook-form"
import Link from "next/link"

const Register = () => {
  const { t } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
    "auth",
  ])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    reValidateMode: "onChange",
    mode: "all",
  })

  const onSubmit = async (formData) => {
    formData.UserName = formData.Email
    if (isValid) {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/account/register`,
          options
        )
        const data = await res.json()
        if (data.success) {
          router.push("/auth/login")
        } else {
          setEmailsExists(data.emailsExists)
          setPhoneExists(data.phoneExists)
          setUsernameExists(data.usernameExists)
        }
      } catch (err) {}
    } else {
      setShowModal(true)
    }
  }
  const [emailsExists, setEmailsExists] = useState(false)
  const [phoneExists, setPhoneExists] = useState(false)
  const [usernameExists, setUsernameExists] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const router = useRouter()

  const closeErrorModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <HeadSeo
        title={t("auth:create-account")}
        description={t("home:violet")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-grayish pt-[82px] lg:pt-[64px] min-h-screen">
          <section className="flex flex-col gap-4 py-10  lg:gap-10">
            <div className="w-full   container mx-auto   gap-6 px-6 lg:px-10 relative lg:w-1/3 bg-white py-3">
              <div className="flex flex-col items-center gap-4 border-b border-dark-tint border-solid py-2">
                <h1 className="text-dark text-2xl font-bold">
                  {t("auth:register")}{" "}
                </h1>

                <h4 className="text-xs hidden">{t("auth:register-with-profile")}</h4>

                <div className="flex items-center gap-5 hidden">
                  <div className="relative">
                    <Image
                      src="/svg/fb.svg"
                      alt="facebook-icon"
                      height="42"
                      width="42"
                    ></Image>
                  </div>
                  <div className="relative">
                    <Image
                      src="/svg/google.svg"
                      alt="google-icon"
                      height="42"
                      width="42"
                    ></Image>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 py-4">
                <h4 className="text-xs text-center">
                  {t("auth:register-with-your-email")}
                </h4>

                <form
                  className="flex flex-col gap-4 w-full text-dark text-xxs"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className="flex flex-col gap-2 ">
                    <h3>{t("input:email")}*</h3>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      className="rounded-none"
                      {...register("Email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                    />
                    {errors.Email && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                    {(emailsExists || usernameExists) && (
                      <div className="text-danger  my-1">
                        {t("common:Validation_UsedEmail")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 ">
                    <h3>{t("input:phone-number")}*</h3>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="rounded-none"
                      {...register("Phone", { required: true, minLength: 6 })}
                    />
                    {errors.Phone && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                    {phoneExists && (
                      <div className="text-danger">
                        {t("common:Validation_UsedPhone")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 ">
                    <h3>{t("input:password")}*</h3>
                    <div className="relative">
                      <input
                        type={isPasswordShown ? "text" : "password"}
                        name="Password"
                        id="Password"
                        className="rounded-none"
                        {...register("Password", {
                          required: true,
                        })}
                      />
                      <i
                        className="icon-visibility_black_24dp absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                      ></i>
                    </div>
                    {errors.Password && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-2  ">
                    <h3>{t("input:first-name")}*</h3>
                    <input
                      type="text"
                      name="FirstName"
                      id="FirstName"
                      className="rounded-none"
                      {...register("FirstName", {
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                    />
                    {errors.FirstName && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-2  ">
                    <h3>{t("input:last-name")}*</h3>
                    <input
                      type="text"
                      name="LastName"
                      id="LastName"
                      className="rounded-none"
                      {...register("LastName", {
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                    />
                    {errors.LastName && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>

                  <p className="text-sm mt-4">
                    {t("auth:register-confirm-1")}{" "}
                    <Link href="/" passHref>
                      <span className=" text-primary cursor-pointer">
                        {t("auth:register-confirm-2")}{" "}
                      </span>
                    </Link>
                    {t("auth:register-confirm-3")}{" "}
                  </p>

                  <button
                    className="btn btn-primary text-sm py-3 w-full"
                    type="submit"
                  >
                    {t("button:register-sign")}
                  </button>
                </form>

                <Link href="/auth/login" passHref>
                  <h3 className=" cursor-pointer text-end text-xxs underline">
                    {t("auth:already-member")}
                  </h3>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation", "booking", "auth"],
        nextI18NextConfig
      )),
    },
  }
}
export default Register
