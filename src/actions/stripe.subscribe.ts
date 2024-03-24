"use server";

import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";

export const stripeSubscribe = async ({
  price,
  userId,
}: {
  price: string;
  userId: string;
}) => {
  console.log("pricefromstripe", price);
  console.log("userIdfromStripe", userId);

  try {
    // const user = await Membership.findOne({ userId });
    const user = await currentUser();
    console.log("user", user);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/success",
      cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/error",
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        metadata: {
          payingUserId: userId,
        },
      },
    });
    console.log("checkoutSession", checkoutSession);

    // If checkout session URL exists, return it
    if (checkoutSession.url) {
      return checkoutSession.url;
    } else {
      throw new Error("Could not create checkout session");
    }
  } catch (error) {
    console.log(error);
  }
};
