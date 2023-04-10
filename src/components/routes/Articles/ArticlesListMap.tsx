import React from 'react';
import GoogleMapReact from 'google-maps-react-markers';
import {Article} from '../../../services/api';
import {useAppSelector} from '../../../hooks';
import PlaceIcon from '@mui/icons-material/Place';
import {IconButton} from '@mui/material';

const ArticlesListMap: React.FC<{
  setGoogleMaps: (maps: any) => void;
  setGoogleMap: (map: any) => void;
  data: Article[];
  setHighlightedArticle: (article: number) => void;
  articleRefs: {[key: number]: HTMLDivElement | null};
}> = ({
  setGoogleMaps,
  setGoogleMap,
  data,
  setHighlightedArticle,
  articleRefs,
}) => {
  const {readArticles} = useAppSelector(state => state.articles);

  return (
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
      {data &&
        data
          .filter(article => !readArticles[article.id])
          .map(article => {
            return (
              <IconButton
                onClick={() => {
                  articleRefs[article.id]?.scrollIntoView({
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
  );
};

export default ArticlesListMap;
