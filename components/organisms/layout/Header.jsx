import { useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-black">
      <nav className="flex justify-between items-center py-6 sm:p-6">
        <Link href="/" passHref>
          <a className="block relative w-24 h-14 flex-shrink-0 z-10 ml-4">
            <NextImage
              src="/media/rrLogo.png"
              layout="fill"
              className="shadow-base shadow-white/50"
            />
          </a>
        </Link>
        <div className="hidden md:flex items-center">
          <ul className="flex items-center space-x-2">
            <NavItem link="/#about" text="About" />
            <NavItem link="/#roadmap" text="Roadmap" />
            <NavItem link="/#team" text="Team" />
            <NavItem link="/#FAQ" text="FAQ" />
            <NavItem link="/whitepaper" text="Whitepaper" />
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/RuggedRevenants/"
                className="text-primary h-8 padding-huge px-4 flex flex-row justify-center items-center drop-shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current stroke-current h-10 w-10"
                  viewBox="0 0 40 40"
                >
                  <path d="M38.526 8.625a15.199 15.199 0 01-4.373 1.198 7.625 7.625 0 003.348-4.211 15.25 15.25 0 01-4.835 1.847 7.6 7.6 0 00-5.557-2.404c-4.915 0-8.526 4.586-7.416 9.346-6.325-.317-11.934-3.347-15.69-7.953C2.01 9.869 2.97 14.345 6.358 16.612a7.58 7.58 0 01-3.446-.953c-.084 3.527 2.444 6.826 6.105 7.56a7.63 7.63 0 01-3.438.13 7.618 7.618 0 007.112 5.286A15.306 15.306 0 011.42 31.79a21.55 21.55 0 0011.67 3.42c14.134 0 22.12-11.937 21.637-22.643a15.499 15.499 0 003.799-3.941z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://discord.gg/ruggedrevenants"
                className="text-primary h-8 padding-huge px-4 flex flex-row justify-center items-center drop-shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current stroke-current h-10 w-10"
                  viewBox="0 0 40 40"
                >
                  <path d="M33.567 7.554a32.283 32.283 0 00-7.969-2.472.12.12 0 00-.128.06c-.344.613-.725 1.411-.992 2.039a29.804 29.804 0 00-8.95 0 20.625 20.625 0 00-1.008-2.038.126.126 0 00-.128-.06 32.194 32.194 0 00-7.968 2.47.114.114 0 00-.053.046C1.296 15.18-.095 22.577.588 29.88c.003.036.023.07.05.092 3.349 2.459 6.593 3.952 9.776 4.941a.127.127 0 00.137-.045 23.203 23.203 0 002-3.253.124.124 0 00-.068-.172A21.379 21.379 0 019.43 29.99a.126.126 0 01-.012-.209c.205-.153.41-.313.607-.475a.121.121 0 01.126-.017c6.407 2.925 13.343 2.925 19.675 0a.12.12 0 01.128.015c.196.162.4.324.608.477a.126.126 0 01-.011.209c-.975.57-1.99 1.051-3.055 1.454a.125.125 0 00-.067.173 26.052 26.052 0 001.998 3.252c.031.043.087.062.138.046 3.199-.99 6.442-2.482 9.79-4.941a.126.126 0 00.052-.09c.816-8.445-1.368-15.78-5.789-22.283a.1.1 0 00-.05-.046zm-20.06 17.88c-1.928 0-3.517-1.771-3.517-3.946 0-2.175 1.558-3.946 3.518-3.946 1.975 0 3.549 1.787 3.518 3.946 0 2.175-1.558 3.946-3.518 3.946zm13.01 0c-1.93 0-3.52-1.771-3.52-3.946 0-2.175 1.56-3.946 3.52-3.946 1.974 0 3.548 1.787 3.517 3.946 0 2.175-1.543 3.946-3.518 3.946z"></path>
                </svg>
              </a>
            </li>
            <li>
            <WalletMultiButton/>
            </li>
          </ul>
        </div>

        <div className="w-12 h-12 pt-4 relative cursor-pointer block md:hidden">
          {!hamburgerOpen && (
            <NextImage
              src="/media/hamburger_menu.svg"
              width={24}
              height={24}
              className="absolute transition-opacity duration-500 opacity-100 z-[1]"
              onClick={() => setHamburgerOpen(true)}
            />
          )}
          {hamburgerOpen && (
            <NextImage
              src="/media/mobile-close.svg"
              width={24}
              height={24}
              className="absolute transition-opacity duration-500 opacity-100 z-[1]"
              onClick={() => setHamburgerOpen(false)}
            />
          )}
        </div>
        <div
          className={`${
            hamburgerOpen ? "h-full opacity-100" : "h-0 opacity-0"
          } transition-all duration-500 fixed top-0 w-full overflow-hidden bg-black pt-[100px] px-8 md:hidden`}
        >
          <ul className="flex flex-col cursor-pointer">
            <MobileNavItem
              link="/#about"
              text="About"
              click={setHamburgerOpen}
            />
            <MobileNavItem
              link="/#roadmap"
              text="Roadmap"
              click={setHamburgerOpen}
            />
            <MobileNavItem link="/#team" text="Team" click={setHamburgerOpen} />
            <MobileNavItem link="/#FAQ" text="FAQ" click={setHamburgerOpen} />
            <MobileNavItem
              link="/whitepaper"
              text="Whitepaper"
              click={setHamburgerOpen}
            />
            <li className="border-b border-white border-opacity-10">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/RuggedRevenants/"
                className="flex flex-nowrap items-center justify-between text-primary py-3.5"
              >
                Twitter
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current stroke-current h-6 w-6 text-primary"
                  viewBox="0 0 40 40"
                >
                  <path d="M38.526 8.625a15.199 15.199 0 01-4.373 1.198 7.625 7.625 0 003.348-4.211 15.25 15.25 0 01-4.835 1.847 7.6 7.6 0 00-5.557-2.404c-4.915 0-8.526 4.586-7.416 9.346-6.325-.317-11.934-3.347-15.69-7.953C2.01 9.869 2.97 14.345 6.358 16.612a7.58 7.58 0 01-3.446-.953c-.084 3.527 2.444 6.826 6.105 7.56a7.63 7.63 0 01-3.438.13 7.618 7.618 0 007.112 5.286A15.306 15.306 0 011.42 31.79a21.55 21.55 0 0011.67 3.42c14.134 0 22.12-11.937 21.637-22.643a15.499 15.499 0 003.799-3.941z"></path>
                </svg>
              </a>
            </li>
            <li className="border-b border-white border-opacity-10">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://discord.gg/ruggedrevenants"
                className="flex flex-nowrap items-center justify-between text-primary py-3.5"
              >
                Discord
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current stroke-current h-6 w-6 text-primary"
                  viewBox="0 0 40 40"
                >
                  <path d="M33.567 7.554a32.283 32.283 0 00-7.969-2.472.12.12 0 00-.128.06c-.344.613-.725 1.411-.992 2.039a29.804 29.804 0 00-8.95 0 20.625 20.625 0 00-1.008-2.038.126.126 0 00-.128-.06 32.194 32.194 0 00-7.968 2.47.114.114 0 00-.053.046C1.296 15.18-.095 22.577.588 29.88c.003.036.023.07.05.092 3.349 2.459 6.593 3.952 9.776 4.941a.127.127 0 00.137-.045 23.203 23.203 0 002-3.253.124.124 0 00-.068-.172A21.379 21.379 0 019.43 29.99a.126.126 0 01-.012-.209c.205-.153.41-.313.607-.475a.121.121 0 01.126-.017c6.407 2.925 13.343 2.925 19.675 0a.12.12 0 01.128.015c.196.162.4.324.608.477a.126.126 0 01-.011.209c-.975.57-1.99 1.051-3.055 1.454a.125.125 0 00-.067.173 26.052 26.052 0 001.998 3.252c.031.043.087.062.138.046 3.199-.99 6.442-2.482 9.79-4.941a.126.126 0 00.052-.09c.816-8.445-1.368-15.78-5.789-22.283a.1.1 0 00-.05-.046zm-20.06 17.88c-1.928 0-3.517-1.771-3.517-3.946 0-2.175 1.558-3.946 3.518-3.946 1.975 0 3.549 1.787 3.518 3.946 0 2.175-1.558 3.946-3.518 3.946zm13.01 0c-1.93 0-3.52-1.771-3.52-3.946 0-2.175 1.56-3.946 3.52-3.946 1.974 0 3.548 1.787 3.517 3.946 0 2.175-1.543 3.946-3.518 3.946z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

const NavItem = ({ text, link }) => {
  return (
    <li>
      <Link href={link} passHref>
        <a className="text-base font-semibold1 tracking-wider px-5">{text}</a>
      </Link>
    </li>
  );
};

const MobileNavItem = ({ text, link, click = () => {} }) => {
  return (
    <li
      className="border-b border-white border-opacity-10"
      onClick={() => click(false)}
    >
      <Link href={link} passHref>
        <a className="flex flex-nowrap items-center justify-between text-primary py-4 opacity-100">
          {text}
        </a>
      </Link>
    </li>
  );
};
