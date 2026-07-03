// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const Context = createContext(null);

// export const SSEStream = ({ children }) => {
//     const [subjects, setSubjects] = useState([]);

//     useEffect(() => {
//         const SSE = new EventSource(`${process.env.API}/api/v1/subject/stream`, { withCredentials: true });

//         SSE.onmessage = async (event) => {
//             try {
//                 const data = JSON.parse(event.data);

//                 if (data && data.subject) {
//                     setSubjects(data.subject);
//                 }
//             } catch (error) {
//                 console.log(`Parse error: ${error}`);
//             }
//         };

//         SSE.onerror = (error) => {
//             console.log(`Stream is not working: ${error}`);
//         };

//         return () => {
//             SSE.close();
//         };
//     }, []);

//     return (
//         <Context.Provider value={{ subjects, setSubjects }}>
//             {children}
//         </Context.Provider>
//     );
// };

// export const useStream = () => useContext(Context)