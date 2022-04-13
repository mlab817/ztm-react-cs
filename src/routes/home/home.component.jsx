import Directory from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/button/button.component";

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

  const [pageCount, setPageCount] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [meetings, setMeetings] = useState([])

  const url = 'https://my-zoom-api.herokuapp.com/api/zoom/meetings'

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url, {
        page_number: pageNumber
      })
      const { meetings, page_count } = response.data.data

      setMeetings(meetings)
      setPageCount(page_count)
    }

    console.log('calling axios useEffect')

    fetchData()
  }, [pageNumber])

  console.log(meetings, pageNumber)

  const incrementPage = () => {
    if (pageCount && pageNumber < pageCount) {
      setPageNumber(pageNumber + 1)
    }
  }

  const decrementPage = () => {
    if (pageCount > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  return (
    <>
      <Outlet />

      <Directory categories={categories} />

      <Button onClick={decrementPage} disabled={pageNumber === 1}>Previous Page</Button>

      <Button onClick={incrementPage} disabled={pageCount === pageNumber}>Next Page</Button>
    </>
  )
}

export default Home