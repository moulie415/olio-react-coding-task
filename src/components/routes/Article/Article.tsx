import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useListArticlesQuery} from '../../../services/api';
import {
  Grid,
  useMediaQuery,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import colors from '../../../colors';
import moment from 'moment';
import GoogleMapReact from 'google-maps-react-markers';
import PlaceIcon from '@mui/icons-material/Place';
import AbsoluteLoader from '../../shared/AbsoluteLoader/AbsoluteLoader';
import Article from '../../../types/Article';

const ArticleView = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {data, isLoading} = useListArticlesQuery();

  const matches = useMediaQuery('(min-width:600px)');
  const article: Article | undefined = data?.find(a => a.id.toString() === id);
  if (!isLoading && !article) {
    navigate('/');
    return null;
  }
  if (isLoading) {
    return <AbsoluteLoader />;
  }

  return (
    <Grid container>
      <Grid item sm={6} xs={12} style={{backgroundColor: colors.offWhite}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <img
            src={article?.photos[0]?.files.large}
            alt={article?.title}
            style={{
              maxWidth: '100%',
              height: matches ? '93vh' : '40vh',
              objectFit: 'contain',
            }}
          />
        </div>
      </Grid>
      <Grid item sm={6} xs={12}>
        {article && (
          <div
            style={{
              padding: '0 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '93vh',
              // height: matches ? '90vh' : undefined,
            }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Avatar
                src={article.user.current_avatar.small}
                style={{backgroundColor: colors.purple, marginRight: 20}}
                alt={article.user.first_name}>
                {article.user.first_name.charAt(0)}
              </Avatar>
              <div>
                <Typography variant="h5">
                  {`${article.user.first_name} is giving away`}
                </Typography>
                <Typography variant="h5">{article.title}</Typography>
                <Typography color="text.secondary">
                  {moment(article.created_at).format('MMMM Do YYYY')}
                </Typography>
              </div>
            </div>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              style={{marginTop: 10}}>
              {article.description}
            </Typography>

            <Typography variant="h6">Collection notes</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {article.collection_notes}
            </Typography>
            <GoogleMapReact
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
              defaultCenter={{
                lat: article.location.latitude,
                lng: article.location.longitude,
              }}
              style={{height: 300}}
              defaultZoom={11}>
              <IconButton
                // @ts-ignore
                lat={article.location.latitude}
                lng={article.location.longitude}
                color="secondary"
                aria-label="marker"
                component="label">
                <PlaceIcon fontSize="large" color="secondary" />
              </IconButton>
            </GoogleMapReact>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ArticleView;
