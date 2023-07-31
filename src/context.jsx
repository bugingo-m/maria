import { createContext,useContext,useState } from "react";

const AppContext =createContext()
export const useGlobalContext =()=> useContext(AppContext)

const AppProvider = ({children})=>{
    const [apparition,setApparition] = useState('')
    const [isEditing,setIsEditing] = useState(false)
    const[id,setId]=useState('')
    return(
        <AppContext.Provider value={{
        apparition,
        isEditing,
        setApparition,
        setIsEditing,
        id,
        setId
        }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppProvider