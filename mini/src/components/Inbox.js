import axios from 'axios'
import React, { useEffect, useState } from 'react'
import speak from '../util/speak'
import listen from '../util/listen'

function Inbox() {
    const [data, setData] = useState()
    const [mail, setMail] = useState("")
    const [email, setEmail] = useState("")

    async function GetInbox(){
        const mails = await axios.post("http://127.0.0.1:5000/get_mails",{
            email: localStorage.getItem("email")
        })
        setData(mails.data)
    }
    
    const sendMail = async (e)=>{
        const oup = await axios.post("http://127.0.0.1:5000/post_mail", {
            email: email,
            data: e
        })
        speak("Message sent!")
    }

    useEffect(()=>{
        GetInbox()
    },[])

    function compose(){
        speak("Type email")
        listen(setEmail)
    }
    
      useEffect(()=>{
        
        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                speak("Space pressed!")
                compose()
            }
        })

        speak("Press space to compose")
        if(email){
          var email1 = email.split(" ").join("").toLowerCase()
          setEmail(email1)
          setTimeout(()=>{
            speak("Type message")
            
            setTimeout(()=>{
              listen((e)=>{
                sendMail(e)
              })
            }, 2000)

          },1000)
        }
      },[email])

      const [idx, setIdx] = useState(-1)
      
      useEffect(()=>{
        document.addEventListener('keyup', event => {
            if (event.code === 'ArrowUp') {
                let newIdx = idx
                const keys = Object.keys(data)
                console.log(keys)
                if(idx < keys.length-1 ){
                    newIdx = idx+1
                }

                console.log(newIdx)
                speak(data[keys[newIdx]])
                setIdx(newIdx)
            }
        })

      },[])

    return (
        <div>
            <center>
                <h1>Inbox</h1>
                <button onClick={compose}>Compose!</button>
            </center>

            <div style={{
                maxWidth: "1000px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div>
                    {
                        Object?.keys(data || {})?.map((e,i)=><React.Fragment key={i}>
                            <p>{i+1} {")"} {data[e]}</p>
                        </React.Fragment>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Inbox