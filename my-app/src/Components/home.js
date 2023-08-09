import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, TextField, InputAdornment, CardActionArea } from '@mui/material';
import configData from "../config.json";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
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
        }
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
    const renderData = (inputData) => {
        return (inputData?inputData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.userImageURL}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.userImageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.tags}
                loading="lazy"
              />
            </ImageListItem>
          )):"No immage")
    }
    const classes = useStyles();
    console.log(searchData)
    return (
        <div>
        <h2 className="font-link">Search: </h2>
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
        <ImageList sx={{ width: '100%', height: 700 }} cols={5} rowHeight={164} >
         {searchData ?renderData(searchData)
                     : renderData(data)
                  }
            
        </ImageList>
        </div>
      );
}
