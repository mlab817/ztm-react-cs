import Directory from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/button/button.component";
import {collection, setDoc} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";

const Home = () => {
  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ]

  const zoomApiUrl = 'https://my-zoom-api.herokuapp.com/api/zoom/meetings'

  const createMeeting = async () => {
    const otherFields = {
      lastName: 'bolotaolo'
    }

    const zoomPayload = {
      topic: 'new meeting',
      agenda: 'hidden agenda',
      duration: 60, // in minutes
      password: '123456',
      start_time: '2022-04-14T16:00:00',
      meeting_invitees: [
        {
          email: 'mlab817@gmail.com'
        }
      ],
      type: 2 // scheduled
    }

    try {
      const response = await axios.post(zoomApiUrl, zoomPayload)

      const { topic,
        agenda,
        duration,
        id,
        uuid,
        password,
        start_time,
        start_url,
        join_url,
        timezone,
        host_email
      } = response.data.data // this is the new

      const meetingDetails = {topic,
        agenda,
        duration,
        id,
        uuid,
        password,
        start_time,
        start_url,
        join_url,
        timezone,
        host_email}

      const fsPayload = {
        ...meetingDetails,
        ...otherFields
      }

      console.log(fsPayload)

      // sendFsPayload to firestore

      const docRef = collection(db, 'meetings') // data.id is the meeting id from zoom or you can use other fields
      console.log(docRef)

      const fsResponse = await setDoc(docRef, fsPayload)

      console.log(fsResponse)

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Outlet />

      <Directory categories={categories} />

      <button onClick={createMeeting}>create meeting</button>
    </>
  )
}

export default Home