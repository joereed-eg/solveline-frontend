// import { userLogout } from "@/redux/actions/userActionTypes";
// import { AppState } from "@/redux/types";
// import { Roles } from "@/types/userInterface";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React from "react";
// import { BiLogOut } from "react-icons/bi";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import { StreamChat } from "stream-chat";
// import { AiOutlineFundProjectionScreen } from "react-icons/ai";
// import { CiWallet } from "react-icons/ci";

// type Props = {
//   isSidebarVisibleDesktop: boolean;
//   isSidebarVisible: boolean;
//   toggleSidebar: () => void;
//   toggleSidebarClose: () => void;
//   toggleSidebarDesktop: () => void;

// }
// const Sidebar = (props: Props) => {
//   const router = useRouter()
//   const dispatch = useDispatch()
//   const userProfile = useSelector((state: AppState) => state.userData.userProfile)


//   const apiKey = "6x4xzmut8ma6";
//   const client = StreamChat.getInstance(apiKey);

//   const userLogoutHandler = async () => {
//     localStorage.clear();
//     dispatch(userLogout());
//     setTimeout(() => {
//       client.disconnectUser();
//     }, 1000);
//   }





//   return (

//     <div className="h-100 grid ">
//       <div className="p-5">
//         <Link href={'/'}>
//           <Image src={"/images/logo_icon.png"} width={32} height={32} alt="Logo" /> </Link>
//         <header className="navbar">
//           <ul className="nav_items">
//             <li className={`nav_item ${router?.asPath === "/" && 'active'}`}>
//               <Link href="/" className="flex items-center">
//                 <span className="pr-2">
//                   <Image src={"/images/icons/home_icon.svg"} width={22} height={22} alt="home_icon" />
//                 </span>
//                 Home
//               </Link>
//             </li>
//             {userProfile.role === Roles.COMPANY &&
//               <>
//                 <li className={`nav_item ${router.asPath?.split("/")?.[1] === "employees" && 'active'}`}>
//                   <Link href="/employees" className="flex items-center">
//                     <span className="pr-2">
//                       <Image src={"/images/employees_icon.png"} width={22} height={22} alt="home_icon" />
//                     </span>
//                     Employees</Link>
//                 </li>
//                 <li className={`nav_item ${router.asPath?.split("/")?.[1] === "fund-management" && 'active'}`}>
//                   <Link href="/fund-management" className="flex items-center">
//                     <span className="pr-2">
//                       <AiOutlineFundProjectionScreen size={18} />
//                     </span>
//                     Fund Management</Link>
//                 </li>
//                 <li className={`nav_item ${router.asPath?.split("/")?.[1] === "payment-history" && 'active'}`}>
//                   <Link href="/payment-history" className="flex items-center">
//                     <span className="pr-2">
//                       <FaMoneyBillTransfer size={18} />
//                     </span>
//                     Payment History</Link>
//                 </li>
//                 <li className={`nav_item ${router.asPath?.split("/")?.[1] === "wallet-ledger" && 'active'}`}>
//                   <Link href="/wallet-ledger" className="flex items-center">
//                     <span className="pr-2">
//                       <CiWallet size={18} />
//                     </span>
//                     Wallet Ledger</Link>
//                 </li>
//               </>
//             }
//             {userProfile.role === Roles.CONSUMER &&
//               <>
//                 <li className={`nav_item ${router.asPath?.split("/")?.[1] === "search" && 'active'}`}>
//                   <Link href="/search" className="flex items-center">
//                     <span className="pr-2">
//                       <Image src={"/images/icons/search_icon.svg"} width={22} height={22} alt="home_icon" />
//                     </span>
//                     Search</Link>
//                 </li>


//                 <li className={`nav_item ${router.asPath?.split("/")?.[1] === "appointments" && 'active'}`}>
//                   <Link href="/appointments" className="flex items-center">
//                     <span className="pr-2">
//                       <Image src={"/images/icons/colander_icon.svg"} width={22} height={22} alt="home_icon" />
//                     </span>
//                     My Appointments
//                   </Link>
//                 </li>
//                 <li className={`nav_item ${router.asPath?.startsWith("/chat") && 'active'}`}>
//                   <Link href="/chat" className="flex items-center">
//                     <span className="pr-2">
//                       <Image src={"/images/icons/messages_icon.svg"} width={22} height={22} alt="home_icon" />
//                     </span>Messages</Link>
//                 </li>
//               </>
//             }
//             {userProfile.parent_user_id !== null &&
//               <li className={`nav_item ${router.asPath?.split("/")?.[1] === "wallet-history" && 'active'}`}>
//                 <Link href="/wallet-history" className="flex items-center">
//                   <span className="pr-2">
//                     <CiWallet size={18} />
//                   </span>Wallet History</Link>
//               </li>
//             }
//             <li className={`nav_item ${router.asPath?.split("/")?.[1] === "profile" && 'active'}`}>
//               <Link href="/profile" className="flex items-center">
//                 <span className="pr-2">
//                   <Image src={"/images/icons/setting_icon.svg"} width={22} height={22} alt="home_icon" />
//                 </span>Profile</Link>
//             </li>

//             <li className="nav_item cursor-pointer">
//               <span className="flex items-center" onClick={() => userLogoutHandler()}>
//                 <Link href="/" className="flex items-center">
//                   <span className="pr-2">
//                     <BiLogOut size={22} />
//                   </span>
//                   Logout
//                 </Link>
//               </span>

