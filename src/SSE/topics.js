// "use client"

// import { createContext, useEffect } from "react"

// const Context = createContext(null)

// export const Slider_Stream = () =>{
//     useEffect(()=>{
//         try {
//             const stream = new EventSource("http://localhost:3000/api/v1/topic/stream", {withCredentials: true})
//             stream.onmessage = (event) =>{
//                 const data = JSON.parse(event.data)
//                 if data
//             }
//         } catch (error) {
            
//         }
//     })
// }