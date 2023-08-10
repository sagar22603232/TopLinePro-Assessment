import {
    useParams
} from "react-router-dom";
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, TextField, InputAdornment, CardActionArea } from '@mui/material';
import configData from "../config.json";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/joy/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';

import axios from "axios";
const useStyles = makeStyles({
    cardHeader: {
       textAlign:"left",
    },
    card:{
    width: '50vw',
    spacing: 0,
    justify: 'space-around',
    },
});
export default function Image(){
    let { id } = useParams();
    
    const baseURL = configData.BACKEND_URL
    const apiKey = configData.API_KEY
    const [data, setData] = React.useState(null);
    const classes = useStyles();
    React.useEffect(() => {
        axios.get(baseURL + `?key=${apiKey}`+`&id=${id}&image_type=photo`)
            .then((response) => {
                setData(response.data.hits);
                // console.log(data.hits)
            });
    }, []);
    const handleOnClick = () => {
        window.location = "/"
    }
    return (data?data.map((item) => (
        <Card className={classes.card}>
         
                 <CardHeader className={classes.cardHeader}
        avatar={
            <Avatar alt={`${item.user}`} src={`${item.userImageURL}`}/>
        }
        action={
            <IconButton aria-label="Return" onClick={() => handleOnClick()} >
              <ClearIcon />
            </IconButton>
          }
        title={`${item.user}`}
      />
        <CardMedia
          component="img"
          image={`${item.webformatURL}?w=164&h=164&fit=crop&auto=format`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           {``}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            {`${item.likes}`}
          </IconButton>
          <IconButton aria-label="share">
            <CommentIcon/>
            {`${item.comments}`}
          </IconButton>
          <IconButton aria-label="share">
            <DownloadIcon/>
            {`${item.downloads}`}
          </IconButton>
          <IconButton aria-label="share">
            <VisibilityIcon/>
            {`${item.views}`}
            </IconButton>
          </CardActions>
      </Card>)):"no Image"
    )
} 