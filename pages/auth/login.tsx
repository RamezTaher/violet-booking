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
import { useForm } from "react-hook-form"
import Link from "next/link"

const Login = () => {
  const { t, i18n } = useTranslation([
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
          `${process.env.NEXT_PUBLIC_API}/account/Login`,
          options
        )
        const data = await res.json()
        if (data.success) {
          setauthSucc(data.success)
          setUser(data.user)
          setToken(data.token)
          if (router.query && router.query.from) {
            router.push({ pathname: "/hotel/booking-paiement/" })
          } else {
            router.push({ pathname: "/" })
          }
        } else {
          setauthSucc(data.success)
          setMsg(data.message)
        }
      } catch (err) {}
    } else {
      setShowModal(true)
    }
  }

  const [showModal, setShowModal] = useState(false)
  const [authSucc, setauthSucc] = useState(true)
  const [msg, setMsg] = useState("")
  const [user, setUser, removeUser] = useLocalStorage("user", {})
  const [token, setToken, removeToken] = useLocalStorage("token", "" || null)
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  return (
    <>
      <HeadSeo
        title={t("auth:login")}
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
                  {t("auth:login")}{" "}
                </h1>

                <h4 className="text-xs hidden">{t("auth:register-with-profile")}</h4>

                <div className="hidden flex items-center gap-5">
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
                  className="flex flex-col gap-4 w-full text-dark text-xs lg:text-base"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className="flex flex-col gap-2 ">
                    <h3 className="text-xxs">{t("input:email")}*</h3>
                    <input
                      type="email"
                      name="UserName"
                      id="UserName"
                      className="rounded-none"
                      {...register("UserName", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                    />
                    {errors.UserName && (
                      <div className="text-danger text-xs">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 relative">
                    <h3 className="text-xxs">{t("input:password")}*</h3>
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
                      <div className="text-danger text-xs">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>

                  {!authSucc && (
                    <div className="text-sm text-danger font-medium text-center mt-4">
                      {i18n.language === "ar"
                        ? "اسم المستخدم أو كلمة المرور غير صالحة"
                        : msg}
                    </div>
                  )}

                  <button
                    className="btn btn-primary text-sm py-3 w-full"
                    type="submit"
                  >
                    {t("button:sign-in")}
                  </button>
                </form>
                <div className="flex items-center justify-between">
                  <Link href="/auth/register" passHref>
                    <h3 className=" cursor-pointer text-end underline text-xxs">
                      {t("auth:create-account")}
                    </h3>
                  </Link>
                  <Link href="/auth/forgot" passHref>
                    <h3 className=" cursor-pointer text-end underline text-xxs">
                      {t("auth:did-you-forgot-password")}
                    </h3>
                  </Link>
                </div>

                <p className="text-xxs mt-5">
                  {t("auth:confirm-1")}{" "}
                  <Link href="/" passHref>
                    <span className=" text-primary cursor-pointer">
                      {t("auth:confirm-2")}{" "}
                    </span>
                  </Link>
                  {t("auth:confirm-3")}{" "}
                  <Link href="/" passHref>
                    <span className=" text-primary cursor-pointer">
                      {t("auth:confirm-4")}{" "}
                    </span>
                  </Link>
                  <span className=" ">{t("auth:confirm-4")} </span>
                </p>
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
export default Login
