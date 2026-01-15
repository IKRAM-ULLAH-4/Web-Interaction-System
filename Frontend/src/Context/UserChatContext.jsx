import { createContext, useEffect, useState } from "react";
import { getCurrentUser, getAllUsersForChat } from "../Service/api";
import { io } from "socket.io-client";

const BACKEND_URL = "https://kwick-backend.onrender.com";
const DEFAULT_AVATAR_PATH = "/uploads/Default.jpg";
const FALLBACK_AVATAR_FULL = `${BACKEND_URL}${DEFAULT_AVATAR_PATH}`;

export const UserChatContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  contacts: [],
  loadingContacts: true,
  contactsError: null,
  selectedContact: null,
  setSelectedContact: () => {},
  onlineUsers: [],
  socket: null,
});

const UserChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [contactsError, setContactsError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const getAvatarUrl = (avatar) => {
    if (!avatar) return FALLBACK_AVATAR_FULL;
    if (typeof avatar !== "string") return FALLBACK_AVATAR_FULL;
    if (avatar.startsWith("http")) return avatar;
    const path = avatar.startsWith("/") ? avatar : `/${avatar}`;
    return `${BACKEND_URL}${path}`;
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await getCurrentUser();
        if (me?.user) {
          const u = me.user;
          setCurrentUser({
            id: u._id,
            fullName: u.fullName,
            email: u.email,
            avatar: getAvatarUrl(u.avatar),
          });
        }
      } catch (err) {
        console.log("User not authenticated:", err);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    const socketIo = io(BACKEND_URL);
    setSocket(socketIo);

    socketIo.emit("join", currentUser.id);

    socketIo.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socketIo.on("userOnline", (userId) => {
      setOnlineUsers((prev) => [...new Set([...prev, userId])]);
    });

    socketIo.on("userOffline", (userId) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    return () => {
      socketIo.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser?.email) return;

    const loadContacts = async () => {
      try {
        setLoadingContacts(true);
        const users = await getAllUsersForChat();
        const filtered = users
          .filter((u) => u.email !== currentUser.email)
          .map((u) => ({
            id: u._id,
            name: u.fullName || u.email,
            fullName: u.fullName || u.email,
            email: u.email,
            status: "offline",
            avatar: getAvatarUrl(u.avatar),
            lastMessage: u.lastMessage || "",
          }));
        setContacts(filtered);
        setContactsError(null);
      } catch (err) {
        setContactsError("Failed to load contacts");
      } finally {
        setLoadingContacts(false);
      }
    };

    loadContacts();
  }, [currentUser]);

  return (
    <UserChatContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        contacts,
        loadingContacts,
        contactsError,
        selectedContact,
        setSelectedContact,
        onlineUsers,
        socket,
      }}
    >
      {children}
    </UserChatContext.Provider>
  );
};

export default UserChatProvider;