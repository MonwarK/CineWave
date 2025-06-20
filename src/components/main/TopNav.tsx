import { UserButton, useUser } from "@clerk/nextjs";
import classNames from "classnames";
import { CreditCard, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  navigation: {
    link: string;
    name: string;
  }[];
  setIsSidenavOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TopNav({ navigation, setIsSidenavOpen }: Props) {
  const { isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-black/50 backdrop-blur-sm w-full fixed top-0 left-0 px-5 z-10">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-5">
        {/* Logo */}
        <div className="p-2 py-5 hidden lg:block">
          <Link href="/discover">
            <p className="text-lg">CineWave</p>
          </Link>
        </div>

        {/* Menu */}
        <div className="p-2 py-5 lg:hidden">
          <Menu
            onClick={() => setIsSidenavOpen(true)}
            className="text-gray-200 cursor-pointer"
          />
        </div>

        {/* Navigation */}
        <div className="hidden lg:flex items-center text-sm text-gray-300 text-center font-medium">
          {navigation.map((navItem) => (
      
              <Link 
               key={`top-nav-${navItem.name}`}
               className={classNames(
                 "hover:text-white cursor-pointer border-b-3 py-5 w-28",
                 {
                   "border-transparent": pathname !== navItem.link,
                   "border-orange-500 text-white": pathname === navItem.link,
                 }
               )}
              href={navItem.link}>{navItem.name}</Link>
          ))}
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-5">
          <div>
            <Link href="/search">
              <Search className="text-white/80 cursor-pointer hover:animate-pulse" />
            </Link>
          </div>
          <div>
            {isLoaded && (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Subscription Plans"
                    labelIcon={<CreditCard size={16} />}
                    onClick={() => router.push("/profile")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
