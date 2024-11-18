import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import styled, { css } from "styled-components";
import { UserRequest } from "@/shared/api/userApi";
import { GetUserChatRoomRequest } from "./api/hostMessageApi";
import Avatar from "react-avatar";
import TextInput from "@/shared/components/Input/TextInput";
import { AiOutlineSend } from "react-icons/ai";
import { GetRoomMessageRequest } from "./api/hostMessageApi";
import { showDate } from "@/shared/utils/showFullDateTime";
import { FaRegImage } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { MdOutlineGroups2 } from "react-icons/md";
import AddFriendPopUp from "../host_listing/components/AddFriendPopUp";
import AddGroupPopUp from "../host_listing/components/AddGroupPopUp";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: 88vh;
`;

const SidebarStyled = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* padding: 1rem; */

  & hr {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  > div:nth-of-type(2) {
    padding: 0 1rem;
  }
`;

const ChatBarStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomStyled = styled.div`
  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-radius: 50px;

  &:hover {
    background-color: #f7f7f7;
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;

    > span:nth-of-type(1) {
      font-size: 18px;
    }
  }

  ${(props) => {
    if (props.$active == true) {
      return css`
        background-color: black;
        color: white;

        &:hover {
          background-color: black;
          color: white;
        }
      `;
    }
  }}
`;

const GroupStyled = styled.div`
  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-radius: 50px;

  &:hover {
    background-color: #f7f7f7;
  }

  > div:nth-of-type(1) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;

    > span:nth-of-type(1) {
      font-size: 18px;
    }
  }

  ${(props) => {
    if (props.$active == true) {
      return css`
        background-color: black;
        color: white;

        &:hover {
          background-color: black;
          color: white;
        }
      `;
    }
  }}
`;

const HeaderStyled = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    font-size: 20px;
  }
`;

const BodyStyled = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  padding: 0 2rem;

  height: 30rem;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const CustomTextInput = styled(TextInput)`
  border-radius: 25px;
  padding: 1rem 2rem;
`;

const FooterStyled = styled.form`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 3rem;

  & svg {
    font-size: 30px;
    cursor: pointer;
  }
`;

const MessageStyled = styled.div`
  display: flex;
  gap: 1rem;

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    background-color: black;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 25px;
    gap: 10px;

    > span:nth-of-type(2) {
      font-size: 13px;
    }
  }

  ${(props) => {
    if (props.$own == true) {
      return css`
        align-self: flex-end;
        flex-direction: row-reverse;
        text-align: right;
      `;
    }
  }}
`;

const SideBarHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 0;

  align-items: flex-end;

  h2 {
    text-decoration: underline;
  }

  > div {
    display: flex;
    gap: 1rem;

    > div {
      cursor: pointer;
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      border-radius: 15px;

      > svg {
        font-size: 20px;
      }

      > svg:active {
        transform: scale(0.9);
      }
    }
  }
`;

const GroupHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5px 1rem;

  > div {
    display: flex;
    gap: 5px;
  }

  & p {
    font-size: 20px;
  }
