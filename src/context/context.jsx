import { createContext, useEffect, useState } from "react"; // ⬅️ IMPORT useEffect
import { runChat } from "../config/gemini"; 

export const Context = createContext();

const ContextProvider = (props) => {
  const[input,setInput]=useState("");
  const[recentPrompt,setRecentPrompt]=useState("");
  const[prevPrompts,setPrevPrompts]=useState([]);
  const[showResult,setShowResult]=useState(false);
  const[loading,setLoading]=useState(false);
  const[resultData,setResultData]=useState("");

  const delayPara = (index,nextWord) =>{


  }

  const onSent = async(prompt)=>{
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input)
    const response=await runChat(input);
    let responseArray = response.split("**")
    let newResponse;
    for(let i=0;i<responseArray.length;i++){
        if(i===0 || i%2!==1){
            newResponse += responseArray[i]

        }
        else{
            newResponse += "<b>" + responseArray[i]+"</b>"

        }
    }

    setResultData(newResponse);
    setLoading(false);
    setInput("");
    
  }

 
  useEffect(() => {
   
    // onSent("what is react js"); 
  }, []); 


  const contextValue = {
     prevPrompts,
     onSent,
     setPrevPrompts,
     setRecentPrompt,
     recentPrompt,
     showResult,
     loading,
     resultData,
     input,
     setInput,


    // Add state variables here later (e.g., loading, history, response)
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;