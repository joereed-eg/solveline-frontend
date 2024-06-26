// navItems.js
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CiWallet } from "react-icons/ci";

export const commonNavItems = [
  { href: "/", icon: "/images/icons/home_icon.svg", label: "Home" },
];

export const companyNavItems = [
  { href: "/employees", icon: "/images/employees_icon.png", label: "Employees" },
  { href: "/fund-management", icon: <AiOutlineFundProjectionScreen size={18} />, label: "Fund Management" },
  { href: "/payment-history", icon: <FaMoneyBillTransfer size={18} />, label: "Payment History" },
  { href: "/wallet-ledger", icon: <CiWallet size={18} />, label: "Wallet Ledger" }
];

export const consumerNavItems = [
  { href: "/search", icon: "/images/icons/search_icon.svg", label: "Search" },
  { href: "/appointments", icon: "/images/icons/colander_icon.svg", label: "My Appointments" },
  { href: "/chat", icon: "/images/icons/messages_icon.svg", label: "Messages" }
];
export const profileNavItem = [
  { href: "/profile", icon: "/images/icons/setting_icon.svg", label: "Profile" }
];

export const parentUserNavItem = [
  { href: "/wallet-history", icon: <CiWallet size={18} />, label: "Wallet Ledger" }
];
