import React,{useEffect,useState} from 'react'

export default function About() {

  const [user, setUser] = useState('########');

  useEffect(() => {
  }, []);

  const handler = async () => {
    const userId = 123;
    // const userData = await electron.dbApi.getUserById(userId);
    const userData = await electron.ipc.invoke('get-user',userId);
    console.log('User data:', userData);
    setUser(userData)
  }
  return (
    <div>
      <div>about</div>
      <h1>{user}</h1>
      <button onClick={handler} >User</button>
    </div>
  )
}
