"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import AdminNavbar from "./adminNavbar";

export default function NavbarSwitcher() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return isAdmin ? <AdminNavbar /> : <Navbar />;
}