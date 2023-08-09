import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import configData from "../config.json";
import axios from "axios";

export default function Home() {
    const baseURL = configData.BACKEND_URL
    const apiKey = configData.API_KEY
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        axios.get(baseURL + `?key=${apiKey}`)
            .then((response) => {
                setData(response.data.hits);
                // console.log(data.hits)
            });
    }, []);
    
    return (
        <ImageList >
            {data ?
          data.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.userImageURL}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.userImageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.tags}
                loading="lazy"
              />
            </ImageListItem>
          )) : "No images"
        }
        </ImageList>
      );
}
