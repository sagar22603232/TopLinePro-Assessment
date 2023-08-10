import {
    useParams
} from "react-router-dom";
import * as React from 'react';
import configData from "../config.json";
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/joy/Avatar';
import IconButto from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';

import axios from "axios";
const useStyles = makeStyles({
    cardHeader: {
        textAlign: "left",
    },
    centeredContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '50vw',
        spacing: 0,
        justify: 'space-around',
        alignContent: "center"
    },
});
//Function to show image details
export default function Image() {
    let { id } = useParams();

    const baseURL = configData.BACKEND_URL
    const apiKey = configData.API_KEY
    const [data, setData] = React.useState(null);
    const classes = useStyles();
    React.useEffect(() => {
        axios.get(baseURL + `?key=${apiKey}` + `&id=${id}&image_type=photo`)
            .then((response) => {
                setData(response.data.hits);
                // console.log(data.hits)
            });
    }, []);
    const handleOnClick = () => {
        window.location = "/"
    }
    return (data ? data.map((item) => (
        <Container className={classes.centeredContainer}>
            <Card className={classes.card}>

                <CardHeader className={classes.cardHeader}
                    avatar={
                        <Avatar alt={`${item.user}`} src={`${item.userImageURL}`} />
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
                    <Typography variant="h5" color="text.secondary" textAlign="left">
                        {`${item.tags}`}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        {`${item.likes}`}
                    </IconButton>
                    <IconButton aria-label="share">
                        <CommentIcon />
                        {`${item.comments}`}
                    </IconButton>
                    <IconButton aria-label="share">
                        <DownloadIcon />
                        {`${item.downloads}`}
                    </IconButton>
                    <IconButton aria-label="share">
                        <VisibilityIcon />
                        {`${item.views}`}
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    )) : "no Image"
    )
}