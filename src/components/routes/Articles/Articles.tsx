import React, {useState, useEffect} from 'react';
import {useListArticlesQuery} from '../../../services/articles';
import {Grid} from '@mui/material';
import {useAppSelector} from '../../../hooks';
import ArticlesList from './ArticlesList';
import AbsoluteLoader from '../../shared/AbsoluteLoader/AbsoluteLoader';
import ArticlesListMap from './ArticlesListMap';
import colors from '../../../colors';

function App() {
  const {data, isLoading, error, refetch} = useListArticlesQuery();

  const [googleMaps, setGoogleMaps] = useState<any>();
  const [googleMap, setGoogleMap] = useState<any>();
  const [highlightedArticle, setHighlightedArticle] = useState<number>();

  const articleRefs: {[key: number]: HTMLDivElement | null} = {};

  const {readArticles} = useAppSelector(state => state.articles);

  useEffect(() => {
    if (data && data.length && googleMaps && googleMap) {
      const bounds = new googleMaps.LatLngBounds();
      data.forEach(article => {
        if (!readArticles[article.id]) {
          bounds.extend({
            lat: article.location.latitude,
            lng: article.location.longitude,
          });
        }
      });
      googleMap.fitBounds(bounds);
    }
  }, [data, googleMaps, googleMap, readArticles]);

  if (isLoading) {
    return <AbsoluteLoader />;
  }

  return (
    <div>
      {data && data.length && (
        <Grid container>
          <Grid
            item
            sm={6}
            xs={12}
            style={{
              overflowY: 'scroll',
              maxHeight: '91vh',
              backgroundColor: colors.offWhite,
            }}>
            <ArticlesList
              data={data}
              articleRefs={articleRefs}
              highlightedArticle={highlightedArticle}
              setHighlightedArticle={setHighlightedArticle}
              googleMap={googleMap}
            />
          </Grid>
          <Grid item sm={6} style={{maxHeight: '91vh'}}>
            <ArticlesListMap
              setGoogleMap={setGoogleMap}
              setGoogleMaps={setGoogleMaps}
              data={data}
              setHighlightedArticle={setHighlightedArticle}
              articleRefs={articleRefs}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default App;
