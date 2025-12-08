import { createContext, useEffect, useState } from "react";
import { getCurrentUser, getAllUsersForChat } from "../Service/api";

const BACKEND_URL = "https://kwick-server.onrender.com";

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

  const getAvatarUrl = (avatar) => {
    if (!avatar) return "/default-avatar.png";
    if (avatar.startsWith("http")) return avatar;
    return `${BACKEND_URL}${avatar}`;
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
            avatar: u.avatar ? getAvatarUrl(u.avatar) : "/default-avatar.png",
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
            avatar: u.avatar ? getAvatarUrl(u.avatar) : "/default-avatar.png",
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
