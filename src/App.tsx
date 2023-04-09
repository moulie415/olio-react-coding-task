import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {useListArticlesQuery} from './app/services/articles';
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@mui/icons-material/Place';
import colors from './colors';

function App() {
  const {data, isLoading, error, refetch} = useListArticlesQuery();

  const [googleMaps, setGoogleMaps] = useState<any>();
  const [googleMap, setGoogleMap] = useState<any>();

  useEffect(() => {
    if (data && data.length && googleMaps && googleMap) {
      const bounds = new googleMaps.LatLngBounds();
      data.forEach(article => {
        bounds.extend({
          lat: article.location.latitude,
          lng: article.location.longitude,
        });
      });
      googleMap.fitBounds(bounds);
    }
  }, [data, googleMaps, googleMap]);

  return (
    <div>
      {/* <Box sx={{flexGrow: 1}}> */}
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={logo}
              style={{height: 30}}
              className="App-logo"
              alt="logo"
            />
          </Toolbar>
        </Container>
      </AppBar>
      {/* </Box> */}

      {data && data.length && !isLoading ? (
        <Grid container>
          <Grid
            item
            sm={6}
            xs={12}
            style={{
              overflowY: 'scroll',
              maxHeight: '91vh',
              backgroundColor: '#D3D3D3',
            }}>
            {data.map(article => {
              return (
                <Card
                  key={article.id}
                  style={{maxWidth: 400, margin: '20px auto'}}>
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
                    subheader={moment(article.created_at).format(
                      'MMMM Do YYYY',
                    )}
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
          </Grid>
          <Grid item sm={6} style={{maxHeight: '91vh'}}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
              }}
              onGoogleApiLoaded={({map, maps}) => {
                setGoogleMaps(maps);
                setGoogleMap(map);
              }}
              defaultCenter={{
                lat: 10.99835602,
                lng: 77.01502627,
              }}
              defaultZoom={11}>
              {data.map(article => {
                return (
                  <IconButton
                    // @ts-ignore
                    lat={article.location.latitude}
                    lng={article.location.longitude}
                    color="secondary"
                    aria-label="marker"
                    component="label">
                    <PlaceIcon fontSize="large" color="secondary" />
                  </IconButton>
                );
              })}
            </GoogleMapReact>
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default App;