//             </li>
//           </ul>
//         </header>

//       </div>
//       <div className="self-end border-t-2 px-5 pb-2">
//         <Link href={'/profile'} className='pt-3 w-100 block'>
//           {userProfile?.name ? (
//             <div className="flex items-center">
//               <div className='user_icon_navbar text-black'>
//                 {userProfile?.image &&
//                   <Image src={userProfile.image} className='rounded-full min-w-[40px] min-h-[40px] max-h-[40px] max-w[40px] object-cover' alt='user_icon' width={40} height={40} />
//                 }
//               </div>
//               <p className="text-black ps-2  text-truncate-1" style={{ maxWidth: "171px" }} >{userProfile.name}</p>
//             </div>
//           ) : (
//             <div className="flex">
//               <div className="">
//                 <Image src={"/images/user_img.png"} className='rounded-full min-w-[40px] min-h-[40px] max-h-[40px] max-w[40px] object-cover' alt='user_icon' width={50} height={50} />
//               </div>
//             </div>
//           )}

//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import { logoutUser, userLogout } from "@/redux/actions/userActionTypes";
import { AppState } from "@/redux/types";
import { Roles } from "@/types/userInterface";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import { commonNavItems, companyNavItems, consumerNavItems, parentUserNavItem, profileNavItem } from "@/components/navItems/navItems";

type Props = {
  isSidebarVisibleDesktop: boolean;
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  toggleSidebarClose: () => void;
  toggleSidebarDesktop: () => void;
}

const Sidebar = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userProfile = useSelector((state: AppState) => state.userData.userProfile);

  const apiKey = "6x4xzmut8ma6";
  const client = StreamChat.getInstance(apiKey);

  const userLogoutHandler = async () => {
    localStorage.clear();
    dispatch(userLogout());
    dispatch(logoutUser())
    setTimeout(() => {
      client.disconnectUser();
    }, 1000);
  };

  return (
    <div className="h-100 grid">
      <div className="p-5">
        <Link href={'/'}>
          <Image src={"/images/logo_icon.png"} width={32} height={32} alt="Logo" />
        </Link>
        <header className="navbar">
          <ul className="nav_items">
            {commonNavItems.map((item, index) => (
              <li key={index} className={`nav_item ${router?.asPath === item.href && 'active'}`}>
                <Link href={item.href} className="flex items-center">
                  <span className="pr-2">
                    {typeof item.icon === 'string' ? (
                      <Image src={item.icon} width={22} height={22} alt={item.label} />
                    ) : (
                      item.icon
                    )}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            {userProfile.role === Roles.COMPANY && companyNavItems.map((item, index) => (
              <li key={index} className={`nav_item ${router?.asPath === item.href && 'active'}`}>
                <Link href={item.href} className="flex items-center">
                  <span className="pr-2">
                    {typeof item.icon === 'string' ? (
                      <Image src={item.icon} width={22} height={22} alt={item.label} />
                    ) : (
                      item.icon
                    )}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            {userProfile.role === Roles.CONSUMER && consumerNavItems.map((item, index) => (
              <li key={index} className={`nav_item ${router?.asPath === item.href && 'active'}`}>
                <Link href={item.href} className="flex items-center">
                  <span className="pr-2">
                    {typeof item.icon === 'string' ? (
                      <Image src={item.icon} width={22} height={22} alt={item.label} />
                    ) : (
                      item.icon
                    )}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
             {userProfile.parent_user_id !== null && parentUserNavItem.map((item, index) => (
              <li key={index} className={`nav_item ${router?.asPath === item.href && 'active'}`}>
                <Link href={item.href} className="flex items-center">
                  <span className="pr-2">
                    {typeof item.icon === 'string' ? (
                      <Image src={item.icon} width={22} height={22} alt={item.label} />
                    ) : (
                      item.icon
                    )}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            {profileNavItem.map((item, index) => (
              <li key={index} className={`nav_item ${router?.asPath === item.href && 'active'}`}>
                <Link href={item.href} className="flex items-center">
                  <span className="pr-2">
                    {typeof item.icon === 'string' ? (
                      <Image src={item.icon} width={22} height={22} alt={item.label} />
                    ) : (
                      item.icon
                    )}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
           
            <li className="nav_item cursor-pointer">
              <span className="flex items-center" onClick={() => userLogoutHandler()}>
                <Link href="/" className="flex items-center">
                  <span className="pr-2">
                    <BiLogOut size={22} />
                  </span>
                  Logout
                </Link>
              </span>
            </li>
          </ul>
        </header>
      </div>
      <div className="self-end border-t-2 px-5 pb-2">
        <Link href={'/profile'} className='pt-3 w-100 block'>
          {userProfile?.name ? (
            <div className="flex items-center">
              <div className='user_icon_navbar text-black'>
                {userProfile?.image &&
                  <Image src={userProfile.image} className='rounded-full min-w-[40px] min-h-[40px] max-h-[40px] max-w[40px] object-cover' alt='user_icon' width={40} height={40} />
                }
              </div>
              <p className="text-black ps-2 text-truncate-1" style={{ maxWidth: "171px" }}>{userProfile.name}</p>
            </div>
          ) : (
            <div className="flex">
              <div>
                <Image src={"/images/user_img.png"} className='rounded-full min-w-[40px] min-h-[40px] max-h-[40px] max-w[40px] object-cover' alt='user_icon' width={50} height={50} />
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
