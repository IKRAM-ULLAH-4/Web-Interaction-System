import { createContext, useEffect, useState } from "react";
import { getCurrentUser, getAllUsersForChat } from "../Service/api";

const BACKEND_URL = "https://kwick-server.onrender.com";
// const BACKEND_URL = "http://localhost:5000"

// default consistent with backend
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
});

const UserChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [contactsError, setContactsError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // Robust avatar URL builder:
  // - If avatar falsy -> fallback
  // - If avatar starts with "http" -> return as-is
  // - If avatar starts with "/" -> prefix BACKEND_URL
  // - Else -> add leading slash and prefix
  const getAvatarUrl = (avatar) => {
    if (!avatar) return FALLBACK_AVATAR_FULL;
    if (typeof avatar !== "string") return FALLBACK_AVATAR_FULL;
    if (avatar.startsWith("http")) return avatar;
    const path = avatar.startsWith("/") ? avatar : `/${avatar}`;
    return `${BACKEND_URL}${path}`;
  };

  // Load current user
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

  // Load contacts after currentUser is ready
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
        
      }}
    >
      {children}
    </UserChatContext.Provider>
  );
};

export default UserChatProvider;