import Link from "next/link";
import { BsTwitter, BsYoutube, BsTiktok } from "react-icons/bs";
import { BiLogoTelegram } from "react-icons/bi";
import { ImInstagram } from "react-icons/im";
import Image from "next/image";
import { pages } from "@/app/shared/index";

const links = [
  { icon: BsTwitter, href: "/" },
  { icon: BsYoutube, href: "/" },
  { icon: BsTiktok, href: "/" },
  { icon: ImInstagram, href: "/" },
  { icon: BiLogoTelegram, href: "/" },
];

const NewFooter = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 py-10 px-10 bg-light-green">
      <Link href="/">
        <Image
          src="/logo-creation.png"
          alt="logo"
          className="w-[100px] h-[30px]"
          width={100}
          height={30}
        />
      </Link>

      <div className="grid1 grid-cols-5 flex flex-wrap gap-3 justify-center">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.href}
            className="text-sm capitalize hover:text-deep-green hover:font-bold"
          >
            {page.title}
          </Link>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-sm font-semibold">Follow Us On Social Media</p>
        <div className="footer_socials_links flex gap-4 ">
          {links.map((link, index) => (
            <Link href="#" key={index}>
              <link.icon className="text-green hover:text-neutral-600" />
            </Link>
          ))}
        </div>
      </div>

      {/* <div className="footer_country_selection flex gap-3">
        <select>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
        </select>
        <p>N 0 </p>
      </div> */}
    </div>
  );
};

export default NewFooter;
