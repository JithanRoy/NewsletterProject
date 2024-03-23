"use client";
import { useUser } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { addStripe } from "../../actions/add.stripe";
import DashboardSidebar from "../widgets/dashboard/sidebar/dashboard.sidebar";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  const pathname = usePathname();
  const { isLoaded, user } = useUser();

  const isStripeCustomerIdHas = async ({ userId }: { userId: string }) => {
    await addStripe({ userId: userId! });
  };

  if (!isLoaded) {
    return null;
  } else {
    if (user) {
      isStripeCustomerIdHas({ userId: user?.id });
    }
  }

  return (
    <NextUIProvider>
      {pathname !== "/dashboard/new-email" &&
      pathname !== "/" &&
      pathname !== "/sign-up" &&
      pathname !== "/subscribe" &&
      pathname !== "/success" &&
      pathname !== "/sign-in" ? (
        <div className="w-full flex">
          <div className="w-[290px] h-screen overflow-y-scroll">
            <DashboardSidebar />
          </div>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </NextUIProvider>
  );
}
