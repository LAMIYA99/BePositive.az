"use client";

import dynamic from "next/dynamic";

const PushNotification = dynamic(() => import("./PushNotification"), {
  ssr: false,
  loading: () => null,
});

export default function PushNotificationClient() {
  return <PushNotification />;
}
