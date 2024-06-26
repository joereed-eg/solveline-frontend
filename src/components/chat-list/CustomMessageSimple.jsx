import React, { useEffect, useState } from "react";
import clsx from "clsx";
import CenterModal from "@/modals/CenterModal";
import { MessageErrorIcon } from "stream-chat-react";
import { MessageDeleted as DefaultMessageDeleted } from "stream-chat-react";
import { MessageOptions as DefaultMessageOptions } from "stream-chat-react";
import { MessageRepliesCountButton as DefaultMessageRepliesCountButton } from "stream-chat-react";
import { MessageStatus as DefaultMessageStatus } from "stream-chat-react";
import { MessageText } from "stream-chat-react";
import { MessageTimestamp as DefaultMessageTimestamp } from "stream-chat-react";
import {
  areMessageUIPropsEqual,
  messageHasAttachments,
  messageHasReactions,
} from "stream-chat-react";

import { Avatar as DefaultAvatar } from "stream-chat-react";
import {
  EditMessageForm as DefaultEditMessageForm,
  MessageInput,
} from "stream-chat-react";
import { MML } from "stream-chat-react";
import {
  ReactionsList as DefaultReactionList,
  ReactionSelector as DefaultReactionSelector,
} from "stream-chat-react";
import { useChatContext } from "stream-chat-react";
import { useComponentContext } from "stream-chat-react";
import { useMessageContext } from "stream-chat-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { updateQuotationStatus } from "../../redux/actions/chatActions";
import { PulseLoader } from "react-spinners";
import { CiCreditCard1, CiWallet } from "react-icons/ci";
import { useRouter } from "next/router";

// import { OfferCard } from './Offer';

