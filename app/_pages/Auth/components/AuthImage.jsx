import Image from "next/image"
import AuthBgCircles from "./AuthBgCircles"

const AuthImage = () => {
  return (
    <div className="w-full relative bg-gradient-to-b from-[#008C8B] to-[#004B89] min-h-full flex flex-col items-center overflow-hidden">
      <div className="flex flex-col items-center w-full mt-[20px] md:mt-[15%] lg:mt-[100px]">
        <Image
          src={"/images/donation.svg"}
          alt="squareDonation logo"
          width={200}
          height={200}
          className="w-[180px] md:w-[200px] lg:w-[320px] object-cover"
          loading="lazy"
        />
      </div>

      <div className="w-[90%] lg:w-[60%] flex justify-center flex-1">
        <p className="text-white hidden md:flex lg:text-lg font-primary leading-normal text-center mt-4 md:mt-6 lg:mt-8 2xl:text-[18px]">
          Sign up now to add powerful donation features to your Squarespace site. Our plugin offers campaign goals,
          customizable progress styles, recent donations display, donor recognition, Mailchimp and Zapier integration,
          advanced reporting and much more. Start maximizing your fundraising today!
        </p>
      </div>

      <div className="mt-auto mb-8 md:mb-12">
        <Image
          src={"/images/lock.svg"}
          alt="auth-icon"
          width={90}
          height={90}
          className="hidden md:flex h-[60px] w-[60px] md:h-[90px] md:w-[90px]"
          loading="lazy"
        />
      </div>

      <AuthBgCircles />
    </div>
  )
}

export default AuthImage
