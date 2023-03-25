import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById("root")!).render(<CombinationInputBox />);

function CombinationInputBox() {
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, (tabs) => {
      const tab = tabs[0];
      if (tab === undefined || tab === null) {
        console.debug("Zero-th tab is undefined or null.")
        return;
      }

      if (tab.id === undefined || tab.id === null) {
        console.debug("Zero-th tab id is undefined or null.")
        return
      }
      
      chrome.scripting.executeScript({ 
        target: { tabId: tab.id },    
        injectImmediately: true,
        files: ["./dist/setup-ui.js"],
      });
    });
  }, [])

  useEffect(() => {
    window.onblur = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab === undefined || tab === null) {
          console.debug("Zero-th tab is undefined or null.")
          return;
        }
        if (tab.id === undefined || tab.id === null) {
          console.debug("Zero-th tab is undefined or null.")
          return
        }

        chrome.scripting.executeScript({ 
          target: { tabId: tab.id },    
          injectImmediately: true,
          files: ["./dist/cleanup-ui.js"],
        })
      });

      window.close();
    }
  }, [])

  return <div>
    <input type="text" placeholder="" autoFocus={true} />
  </div>
}

// document.getElementById("key-combination-input").addEventListener("keypress", (event) => { 
//   if (event.key === "Enter") {
//     window.close();
  
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tab = tabs[0];
    
//       chrome.scripting.executeScript({ 
//         target: { tabId: tab.id },    
//         injectImmediately: true,
//         args: [uuidv4, event.target.value],
//         func: (uuidv4, targetKeyCombChars) => {
//           let targetKeyComb;
//           for (let keyCombination of document.getElementsByClassName(uuidv4)) {
//             if (keyCombination.textContent.toLowerCase().trim() === targetKeyCombChars) {
//               targetKeyComb = keyCombination;
//               break;
//             }
//           }
          
//           targetKeyComb.parentElement.focus();
//         }
//       });
//     });
//   }
// }, false)
