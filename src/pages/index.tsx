import HomePage from "@/components/templates/Home";
import CustomHead from "@/components/ui/Head";
import { io } from "socket.io-client";

export const socket = io({
  path: "/api/socket",
  closeOnBeforeunload: false,
});

export default function Index() {
  return (
    <>
      <CustomHead title="Lobby" />
      <HomePage />
    </>
  );
}
