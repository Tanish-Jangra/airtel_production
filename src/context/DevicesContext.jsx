import { createContext, useContext } from "react";


// creating context
const allDevicesContext = createContext({
    all_devices : [],
    setAllDeviceData : () => {}
})


// extracting context provider 
export const AllDeviceDataProvider = allDevicesContext.Provider


// creating custom hook to use the context
export default function useAllDeviceData(){
    return useContext(allDevicesContext)
}