const MessageSimpleWithContext = (props) => {
  const {
    endOfGroup,
    firstOfGroup,
    groupedByUser,
    handleAction,
    handleOpenThread,
    handleRetry,
    highlighted,
    isMyMessage,
    isReactionEnabled,
    message,
    onUserClick,
    onUserHover,
    reactionSelectorRef,
    renderText,
    showDetailedReactions,
    threadList,
    channel,
  } = props;

  const {
    Attachment,
    Avatar = DefaultAvatar,
    EditMessageInput = DefaultEditMessageForm,
    MessageDeleted = DefaultMessageDeleted,
    MessageOptions = DefaultMessageOptions,
    MessageRepliesCountButton = DefaultMessageRepliesCountButton,
    MessageStatus = DefaultMessageStatus,
    MessageTimestamp = DefaultMessageTimestamp,
    ReactionSelector = DefaultReactionSelector,
    ReactionsList = DefaultReactionList,
  } = useComponentContext("MessageSimple");
  const { themeVersion } = useChatContext("MessageSimple");
const router = useRouter()
  const acceptQuotationLoader = useSelector(
    (state) => state.chatData.acceptQuotationLoader
  );
  const rejectQuotationLoader = useSelector(
    (state) => state.chatData.rejectQuotationLoader
  );
  const userProfile = useSelector((state) => state.userData.userProfile);
  const cid = router?.asPath;
  const [visible, setVisible] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [useWalletAmount, setUseWalletAmount] = useState("");
  const [serviceAmount, setServiceAmount] = useState("");

  const [payableAmount, setPayableAmount] = useState('');

  const [quotationId, setQuotationId] = useState(null);
  const hasAttachment = messageHasAttachments(message);
  const hasReactions = messageHasReactions(message);
  const dispatch = useDispatch();
  if (message.deleted_at || message.type === "deleted") {
    return <MessageDeleted message={message} />;
  }

  useEffect(() => {
    setUseWalletAmount(userProfile?.wallet_amount);
  }, [userProfile.wallet_amount]);

  /** FIXME: isReactionEnabled should be removed with next major version and a proper centralized permissions logic should be put in place
   * With the current permissions implementation it would be sth like:
   * const messageActions = getMessageActions();
   * const canReact = messageActions.includes(MESSAGE_ACTIONS.react);
   */
  const canReact = isReactionEnabled;
  const canShowReactions = hasReactions;

  const showMetadata = !groupedByUser || endOfGroup;
  const showReplyCountButton = !threadList && !!message.reply_count;
  const allowRetry =
    message.status === "failed" && message.errorStatusCode !== 403;

  const rootClassName = clsx(
    "str-chat__message str-chat__message-simple",
    `str-chat__message--${message.type}`,
    `str-chat__message--${message.status}`,
    isMyMessage()
      ? "str-chat__message--me str-chat__message-simple--me"
      : "str-chat__message--other",
    message.text ? "str-chat__message--has-text" : "has-no-text",
    {
      "pinned-message": message.pinned,
      "str-chat__message--has-attachment": hasAttachment,
      "str-chat__message--highlighted": highlighted,
      "str-chat__message--with-reactions str-chat__message-with-thread-link":
        canShowReactions,
      "str-chat__message-send-can-be-retried":
        message?.status === "failed" && message?.errorStatusCode !== 403,
      "str-chat__virtual-message__wrapper--end": endOfGroup,
      "str-chat__virtual-message__wrapper--first": firstOfGroup,
      "str-chat__virtual-message__wrapper--group": groupedByUser,
    }
  );

  const quotationHandler = (id, status, paymentType) => {
    const quotationPayload = {
      status: status,
      id: id,
      type: useWallet ? paymentType : "stripe",
    };
    setQuotationId(id);
     dispatch(updateQuotationStatus(quotationPayload));
    setVisible(false);
  };

  useEffect(() => {
    if (!acceptQuotationLoader) {
      setQuotationId(null);
    }
  }, [acceptQuotationLoader]);
  useEffect(() => {
    if (!rejectQuotationLoader) {
      setQuotationId(null);
    }
  }, [rejectQuotationLoader]);

  const handleCheckboxChange = (e) => {
    setUseWallet(e.target.checked);
  };

  const paymentMethodHandler = (id, status, paymentType) => {
    if (userProfile.parent_user_id == null || status === "reject") {
       quotationHandler(id, status, paymentType);
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    const walletAmt = parseFloat(useWalletAmount.replace(/[$,]/g, ""));
    const serviceAmt = parseFloat(serviceAmount.replace(/[$,]/g, ""));
 
    if (useWallet) {
      const remainingWalletAmount = walletAmt - serviceAmt;
      if (remainingWalletAmount >= 0) {
         setUseWalletAmount(`$${remainingWalletAmount.toFixed(2)}`);
        setPayableAmount(`$0.00`);
      } else {
        setPayableAmount(`$${Math.abs(remainingWalletAmount).toFixed(2)}`);
        setUseWalletAmount(`$0.00`);
      }
    } else {
      setPayableAmount(`$${serviceAmt.toFixed(2)}`);
      setUseWalletAmount(userProfile?.wallet_amount);
    }
  }, [useWallet]);
  
   


  return (
    <>
      {
        <div className={rootClassName} key={message.id}>
          {themeVersion === "1" && <MessageStatus />}
          {message.user && (
            <Avatar
              image={message.user.image}
              name={message.user.name || message.user.id}
              onClick={onUserClick}
              onMouseOver={onUserHover}
              user={message.user}
              className="bg-balck"
            />
          )}
          <div
            className={clsx("str-chat__message-inner", {
              "str-chat__simple-message--error-failed": allowRetry,
            })}
            data-testid="message-inner"
            onClick={allowRetry ? () => handleRetry(message) : undefined}
            onKeyUp={allowRetry ? () => handleRetry(message) : undefined}
          >
            <MessageOptions />
            <div className="str-chat__message-reactions-host">
              {canShowReactions && <ReactionsList reverse />}
              {showDetailedReactions && canReact && (
                <ReactionSelector ref={reactionSelectorRef} />
              )}
            </div>
            <div className="str-chat__message-bubble">
              {message.attachments?.length && !message.quoted_message ? (
                <Attachment
                  actionHandler={handleAction}
                  attachments={message.attachments}
                />
              ) : null}
              {message?.quotation && message?.quotation?.service_name ? (
                <>
                  <div className="bg-white py-3 rounded-md mb-2 w-100">
                    <div className="flex justify-between px-4 py-3">
                      <p className="text-[18px] font-semibold pe-7 leading-6">
                        {message?.quotation?.service_name}
                      </p>
                      <h2 className="font-semibold w-[80px] text-end leading-6">
                        {message?.quotation?.service_amount}
                      </h2>
                    </div>
                    <div className="border-t py-4">
                      <div className="px-4">
                        <p className="text-[14px] font-normal text-[#71717A] leading-5">
                          {message?.quotation?.description}
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-4 pb-1 md:flex justify-between items-center">
                      <div className="px-4 md:pb-0 pb-4">
                        <p className="text-[14px] font-normal text-[#000000] leading-5">
                          {moment(message?.quotation?.slot_time).format(
                            "MMM DD, YYYY h:mm A"
                          )}
                        </p>
                      </div>
                      <div>
                        {message?.quotation.status === 1 ? (
                          <div className="px-4">
                            <div className="text-[14px] font-normal quotation_btn accept">
                              Accepted
                            </div>
                          </div>
                        ) : message?.quotation.status === 2 ? (
                          <div className="px-4">
                            <div className="text-[14px] font-normal quotation_btn reject">
                              Rejected
                            </div>
                          </div>
                        ) : message?.quotation.status === 0 ? (
                          <div className="px-4">
                            <button
                              className="btn btn-light btn-light-shadow"
                              onClick={() => {
                                paymentMethodHandler(
                                  message?.quotation?.id,
                                  "accept",
                                  "stripe"
                                );
                                setServiceAmount(
                                  message?.quotation?.service_amount
                                );
                                setPayableAmount(message?.quotation?.service_amount)
                              }}
                            >
                              {acceptQuotationLoader &&
                              quotationId == message?.quotation?.id ? (
                                <PulseLoader size={10} color="#CB333B" />
                              ) : (
                                // " "
                                `Accept`
                              )}
                            </button>
                            <button className="btn btn-danger btn-danger-shadow mx-2" 
                             onClick={() => {
                              paymentMethodHandler(
                                message?.quotation?.id,
                                "reject",
                                "stripe"
                              );
                             }}
                            >
                              {rejectQuotationLoader &&
                              quotationId == message?.quotation?.id ? (
                                <>
                                  <PulseLoader size={10} color="#FFFFFF" />
                                </>
                              ) : (
                                `Reject`
                              )}
                            </button>

                            <CenterModal
                              setVisible={setVisible}
                              visible={visible}
                              title="Payment"
                            >
                              <div className="px-5 py-3 flex items-center justify-between">
                                <h2 className="ps-2 text-black">
                                  Your Wallet Amount :
                                </h2>
                                <span className="font-bold">
                                  {useWalletAmount}
                                </span>
                              </div>

                              <div className="px-5 py-3 flex items-center justify-between">
                                <h2 className="ps-2 text-black">
                                  Service Amount :
                                </h2>
                                <span className="font-bold">
                                  {" "}
                                  {message?.quotation?.service_amount}
                                </span>
                              </div>
                              <div className="px-5 py-3 flex items-center justify-between">
                                <h2 className="ps-2 text-black">
                                  Payable Amount :
                                </h2>
                                <span className="font-bold">
                                  {" "}
                                  {payableAmount}
                                </span>
                              </div>
                              <div className="px-5">
                                <div className="flex items-center justify-end md:pb-0 pb-3 md:pt-5 pt-2 ">
                                  <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                      <input
                                        id="termsAndConditions"
                                        type="checkbox"
                                        disabled={!useWallet && useWalletAmount === "$0.00"}
                                        name="termsAndConditions"
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        style={{ padding: "10px" }}
                                      />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label
                                        htmlFor="termsAndConditions"
                                        className="text-black font-bold"
                                      >
                                        Pay with Wallet
                                      </label>
                                    </div>
                                  </div>
                                  {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                                </div>
                              </div>

                              <div className="flex border-t pt-2 pb-1 mt-5 ">
                                <div
                                  className="pb-3 pt-2 px-5 w-100 justify-end flex"
                                  onClick={() => {
                                    quotationHandler(
                                      message?.quotation?.id,
                                      "accept",
                                      "wallet"
                                    );
                                  }}
                                  // onClick={handleProceed}
                                >
                                  <button className="btn btn-danger btn-shadow-danger">
                                    <span className="">Proceed</span>
                                  </button>
                                </div>
                              </div>
                            </CenterModal>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <MessageText message={message} renderText={renderText} />
                  {/* {moment(message?.created_at).format("h:mm A")} */}
                </>
              )}

              {message.mml && (
                <MML
                  actionHandler={handleAction}
                  align={isMyMessage() ? "right" : "left"}
                  source={message.mml}
                />
              )}
              {themeVersion === "2" && <MessageErrorIcon />}
            </div>
            {showReplyCountButton && themeVersion === "1" && (
              <MessageRepliesCountButton
                onClick={handleOpenThread}
                reply_count={message.reply_count}
              />
            )}
            {showMetadata && themeVersion === "1" && (
              <div className="str-chat__message-data str-chat__message-simple-data">
                {!isMyMessage() && message.user ? (
                  <span className="str-chat__message-simple-name">
                    {message.user.name || message.user.id}
                  </span>
                ) : null}
                <MessageTimestamp
                  calendar
                  customClass="str-chat__message-simple-timestamp"
                />
                {message.created_at}
              </div>
            )}
          </div>

          {showMetadata && themeVersion === "2" && (
            <div className="str-chat__message-data str-chat__message-simple-data str-chat__message-metadata">
              <MessageStatus />
              {!isMyMessage() && !!message.user && (
                <span className="str-chat__message-simple-name">
                  {message.user.name || message.user.id}
                </span>
              )}
              {/* <MessageTimestamp calendar customClass='str-chat__message-simple-timestamp' /> */}
              {moment(message?.created_at).format("h:mm A")}
            </div>
          )}
        </div>
      }
    </>
  );
};

const MemoizedMessageSimple = React.memo(
  MessageSimpleWithContext,
  areMessageUIPropsEqual
);

/**
 * The default UI component that renders a message and receives functionality and logic from the MessageContext.
 */
export const CustomMessageSimple = (props) => {
  const messageContext = useMessageContext("MessageSimple");

  return <MemoizedMessageSimple {...messageContext} {...props} />;
};
