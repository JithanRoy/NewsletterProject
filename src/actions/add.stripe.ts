"use server";

import Membership from "@/models/membership.model";
import { connectDb } from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs";

export const addStripe = async () => {
  try {
    await connectDb();
    console.log("DB connected successfully");

    const user = await currentUser();
    console.log("username", user.id);

    const membership = Membership.findById({
      userId: user?.id,
    });

    console.log("membership", membership);

    // Handle membership data
    if (membership) {
      return;
    } else {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
      });
      await membership
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
    }
  } catch (error) {
    console.log(error);
  }
};
