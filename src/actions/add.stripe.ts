"use server";

import Membership from "@/models/membership.model";
import { connectDb } from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs";
import { Stripe } from "stripe";

export const addStripe = async ({ userId }: { userId: string }) => {
  try {
    await connectDb();

    const user = await currentUser();

    const membership = await Membership.findOne({ userId });

    if (membership) {
      return;
    } else {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
      });

      await stripe.customers
        .create({
          email: user?.emailAddresses[0].emailAddress,
          name: user?.firstName! + user?.lastName,
        })
        .then(async (customer) => {
          await Membership.create({
            userId: user?.id,
            stripeCustomerId: customer.id,
            plan: "LAUNCH",
          });
        });

      // Create new membership
      // const memberships = await Membership.create({
      //   userId: user?.id,
      //   stripeCustomerId: user?.id,
      //   plan: "LAUNCH",
      // });
      // return memberships;
    }
  } catch (error) {
    console.log(error);
  }
};
