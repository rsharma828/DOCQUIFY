// // // stripe api for subscription

// // import { eq } from "drizzle-orm";
// // import { auth, currentUser } from "@clerk/nextjs";
// // import { NextResponse } from "next/server";
// // import { db } from "@/lib/db";
// // import { userSubscriptions } from "@/lib/db/schema";
// // import { stripe } from "@/lib/stripe";
// // import { PackagePlus } from "lucide-react";

// // const return_url = process.env.NEXT_BASE_URL + "/";

// // export async function GET() {
// //   try {
// //     const { userId } = await auth();
// //     const user = await currentUser();

// //     if (!user) {
// //       return new NextResponse("unauthorized", { status: 401 });
// //     }
// //     const _userSubscriptions = await db
// //       .select()
// //       .from(userSubscriptions)
// //       .where(eq(userSubscriptions.userId, userId));

// //     if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId) {
// //       // cancelling the billing portel
// //       const stripeSession = await stripe.billingPortal.sessions.create({
// //         customer: _userSubscriptions[0].stripeCustomerId,
// //         return_url,
// //       });

// //       return NextResponse.json({ url: stripeSession.url });
// //     }
// //     const stripeSession = await stripe.checkout.sessions.create({
// //       success_url: return_url,
// //       cancel_url: return_url,
// //       payment_method_types: ["card"],
// //       mode: "subscription",
// //       billing_address_collection: "auto",
// //       customer_email: user?.emailAddresses[0].emailAddress,
// //       line_items: [
// //         {
// //           price_data: {
// //             currency: "INR",
// //             product_data: {
// //               name: "quizDoc pro",
// //               description: "Unlimited PDF sessions!",
// //             },
// //             unit_amount: 11900,
// //             recurring: {
// //               interval: "month",
// //             },
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       metadata: {
// //         userId,
// //       },
// //     });
// //     return NextResponse.json({ url: stripeSession.url });
// //   } catch (error) {
// //     console.log(error);
// //     return new NextResponse("internal server error", { status: 500 });
// //   }
// // }

// import { eq } from "drizzle-orm";
// import { auth, currentUser } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { userSubscriptions } from "@/lib/db/schema";
// import { stripe } from "@/lib/stripe";

// const return_url = process.env.NEXT_BASE_URL + "/";

// export async function GET() {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId) {
//       return new NextResponse("unauthorized", { status: 401 });
//     }

//     const _userSubscriptions = await db
//       .select()
//       .from(userSubscriptions)
//       .where(eq(userSubscriptions.userId, userId)); // Ensured that userId is not null

//     if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId) {
//       // Cancelling the billing portal
//       const stripeSession = await stripe.billingPortal.sessions.create({
//         customer: _userSubscriptions[0].stripeCustomerId,
//         return_url,
//       });

//       return NextResponse.json({ url: stripeSession.url });
//     }

//     const stripeSession = await stripe.checkout.sessions.create({
//       success_url: return_url,
//       cancel_url: return_url,
//       payment_method_types: ["card"],
//       mode: "subscription",
//       billing_address_collection: "auto",
//       customer_email: user?.emailAddresses[0].emailAddress,
//       line_items: [
//         {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: "quizDoc pro",
//               description: "Unlimited PDF sessions!",
//             },
//             unit_amount: 11900,
// //             recurring: {
// //               interval: "month",
// //             },
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       metadata: {
// //         userId,
// //       },
// //     });

// //     return NextResponse.json({ url: stripeSession.url });
// //   } catch (error) {
// //     console.log(error);
// //     return new NextResponse("internal server error", { status: 500 });
// //   }
// // }

// // /api/stripe

// import { db } from "@/lib/db";
// import { userSubscriptions } from "@/lib/db/schema";
// import { stripe } from "@/lib/stripe";
// import { auth, currentUser } from "@clerk/nextjs";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// const return_url = process.env.NEXT_BASE_URL + "/";

// export async function GET() {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId) {
//       return new NextResponse("unauthorized", { status: 401 });
//     }

//     const _userSubscriptions = await db
//       .select()
//       .from(userSubscriptions)
//       .where(eq(userSubscriptions.userId, userId));
//     if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId) {
//       // trying to cancel at the billing portal
//       const stripeSession = await stripe.billingPortal.sessions.create({
//         customer: _userSubscriptions[0].stripeCustomerId,
//         return_url,
//       });
//       return NextResponse.json({ url: stripeSession.url });
//     }

//     // user's first time trying to subscribe
//     const stripeSession = await stripe.checkout.sessions.create({
//       success_url: return_url,
//       cancel_url: return_url,
//       payment_method_types: ["card"],
//       mode: "subscription",
//       billing_address_collection: "auto",
//       customer_email: user?.emailAddresses[0].emailAddress,
//       line_items: [
//         {
//           price_data: {
//             currency: "USD",
//             product_data: {
//               name: "ChatPDF Pro",
//               description: "Unlimited PDF sessions!",
//             },
//             unit_amount: 2000,
//             recurring: {
//               interval: "month",
//             },
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         userId,
//       },
//     });
//     return NextResponse.json({ url: stripeSession.url });
//   } catch (error) {
//     console.log("stripe error", error);
//     return new NextResponse("internal server error", { status: 500 });
//   }
// }
// /api/stripe

import { db } from "@/lib/db";
import { userSubscriptions } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const return_url = process.env.NEXT_BASE_URL + "/";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const _userSubscriptions = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));
    if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId) {
      // trying to cancel at the billing portal
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscriptions[0].stripeCustomerId,
        return_url,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // user's first time trying to subscribe
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: return_url,
      cancel_url: return_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "ChatPDF Pro",
              description: "Unlimited PDF sessions!",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("stripe error", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
