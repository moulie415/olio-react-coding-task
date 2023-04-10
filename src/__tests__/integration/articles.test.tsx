import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ArticlesList from '../../components/routes/Articles/ArticlesList';
import dummyArticles from '../dummyArticles.json';
import Article from '../../types/Article';
import {BrowserRouter} from 'react-router-dom';

const articles = dummyArticles as Article[];

const mockStore = configureStore([]);

describe('ArticlesList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      articles: {
        readArticles: {},
      },
    });
  });

  it('renders a list of articles sorted by date', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ArticlesList
            data={articles}
            articleRefs={{}}
            setHighlightedArticle={() => {}}
            googleMap={{}}
          />
        </Provider>
      </BrowserRouter>,
    );
    const article1 = screen.getByTestId(articles[2].id);
    const article2 = screen.getByTestId(articles[4].id);
    const article3 = screen.getByTestId(articles[1].id);
    const article4 = screen.getByTestId(articles[3].id);
    const article5 = screen.getByTestId(articles[0].id);

    const articlesList = [article1, article2, article3, article4, article5];

    articlesList.forEach((a, index) => {
      expect(a).toBeInTheDocument();
      if (articlesList[index + 1]) {
        expect(a.nextSibling).toBe(articlesList[index + 1]);
      }
    });
  });
});
