import React from 'react';
import {Article} from '../../../services/articles';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import sortArticles from '../../../helpers/sortArticles';
import {markAsRead, markAsUnread} from '../../../slices/articles';
import moment from 'moment';
import RestoreIcon from '@mui/icons-material/Restore';
import PlaceIcon from '@mui/icons-material/Place';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import colors from '../../../colors';

const ArticlesList: React.FC<{
  data: Article[];
  articleRefs: {[key: number]: HTMLDivElement | null};
  highlightedArticle?: number;
  setHighlightedArticle: (article: number) => void;
  googleMap: any;
}> = ({
  data,
  articleRefs,
  highlightedArticle,
  setHighlightedArticle,
  googleMap,
}) => {
  const {readArticles} = useAppSelector(state => state.articles);
  const sorted = sortArticles(data, readArticles);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <>
      {sorted &&
        sorted.map(article => {
          const seen = readArticles[article.id];
          return (
            <div
              style={{padding: 20}}
              ref={ref => (articleRefs[article.id] = ref)}
              key={article.id}>
              <Card
                onClick={() => navigate(`/article/${article.id}`)}
                sx={{
                  ':hover': {
                    boxShadow: 5,
                  },
                }}
                style={{
                  maxWidth: 400,
                  cursor: 'pointer',
                  margin: 'auto',
                  position: 'relative',
                  border:
                    highlightedArticle === article.id
                      ? `solid #00A69C`
                      : undefined,
                }}>
                {seen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      zIndex: 9,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <div style={{textAlign: 'center'}}>
                      <IconButton
                        onClick={e => {
                          e.stopPropagation();
                          dispatch(markAsUnread(article.id));
                        }}>
                        <RestoreIcon style={{color: 'white', fontSize: 70}} />
                      </IconButton>
                    </div>
                  </div>
                )}
                <CardHeader
                  avatar={
                    <Avatar
                      src={article.user.current_avatar.small}
                      style={{backgroundColor: colors.purple}}
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
                  subheader={moment(article.created_at).format('MMMM Do YYYY')}
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
                  {matches && (
                    <IconButton
                      onClick={e => {
                        e.stopPropagation();
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
                  )}
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(markAsRead(article.id));
                    }}
                    size="small"
                    color="primary">
                    Mark as seen
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
    </>
  );
};

export default ArticlesList;
