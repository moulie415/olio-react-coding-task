import React from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {useListArticlesQuery} from './app/services/articles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function App() {
  const {data, isLoading, isError, error, refetch} = useListArticlesQuery();

  return (
    <div>
      <CircularProgress />
      {data &&
        data.length &&
        data.map(article => {
          console.log(article);
          return (
            <Card sx={{maxWidth: 345}}>
              <CardHeader
                avatar={
                  <Avatar
                    src={article.user.current_avatar.small}
                    sx={{bgcolor: 'purple'}}
                    aria-label="recipe">
                    {article.user.first_name.charAt(0)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={article.title}
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                image={article.photos[0].files.medium}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {article.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
}

export default App;
