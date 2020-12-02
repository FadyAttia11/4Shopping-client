import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import './Profile.css'

import AuthApi from '../../context/AuthApi'

var FormData = require('form-data');

const Profile = () => {

    var bodyFormData = new FormData();

    const [user, setUser] = useState({}) //contains 4 important strings: _id, name, email, imgurl

    const Auth = useContext(AuthApi)
    let history = useHistory()

    const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

    //we use the useRef hook to refer to the hidden input 
    const hiddenFileInput = React.useRef(null)

    //used to store the files uploaded to the input file
    const fileInput = React.createRef()

    useEffect(() => {
        async function getUserData() {
            const user = await getUserFromDB()
            console.log(user)
            setUser(user)
        }
        getUserData()
    }, []) 


    const getUserFromDB = () => {
        const request = axios.get('https://fadyattia-4shopping-server.herokuapp.com/api/users/me', { headers })
                            .then(response => response.data)
            return request
    }

    const handleSignOut = async () => {
        const response = await logoutUser()
        console.log(response) //just for debugging (consists of success)
        if(response.logoutSuccess){
          Auth.setAuth(false)
          Cookies.remove('x_auth')
          history.push('/4shopping')
        }
    }

    const logoutUser = () => {
        const request = axios.get('https://fadyattia-4shopping-server.herokuapp.com/api/users/logout', { headers })
                        .then(response => response.data)
        return request
    }

    

    const handleClick = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click();
    }

    // const handleChange = (e) => {
    //     const fileUploaded = e.target.files[0];
    //     console.log(fileUploaded)
    // }



    const handleChange = async (e) => {
        e.preventDefault()        

        const image = e.target.files[0]
        // console.log(fileUploaded)
        bodyFormData.append('profileImage', image, 'profile-pic.jpg')
        // let imagesArray = Array.from(fileInput.current.files)
        // console.log(imagesArray)

        // imagesArray.map((image) => bodyFormData.append('profileImage', image, 'profile-pic.jpg'))
        await sendFormToDB()
    }

    const sendFormToDB = async () => {
        await axios({
            method: 'post',
            url: 'https://fadyattia-4shopping-server.herokuapp.com/api/users/me/avatar',
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data' ,
                Authorization: `Bearer ${Cookies.get('x_auth')}`
            }})
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    return (
        <div className="small-container profile-page"> 
            {/* <img src={`http://localhost:5000/${user.profileImage}`} alt="personal-img" className="personal-img"></img> */}
            <div className="profile-top">
                <div className="main-info">
                    <img 
                        src={(user.profileImage !== "") ? (`http://localhost:5000/${user.profileImage}`) : require('../../img/no-photo.jpg')} 
                        alt="personal-img" 
                        className="personal-img"
                    />
                    <h2>{user.name}</h2>
                    <form action="/multiple-upload" method="POST" encType="multipart/form-data">
                        <button onClick={handleClick} className="btn">Change Profile Picture</button>
                        <input 
                            type="file" 
                            style={{display:'none'}} 
                            ref={hiddenFileInput} 
                            onChange={handleChange}
                            multiple
                        />
                    </form>
                </div>

                <div className="spacer"></div>

                <button className="signout-btn" onClick={handleSignOut}><span>Sign out</span></button>
            </div>

            

        </div>
    )
}

export default Profile