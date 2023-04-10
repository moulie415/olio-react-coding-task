import sortArticles from '../../helpers/sortArticles';
import Article from '../../types/Article';
import dummyArticles from '../dummyArticles.json';

const articles = dummyArticles as Article[];
describe('sort articles', () => {
  test('articles sorted in descending date order', () => {
    const sorted = sortArticles(articles, {});
    expect(sorted).toEqual([
      articles[2],
      articles[4],
      articles[1],
      articles[3],
      articles[0],
    ]);
  });
  test('read article appears last', () => {
    const sorted = sortArticles(articles, {[articles[4].id]: true});
    expect(sorted).toEqual([
      articles[2],
      articles[1],
      articles[3],
      articles[0],
      articles[4],
    ]);
  });

  test('read article appears last but then reverts after marked as unread', () => {
    const sorted = sortArticles(articles, {[articles[3].id]: true});
    expect(sorted).toEqual([
      articles[2],
      articles[4],
      articles[1],
      articles[0],
      articles[3],
    ]);
    const sortedNew = sortArticles(articles, {[articles[3].id]: false});
    expect(sortedNew).toEqual([
      articles[2],
      articles[4],
      articles[1],
      articles[3],
      articles[0],
    ]);
  });
});
