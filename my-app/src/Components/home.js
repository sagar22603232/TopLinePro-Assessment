import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, TextField, InputAdornment, CardActionArea } from '@mui/material';
import configData from "../config.json";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b0bec5",
            borderWidth: "2px"
        },
        "& .MuiOutlinedInput-input": {
            color: "#263238"
        },
        "& .MuiInputLabel-outlined": {
            color: "#000"
        },
    },
    card:{
        width: '95vw',
    }
});
export default function Home() {
    const baseURL = configData.BACKEND_URL
    const apiKey = configData.API_KEY
    const [data, setData] = React.useState(null);
    const [searchData, setSearchData] = React.useState(null);
    React.useEffect(() => {
        axios.get(baseURL + `?key=${apiKey}`)
            .then((response) => {
                setData(response.data.hits);
                // console.log(data.hits)
            });
    }, []);
    const searchTags = (event) => {
        if (!(event.target.value)) {
            setSearchData(null);
        }
        else {
            axios.get(baseURL + `?key=${apiKey}`+`&q=${event.target.value}&image_type=photo`)
                .then((response) => {
                    setSearchData(response.data.hits);
                })
                .catch((error) => {
                    console.log(error)
                });
        }

    }
    const handleOnClick = (value) => {
        window.location = "/image/" + value
    }

    const renderData = (inputData) => {
        return (inputData?inputData.map((item) => (
            
            <ImageListItem key={item.img}>
              <img
                src={`${item.previewURL}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.previewURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.tags}
                loading="lazy"
                onClick={() => handleOnClick(item.id)} 
              />
            </ImageListItem>
          )):"No image")
    }
    const classes = useStyles();
    console.log(searchData)
    return (
        <div className={classes.card}>
        <Box
            display="flex"
        >
            <TextField fullWidth label="Search" id="outlined-search" type="search" onChange={searchTags}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "#000", fontSize: "medium" }} />
                        </InputAdornment>
                    )
                }}
                className={classes.root}
            />
        </Box>
        <ImageList sx={{  width: '95vw',
    height: '90vh'}} cols={4} >
         {searchData ?renderData(searchData)
                     : renderData(data)
                  }
            
        </ImageList>
        </div>
      );
}
