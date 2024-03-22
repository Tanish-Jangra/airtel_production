import { createContext, useContext } from "react";

// creating context 
const triggerContext = createContext({
    trigger : false,
    setTrigger : () => {}
});


// extracting provider from context
export const TriggerProvider = triggerContext.Provider;


// creating custom hook for using context seamlessly

export default function useTriggerReload(){
    return useContext(triggerContext)
}