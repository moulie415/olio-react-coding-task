import React, {useState, useEffect, RefObject} from 'react';
import logo from './logo.svg';
import './App.css';
import {useListArticlesQuery} from './services/articles';
import {
  AppBar,
  Avatar,
  Box,
  Button,
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
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import moment from 'moment';
import GoogleMapReact from 'google-maps-react-markers';
import PlaceIcon from '@mui/icons-material/Place';
import colors from './colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useAppDispatch} from './hooks';
import {markAsRead} from './slices/articles';

function App() {
  const {data, isLoading, error, refetch} = useListArticlesQuery();

  const [googleMaps, setGoogleMaps] = useState<any>();
  const [googleMap, setGoogleMap] = useState<any>();
  const [highlightedArticle, setHighlightedArticle] = useState<number>();

  const refs: {[key: number]: HTMLDivElement | null} = {};

  const dispatch = useAppDispatch();

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
  console.log(highlightedArticle);
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
                  ref={ref => (refs[article.id] = ref)}
                  key={article.id}
                  style={{
                    maxWidth: 400,
                    margin: '20px auto',
                    borderWidth: 1,
                    borderColor: colors.primary,
                    border:
                      highlightedArticle === article.id
                        ? `solid #00A69C`
                        : undefined,
                  }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={article.user.current_avatar.small}
                        sx={{bgcolor: 'purple'}}
                        aria-label="user avatar">
                        {article.user.first_name.charAt(0)}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="report">
                        <FlagOutlinedIcon />
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
                    alt={article.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      onClick={() => {
                        googleMap.setCenter({
                          lat: article.location.latitude,
                          lng: article.location.longitude,
                        });
                        googleMap.setZoom(15);
                        setHighlightedArticle(article.id);
                      }}
                      aria-label="View on map">
                      <PlaceIcon />
                    </IconButton>
                    <Button
                      onClick={() => dispatch(markAsRead(article.id))}
                      size="small"
                      color="primary">
                      Mark as seen
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Grid>
          <Grid item sm={6} style={{maxHeight: '91vh'}}>
            <GoogleMapReact
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
              onGoogleApiLoaded={({map, maps}: {map: any; maps: any}) => {
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
                    onClick={() => {
                      refs[article.id]?.scrollIntoView({
                        behavior: 'smooth',
                      });
                      setHighlightedArticle(article.id);
                    }}
                    style={{padding: 0}}
                    key={article.id}
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
