import { logoutUser, userLogout } from "@/redux/actions/userActionTypes";
import { AppState } from "@/redux/types";
import { ChatApiKey, Roles } from "@/types/userInterface";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { StreamChat, Channel } from "stream-chat";
import { commonNavItems, companyNavItems, consumerNavItems, parentUserNavItem, profileNavItem } from "@/components/navItems/navItems";

type Props = {
  isSidebarVisibleDesktop: boolean;
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  toggleSidebarClose: () => void;
  toggleSidebarDesktop: () => void;
}


interface UserData {
  uuid: string;
  chat_token: string;
}

// Define the type for the channel
type ChannelWithUnreadCount = Channel & {
  countUnread: () => number;
};


const Sidebar = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userProfile = useSelector((state: AppState) => state.userData.userProfile);

  const apiKey = ChatApiKey.KEY;
  const client = StreamChat.getInstance(apiKey);

  const userLogoutHandler = async () => {
    localStorage.clear();
    dispatch(userLogout());
    dispatch(logoutUser())
    setTimeout(() => {
      client.disconnectUser();
    }, 1000);
  };


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
                        <span className="bg-[#FF5402] w-[30px] h-[20px] text-[12px] font-[500] text-white text-center rounded-[30px] flex justify-center mt-1">
                          {unreadCount}
                        </span>
                      )}
                    </>
                  }

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