`;

export default function HostMessages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = UserRequest();
  const getUserChatRoom = GetUserChatRoomRequest(user.data.data.id);
  const [chatRooms, setChatRooms] = useState([]);
  const [chosenRoom, setChosenRoom] = useState();
  const chosenRoomRef = useRef(null);
  const chatRoomsRef = useRef([]);
  const chatMessageRef = useRef();
  const getRoomMessage = GetRoomMessageRequest(chosenRoom);
  const [isAddFriend, setIsAddFriend] = useState(false);
  const [isAddGroup, setIsAddGroup] = useState(false);
  const lastMessageIdRef = useRef(null);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const stompClient = useRef(null);

  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    if (stompClient.current && isConnected) return;

    const onError = (err) => {
      console.error("Connection error:", err);
      setIsConnected(false);
    };

    const onPrivateMessage = (payload) => {
      const body = JSON.parse(payload.body);

      if (lastMessageIdRef.current == body.messageId) {
        return;
      } else {
        lastMessageIdRef.current = body.messageId;
      }

      setChatRooms((prev) => {
        var changeRoom = prev.find((room) => room.roomId == body.roomId);
        changeRoom.lastMessage = body.message;

        return [changeRoom, ...prev.filter((room) => room.roomId != body.roomId)];
      });

      if (body.roomId == chosenRoomRef.current) {
        setMessages((prev) => {
          const sender = chatRoomsRef.current
            .find((room) => room.roomId == body.roomId)
            ?.users.find((roomUser) => roomUser.id == body.senderId);

          if (sender) {
            return [
              {
                id: sender.id,
                name: `${sender.firstName} ${sender.lastName}`,
                avatar: body.senderAvatar,
                message: body.message,
                createdAt: new Date(),
              },
              ...prev,
            ];
          }
          return prev;
        });
      }
    };

    const onConnected = () => {
      console.log("Connected to WebSocket");
      stompClient.current.subscribe(`/user/${user.data.data.id}/private`, onPrivateMessage);
      setIsConnected(true);
    };

    try {
      const Sock = new SockJS("http://localhost:8010/ws");
      stompClient.current = over(Sock);

      stompClient.current.connect({}, onConnected, onError);
    } catch (ex) {
      console.log("Connection failed:", ex);
      setIsConnected(false); // Connection failed, update the status
    }
  };

  useEffect(() => {
    if (!isConnected) {
      connect();
    }

    return () => {
      if (stompClient.current && isConnected) {
        stompClient.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
          setIsConnected(false); // Reset connection status on disconnect
        });
      }
    };
  }, []);

  useEffect(() => {
    if (getUserChatRoom.isSuccess) {
      setChatRooms(getUserChatRoom.data.data);
      chatRoomsRef.current = getUserChatRoom.data.data;
    }
  }, [getUserChatRoom.fetchStatus]);

  useEffect(() => {
    if (getRoomMessage.isSuccess) {
      let chatMessages = [];

      for (let item of getRoomMessage.data.pages) {
        chatMessages = [...chatMessages, ...item.data];
      }

      const roomMessage = [];

      for (let item of chatMessages) {
        var sender = chatRooms
          .find((room) => room.roomId == chosenRoom)
          .users.find((roomUser) => roomUser.id == item.senderId);

        roomMessage.push({
          id: item.senderId,
          name: `${sender.firstName} ${sender.lastName}`,
          avatar: sender.avatar,
          message: item.message,
          createdAt: item.createdAt,
        });
      }

      setMessages(roomMessage);
    }
  }, [getRoomMessage.fetchStatus]);

  useEffect(() => {
    if (inView) {
      if (getRoomMessage.hasNextPage) {
        getRoomMessage.fetchNextPage();
      }
    }
  }, [entry]);

  const getRoomUser = () => {
    const room = chatRooms.find((room) => room.roomId == chosenRoom);
    if (room) {
      return room.users.find((roomUser) => roomUser.id !== user.data.data.id);
    }

    return {};
  };

  const sendPrivateMessage = (ev) => {
    ev.preventDefault();

    if (stompClient.current) {
      var chatMessage = {
        messageId: uuidv4(),
        senderId: user.data.data.id,
        senderAvatar: user.data.data.avatar,
        message: message,
        date: new Date(),
        roomId: chosenRoom,
      };

      setMessages((prev) => [
        {
          id: user.data.data.id,
          name: `${user.data.data.firstName} ${user.data.data.lastName}`,
          avatar: user.data.data.avatar,
          message: message,
          createdAt: new Date(),
        },
        ...prev,
      ]);

      setChatRooms((prev) => {
        var changeRoom = prev.find((room) => room.roomId == chosenRoom);
        changeRoom.lastMessage = message;

        return [changeRoom, ...prev.filter((room) => room.roomId != chosenRoom)];
      });

      stompClient.current.send("/chatApp/private-message", {}, JSON.stringify(chatMessage));
      chatMessageRef.current.scrollTo(0, chatMessageRef.scrollHeight);
      setMessage("");
    }
  };

  const getGroup = () => {
    const room = chatRooms.find((room) => room.roomId == chosenRoom);

    if (room.name != null) {
      return room;
    }

    return null;
  };

  return (
    <>
      <Container>
        <SidebarStyled>
          <SideBarHeaderStyled>
            <h2>Messages</h2>
            <div>
              <div onClick={() => setIsAddFriend(true)}>
                <FiUserPlus />
              </div>
              <div onClick={() => setIsAddGroup(true)}>
                <MdOutlineGroups2 />
              </div>
            </div>
          </SideBarHeaderStyled>
          <hr />
          <div>
            {chatRooms.map((chatRoom, index) => {
              if (chatRoom.name == null) {
                const roomUser = chatRoom.users.find(
                  (roomUser) => roomUser.id != user.data.data.id
                );
                return (
                  <RoomStyled
                    $active={chatRoom.roomId == chosenRoom}
                    onClick={() => {
                      setChosenRoom(chatRoom.roomId);
                      chosenRoomRef.current = chatRoom.roomId;
                    }}
                    key={index}
                  >
                    <div>
                      <Avatar round size={60} name={roomUser.firstName} src={roomUser.avatar} />
                    </div>
                    <div>
                      <span>
                        {roomUser.firstName} {roomUser.lastName}
                      </span>
                      <span>{chatRoom.lastMessage}</span>
                    </div>
                  </RoomStyled>
                );
              }

              if (chatRoom.name != null) {
                const roomUsers = chatRoom.users.filter(
                  (roomUser) => roomUser.id != user.data.data.id
                );
                return (
                  <GroupStyled
                    $active={chatRoom.roomId == chosenRoom}
                    onClick={() => {
                      setChosenRoom(chatRoom.roomId);
                      chosenRoomRef.current = chatRoom.roomId;
                    }}
                    key={index}
                  >
                    <div>
                      {roomUsers.map((user, index) => {
                        if (index <= 2) {
                          return (
                            <Avatar
                              round={true}
                              size={30}
                              key={index}
                              name={user.firstName}
                              src={user.avatar}
                            />
                          );
                        }
                      })}
                      {roomUsers.length > 3 && (
                        <Avatar textSizeRatio={2} round={true} size={30} name={"+"} />
                      )}
                    </div>
                    <div>
                      <span>{chatRoom.name}</span>
                      <span>{chatRoom.lastMessage}</span>
                    </div>
                  </GroupStyled>
                );
              }
            })}
          </div>
        </SidebarStyled>
        <ChatBarStyled>
          {chosenRoom && (
            <>
              <HeaderStyled>
                {!getGroup() ? (
                  <>
                    <Avatar
                      round
                      size={40}
                      src={getRoomUser().avatar}
                      name={getRoomUser().firstName}
                    />
                    <span>
                      {getRoomUser().firstName} {getRoomUser().lastName}
                    </span>
                  </>
                ) : (
                  <GroupHeaderStyled>
                    <div>
                      {getGroup().users.map((user, index) => {
                        if (index <= 2) {
                          return (
                            <Avatar
                              round={true}
                              size={30}
                              textSizeRatio={1}
                              key={index}
                              name={user.firstName}
                              src={user.avatar}
                            />
                          );
                        }
                      })}
                      {getGroup().users.length > 3 && (
                        <Avatar textSizeRatio={2} round={true} size={30} name={"+"} />
                      )}
                    </div>
                    <p>{getGroup().name}</p>
                  </GroupHeaderStyled>
                )}
              </HeaderStyled>
              <BodyStyled ref={chatMessageRef}>
                {messages.map((message, index) => {
                  return (
                    <MessageStyled $own={message.id == user.data.data.id} key={index}>
                      <div>
                        <Avatar size={50} src={message.avatar} round name={message.name} />
                      </div>
                      <div>
                        <span>{message.message}</span>
                        <span>{showDate(message.createdAt)}</span>
                      </div>
                    </MessageStyled>
                  );
                })}
                <div ref={ref}></div>
              </BodyStyled>
              <FooterStyled onSubmit={sendPrivateMessage}>
                <span>
                  <FaRegImage />
                </span>
                <CustomTextInput state={message} setState={setMessage} />
                <span>
                  <AiOutlineSend />
                </span>
              </FooterStyled>
            </>
          )}
        </ChatBarStyled>
      </Container>
      {isAddFriend && (
        <AddFriendPopUp
          getUserChatRoom={getUserChatRoom}
          chosenRoom={chosenRoom}
          setChosenRoom={setChosenRoom}
          chosenRoomRef={chosenRoomRef}
          action={() => setIsAddFriend(false)}
        />
      )}
      {isAddGroup && (
        <AddGroupPopUp
          getUserChatRoom={getUserChatRoom}
          chosenRoom={chosenRoom}
          setChosenRoom={setChosenRoom}
          chosenRoomRef={chosenRoomRef}
          action={() => setIsAddGroup(false)}
        />
      )}
    </>
  );
}
