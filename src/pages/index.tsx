import HomePage from "@/components/templates/Home";
import Layout from "@/components/ui/Layout";
import { io } from "socket.io-client";

export const socket = io({
  path: "/api/socket",
  closeOnBeforeunload: false,
});

export default function Index() {
  return (
    <Layout title="Lobby">
      <HomePage />
    </Layout>
  );
}
