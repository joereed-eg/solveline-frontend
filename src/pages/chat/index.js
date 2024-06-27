import Layout from "@/components/Layout";
import ChatTopBar from "@/components/navbars/ChatTopBar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import { CustomMessageSimple } from "../../components/chat-list/CustomMessageSimple";
import { IoIosArrowRoundBack } from "react-icons/io";
import TopNavbar from "../../components/top-navbar/TopNavbar";
import { getProfileData } from "../../redux/actions/userActionTypes";

import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChannelStateContext,
  useChatContext,
  ChannelList,
  Avatar,
  useChannelActionContext,
  useMessageInputContext,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import moment from "moment";
import Link from "next/link";
import { sendFirstMsgNotification } from "../../redux/actions/chatActions";

const UserChat = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData?.userProfile);

  const userUUId = `${userData?.uuid}`;
  const apiKey = "hcg9ukn84xfs";
  
  const userToken = userData?.chat_token;

  //  const providerChatId = router?.asPath
  const cid = router?.asPath;
 

  const [isClientConnected, setIsClientConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isChatStart, setIsChatStart] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      dispatch(getProfileData());
    }
  }, [router]);

  const init = async () => {
    const newClient = StreamChat.getInstance(apiKey);
    setClient(newClient);

    if (client?.user) {
      // If it is connected, disconnect the user first
      await client.disconnectUser();
    }

    await newClient.connectUser(
      {
        id: userUUId,
        user_details: {
          id: userUUId,
          // You can add other user details here if needed
        },
      },
      userToken
    );

    setIsClientConnected(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isClientConnected || !client) {
    return null; // You can render a loading spinner or message here while the client is being initialized
  }
  const chatBackButton = () => {
    router.push("/chat");
    setIsChatStart(false);
    setTimeout(() => {
      setIsChatStart(false);
    }, 1000);
  };

  // Function to handle message send

  const CustomChannelHeader = () => {
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();
    const [provider, setProvider] = useState(null);
    if (!channel || !client) return null;

    useEffect(() => {
      const matchedObject = Object.values(channel.state.members).find(
        (obj) => obj.user_id !== userUUId
      );
      setProvider(matchedObject?.user);
     }, [channel]);

    return (
      <div className="chat_top_bar border-b-[1px] border-[#E8E8E8]  bg-white">
        <div className="p-2 flex items-center py-3">
          <div className="user_image">
            <Image
              src={provider?.image ? provider?.image : "/images/user_img.png"}
              className="rounded-full max-h-[40px] max-w-[40px]"
              width={40}
              height={40}
              alt="user img"
            />{" "}
          </div>
          <div className="user_info ps-2 w-full">
            <div className="user_name flex justify-between">
              <p className="text-[14px] font-[600] font- text-black">
                {provider?.name}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[13px] text-[#85878F] truncate w-[190px]">
                {provider?.specialization}
              </p>
            </div>
          </div>
          <div>
            <Link
              href={`/search/profile/${provider?.user_id}`}
              className="btn btn-light btn-light-shadow w-100 text-nowrap"
            >
              View profile
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const CustomChannelPreview = (props) => {
    const { channel, setActiveChannel, activeChannel } = props;
    const { messages } = channel.state;

    const unreadCount = channel.state.unreadCount;

    const latestMessage = messages[messages.length - 1];
    const messagePreview = latestMessage?.text;

    let formattedDate;
    if (moment(latestMessage?.updated_at).isBefore(moment(), "day")) {
      formattedDate = moment(latestMessage?.updated_at).format("DD-MMM-YYYY");
    } else {
      formattedDate = moment(latestMessage?.updated_at).format("h:mm A");
    }

    const [customChannelPreview, setCustomChannelPreview] = useState();

  
    useEffect(() => {
      // let ids = Object.keys(channel.state.members);
      // ids.pop(ids.indexOf(userId));

      // setCustomChannelPreview(channel.state.members[ids[0]]);
      // let userChatID = Object.keys(channel.state.members);
      const userFilterChatData = Object.values(channel.state.members).find(
        (obj) => obj.user_id !== userUUId
      );
      // setCustomChannelPreview(channel.state.members[userChatID]);
      setCustomChannelPreview(userFilterChatData);
    }, [channel, messages]);

    useEffect(() => {
      if (router.isReady) {
         if (channel.cid === cid?.split("chat?")[1]) {
          if (channel.cid === cid?.split("chat?")[1] && channel.state.members) {
            setActiveChannel?.(channel);
            setIsChatStart(true);
          }
        }
      }
    }, [router]);
    if (!customChannelPreview?.user?.name) {
      return null;
    }

    const startChatHandler = () => {
      setActiveChannel?.(channel);
      // let chatIds = Object.keys(channel.state.members)
      // let filterId = chatIds.filter((id) => id !== userId)[0];
      setIsChatStart(true);
      router.push(`/chat?${channel.cid}`);
    };

    return (
      <div
        onClick={() => startChatHandler()}
        className={`w-full flex ps-3 pb-2 border-b-[1px] pt-2 cursor-pointer ${
          activeChannel === channel ? "active_channel" : ""
        }`}
      >
        <div className="user_image">
          <Image
            src={customChannelPreview?.user?.image}
            className="max-w-[42px] max-h-[42px] min-h-[42px] rounded-full"
            alt="channel-image"
            width={42}
            height={42}
          />
        </div>
        <div style={{ flex: 1 }} className="ps-3">
          <div className="flex items-center justify-between pe-3">
            <div className="str-chat__channel-preview-messenger--name">
              {customChannelPreview?.user?.name}
            </div>
            <p className="text-[12px] font-medium text-[#85878F]">
              {formattedDate}
            </p>
          </div>
          <div className="flex justify-between">
            {messagePreview && (
              <div
                style={{ fontSize: "14px" }}
                className="text-truncate-1 str-chat__channel-preview-messenger--last-message "
              >
                {messagePreview}
              </div>
            )}

            {unreadCount > 0 && (
              <div className="mx-2 notification_count text-white rounded-full ">
                {channel.state.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const customSearchFunction = async (props, event, client) => {
    const { setResults, setSearching, setQuery } = props;
    let value = event.target.value.trim(); // Trim whitespace
    setSearchValue(value);
    if (!value) {
      setResults([]);
      setQuery("");
      return;
    }
    const filters = {
      $and: [
        { members: { $in: [client.userID] } }, // Assuming client.userID is an array containing the current user's ID
      ],
    };

    setSearching(true);
    setQuery(value);
    try {
      const channels = await client.queryChannels(filters);
      // setIsChatStart(true);
      setResults(channels);
    } catch (error) {
      console.error("Error querying channels:", error);
    }
    setSearching(false);
  };

  const isChannel = (output) => output.cid != null;

  const CustomResultItem = (props) => {
    const { focusedUser, index, result, selectResult } = props;
    const focused = focusedUser === index;

    if (isChannel(result)) {
      const channel = result;
      const userFilterChatData = Object.values(channel.state.members).find(
        (obj) => obj.user_id !== userUUId
      );
      return (
        <>
          {userFilterChatData?.user?.name
            ?.toLowerCase()
            ?.startsWith(searchValue.toLowerCase()) && (
            <div
              className={`str-chat__channel-search-result ${
                focused ? "focused" : ""
              }`}
              onClick={() => {
                setIsChatStart(true);
                selectResult(result);
              }}
            >
              <div className="result-hashtag">
                <Avatar image={userFilterChatData?.user?.image} />
              </div>

              <p className="channel-search__result-text">
                {userFilterChatData?.user?.name}
              </p>
            </div>
          )}
        </>
      );
    }
  };

  const SearchResult = (props) => <CustomResultItem {...props} />;

  const additionalProps = {
    searchFunction: (params, event) => {
      return customSearchFunction(params, event, client);
    },
    popupResults: true,
    searchForChannels: true,
    SearchResultItem: SearchResult,
  };
  const MarkReadButton = (props) => {};

  const CustomMessageInput = () => {
    
    const { channel } = useChannelStateContext();
    if (!channel || !client) return null;
    const submitTextMsg = useRef(null);
    const { text, handleChange, handleSubmit, setText } =
      useMessageInputContext();
    const { markRead } = useChannelActionContext();

   
    const FirstMsgSend = () => {
      const userFilterUUidId = Object.values(channel.state.members).find(
        (obj) => obj.user_id !== userUUId
      );
      if (channel?.state?.messageSets[0]?.messages?.length === 1) {
        const sendMsg = {
          uuid:userFilterUUidId.user.id
        };
        dispatch(sendFirstMsgNotification(sendMsg));
      }
     }

    const handleChangeInput = (e) => {
      // Check if Enter key is pressed (keyCode 13)
      if (e.keyCode === 13 && !e.shiftKey) {
         submitTextMsg.current.click();
        FirstMsgSend()
        setText("");

        // Prevent the default behavior of the Enter key (preventing line break)
      } else {
        // Call markRead when the input value changes
        markRead();
      }
    };

    useEffect(() => {
      if (text.trim().length === 0) {
        setText("");
      }
    }, [text]);

    return (
      <div className="message-input">
        <input
          value={text}
          className="message-input__input"
          placeholder="Type your message..."
          onChange={handleChange}
          onKeyDown={(e) => handleChangeInput(e)}
        />
        <button
          ref={submitTextMsg}
          type="button"
          className="message-input__button"
          onClick={handleSubmit}
          onKeyDown={handleSubmit}
        >
          <Image
            src={"./images/icons/checkEnter_icon.svg"}
            width={30}
            height={30}
            alt="enter icon"
          />
        </button>
      </div>
    );
  };

  const dateElements = document.querySelectorAll(
    ".str-chat__date-separator-date"
  );
  // Loop through each date element
  dateElements?.forEach((dateElement) => {
    // Check if the text content contains “New - Today at 1:30 PM”
    if (dateElement?.textContent?.includes("New - Today at")) {
      // Set the parent li element’s style to display: none
      const parentLi = dateElement.closest("li");
      if (parentLi) {
        parentLi.style.display = "none";
      }
    }
  });

  return (
    <div>
      <TopNavbar />
      <Layout>
        <div className="">
          <ChatTopBar title="Messages" />
        </div>
        <Chat client={client} theme="str-chat__theme-light">
          <div className="md:flex mpt-2 border-t-[1px]">
            <div className="md:w-3/12 w-full border-r-[1px] border-[#E8E8E8]">
              <ChannelList
                filters={{ type: "messaging", members: { $in: [userUUId] } }}
                sort={{ last_message_at: -1, updated_at: -1 }}
                setActiveChannelOnMount={false}
                additionalChannelSearchProps={additionalProps}
                Preview={CustomChannelPreview}
                showChannelSearch
              />
            </div>
            <div
              className={`md:w-9/12 w-full ${
                isChatStart ? "chat_view_msg " : "chat_hide"
              } relative`}
            >
              <div
                className="absolute left-3 z-50 top-[-24px] cursor-pointer back-button"
                onClick={() => chatBackButton()}
              >
                <div className="flex items-center py-2">
                  <IoIosArrowRoundBack />
                  <span>Back</span>
                </div>
              </div>

              <div className="min-h-[92vh] max-h-[92vh]  w-100">
                {isChatStart ? (
                  <Channel>
                    <Window>
                      <>
                        <CustomChannelHeader />

                        <MessageList Message={CustomMessageSimple} />

                        <MessageInput
                          Input={CustomMessageInput}
                        />
                        <MarkReadButton />
                      </>
                    </Window>
                    <Thread />
                  </Channel>
                ) : (
                  <>
                    <div className=" flex justify-center  h-[90vh] bg-[#F6F6F6]">
                      <div className="my-10">
                        {/* <div className="flex justify-center">
                        <CiChat1 size={100} color="#B4B7BB"/>
                        </div> */}
                        <span className="text-[18px] font-medium ">
                          No chat started yet!
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Chat>
      </Layout>
    </div>
  );
};

export default UserChat;
