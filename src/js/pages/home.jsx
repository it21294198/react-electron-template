import React from 'react'

export default function Home() {
  return (
    <div>
    <div>home</div>
    <button onClick={()=>{
      electron.notificationApi.sendNotification('First message')
    }}>Notify</button>
    </div>
  )
}
