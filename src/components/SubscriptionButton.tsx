"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

type Props = {
  isPro: boolean;
};

export const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      className="w-full h-10 px-2 py-2 text-sm font-medium text-center border border-gray-200 border-dashed"
      variant={props.isPro ? "default" : "outline"}
      disabled={loading}
      onClick={handleSubscription}
    >
      {props.isPro ? "Manage Subscription" : "Get Pro"}
    </Button>
  );
};
