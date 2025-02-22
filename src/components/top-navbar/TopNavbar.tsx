import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Layout.module.css';
import { AppState } from '@/redux/types';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { RiMenu5Line } from 'react-icons/ri';
import { logoutUser, userLogout } from '@/redux/actions/userActionTypes';
import { StreamChat, Channel } from 'stream-chat';
import { ChatApiKey, Roles } from '@/types/userInterface';
import { commonNavItems, companyNavItems, consumerNavItems, parentUserNavItem, profileNavItem } from "@/components/navItems/navItems";

type Props = {}

interface UserData {
    uuid: string;
    chat_token: string;
  }
  
  // Define the type for the channel
  type ChannelWithUnreadCount = Channel & {
    countUnread: () => number;
  };

const TopNavbar = (props: Props) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userProfile = useSelector((state: AppState) => state.userData.userProfile)
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    const apiKey = ChatApiKey.KEY;
    const client = StreamChat.getInstance(apiKey);

    const userLogoutHandler = async () => {
        localStorage.clear();
        dispatch(userLogout());
        dispatch(logoutUser())
        setTimeout(() => {
            client.disconnectUser();
        }, 1000);
    }


  const userData = useSelector((state: AppState) => state.userData?.userProfile) as UserData | undefined;

  const [unreadCount, setUnreadCount] = useState<number>(0);

  const updateUnreadMessageCount = (channels: ChannelWithUnreadCount[]) => {
    let count = 0;

    channels.forEach(channel => {
      if (channel.countUnread() > 0) {
        count++;
      }
    });

    setUnreadCount(count);
  };

  const userUUId = userData?.uuid;
  const userToken = userData?.chat_token;

  const getUnreadChannelCount = async () => {
    const chatClient = StreamChat.getInstance(apiKey);

    try {
      await chatClient.setUser(
        { id: userUUId ? userUUId : "" },
        userToken
      );

      const channels = await chatClient.queryChannels(
        { members: { $in: [userUUId ? userUUId : ""] } },
        { last_message_at: -1 }
      ) as ChannelWithUnreadCount[];

      updateUnreadMessageCount(channels);

      chatClient.on('message.new', async () => {
        const updatedChannels = await chatClient.queryChannels(
          { members: { $in: [userUUId ? userUUId : ""] } },
          { last_message_at: -1 }
        ) as ChannelWithUnreadCount[];
        updateUnreadMessageCount(updatedChannels);
      });

      chatClient.on('message.read', async () => {
        const updatedChannels = await chatClient.queryChannels(
          { members: { $in: [userUUId ? userUUId : ""] } },
          { last_message_at: -1 }
        ) as ChannelWithUnreadCount[];
        updateUnreadMessageCount(updatedChannels);
      });
    } catch (error) {
      console.error("Error querying channels:", error);
    }
  };

  useEffect(() => {
    getUnreadChannelCount();
  }, []);


    return (
        <div>
            <nav className={`${styles.rightTopNavbar} ${userProfile?.isAuth ? styles.rightTopNavbar_desktop : styles.main_content_hideSideNave} sideNavbarResponsiveOverlay flex`}>
                <span className='text-black title_text_expo font-medium md:px-5 px-3 w-100'>
                    <div className='flex items-center justify-between'>
                        {!userProfile?.isAuth && (
                            <div className='py-2'>
                                <Link href={'/'}>
                                    <Image src={"/images/logo.png"} width={120} height={59} alt="Logo" />
                                </Link>
                            </div>
                        )}
                        {userProfile?.isAuth && (
                            <div className='md:hidden block'>
                                <Link href={'/'}>
                                    <Image src={"/images/logo_icon.png"} width={32} height={32} alt="Logo" />
                                </Link>
                            </div>
                        )}
                        <div className='flex'>
                            {!userProfile?.isAuth && (
                                <>
                                    <Link href={"/login"} className='btn btn-light mr-3 block'>Log In</Link>
                                    <Link href={"/signup"} className='btn btn-danger'>Sign Up</Link>
                                </>
                            )}
                        </div>
                        {userProfile?.isAuth && (
                            <button onClick={() => toggleSidebar()} className='md:hidden block'>
                                {isSidebarVisible ?
                                    <RiMenu5Line color="#282C32" size={30} />
                                    :
                                    <IoCloseSharp color="#FF5402" size={30} />
                                }
                            </button>
                        )}
                    </div>
                    {router?.pathname === "/" && userProfile?.isAuth && (
                        <div className='flex items-center md:justify-start justify-center py-3'>
                            <div>
                                👋 Welcome {userProfile?.name}
                            </div>
                        </div>
                    )}
                </span>
                <nav className={`${styles.sideNavbar} ${isSidebarVisible ? styles.sideNavbarResponsive : styles.sideNavbarResponsiveShow} md:hidden block`}>
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
                                {userProfile?.role === Roles.COMPANY && companyNavItems.map((item, index) => (
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
                                {userProfile?.role === Roles.CONSUMER && consumerNavItems.map((item, index) => (
                                    <li key={index} className={`nav_item ${router?.asPath === item.href && 'active'}`}>
                                       <Link href={item.href} className="flex justify-between">
                                            <span className="flex items-center">
                                                <span className="pr-2">
                                                    {typeof item.icon === 'string' ? (
                                                        <Image src={item.icon} width={22} height={22} alt={item.label} />
                                                    ) : (
                                                        item.icon
                                                    )}
                                                </span>
                                                {item.label}
                                            </span>
                                            {index === 2 &&
                                                <>
                                                    {unreadCount > 0 && (
                                                        <span className="bg-[#cb333b] w-[30px] h-[20px] text-[12px] font-[500] text-white text-center rounded-[30px] flex justify-center mt-1">
                                                            {unreadCount}
                                                        </span>
                                                    )}
                                                </>
                                            }

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
                                {userProfile?.parent_user_id !== null && parentUserNavItem.map((item, index) => (
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
                </nav>
            </nav>
        </div>
    )
}

export default TopNavbar
