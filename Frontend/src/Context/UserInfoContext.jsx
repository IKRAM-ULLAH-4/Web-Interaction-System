import { createContext , useState  , useContext } from "react";

//dlta declare shO
export const UserInfoContext = createContext();
//dlta define sho
export const UserInforProvider = ({children})=>{

    const [number ] = useState(0);

    return (
        <UserInfoContext.Provider value={{number}} >
            {children}
            
        </UserInfoContext.Provider>
    )
}
//dlta custom hook jorr shO
export const UserInfo = ()=> useContext(UserInfoContext);
