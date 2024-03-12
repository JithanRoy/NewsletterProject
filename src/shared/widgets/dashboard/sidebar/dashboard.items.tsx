import React, {useEffect} from 'react';
import useRouteChange from "../../../hooks/useRouteChange";
import {useClerk} from '@clerk/nextjs';
import {redirect, usePathname} from "next/navigation";
import {sideBarBottomItems, sideBarItems} from "../../../../app/configs/constants";
import Link from "next/link";
import {ICONS} from "../../../utils/icons";
import SidebarFooterLogo from "./sidebar.footer.logo";

const DashboardItems = ({bottomContent} : {bottomContent?: boolean}) => {
  const { activeRoute, setActiveRoute } = useRouteChange();
  const {signOut, user} = useClerk();
  const pathName = usePathname();

  const LogoutHandler = () => {
    signOut();
    redirect('/sign-in');
  }

  useEffect(() => {
    setActiveRoute(pathName);
  }, [pathName, setActiveRoute]);

  // @ts-ignore
  return (
    <>
      {
        !bottomContent ? (
          <>
            {sideBarItems.map((item: DashboardSideBarTypes, index: number) => (
              <Link href={item.url} key={index} className="p-2 py-5 flex items-center">
                  <span className={`text-3xl mr-2 ${item.url === activeRoute && "text-[#463bbd]"}`}>
                      {item.icon}
                  </span>
                  <span className={`text-xl mr-2 ${item.url === activeRoute && "text-[#463bbd]"}`}>
                    {item.title}
                  </span>
              </Link>
            ))}
          </>
        ) : (
          <>
            {sideBarBottomItems.map(
              (item: DashboardSideBarTypes, index: number) => (
                <Link
                  key={index}
                  className="p-2 py-5 flex items-center"
                  href={
                    item.url === "/"
                      ? `/subscribe?username=${user?.username}`
                      : item.url
                  }
                >
                <span
                  className={`text-3xl mr-2 ${
                    item.url === activeRoute && "text-[#463bbd]"
                  }`}
                >
                  {item.icon}
                </span>
                  <span
                    className={`text-xl mr-2 ${
                      item.url === activeRoute && "text-[#463bbd]"
                    }`}
                  >
                  {item.title}
                </span>
                </Link>
              )
            )}
            {/* sign out */}
            <div className="p-2 py-5 flex items-center cursor-pointer border-b"
                 onClick={LogoutHandler}
            >
              <span className="text-3xl mr-2">{ICONS.logOut}</span>
              <span className="text-xl">Sign Out</span>
            </div>
            {/* footer */}
            <br />
            <br />
            <div className="w-full flex justify-center cursor-pointer">
              <SidebarFooterLogo />
            </div>
            <p className="text-sm text-center pt-5 pb-10">
              © 2024 Becodemy, Inc. All rights reserved.
            </p>
          </>
        )}
    </>
  );
};

export default DashboardItems;
