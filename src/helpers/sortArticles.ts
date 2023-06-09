import moment from 'moment';
import Article from '../types/Article';

const sortArticles = (
  data: Article[] | undefined,
  readArticles: {[key: number]: boolean},
) => {
  return (
    data &&
    readArticles &&
    /* sort involves mutating the state directly which redux doesn't like
     so we can get around this by creating a copy using the spread operator */
    [...data].sort((a, b) => {
      /* push articles that are read to the bottom and sort articles by
      date by comparing unix timestamp */
      return !!readArticles[a.id] === !!readArticles[b.id]
        ? moment(b.created_at).unix() - moment(a.created_at).unix()
        : readArticles[a.id]
        ? 1
        : -1;
    })
  );
};

export default sortArticles;
