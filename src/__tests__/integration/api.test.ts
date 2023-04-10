import {Article} from '../../services/api';

describe('GET articles', () => {
  test('articles endpoint', async () => {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + 'test-articles-v4.json' || '',
    );

    expect(response.status).toBe(200);

    const data: Article[] = await response.json();

    // Check that the data is an array
    expect(Array.isArray(data)).toBe(true);

    // Check that each article has the expected properties
    data.forEach(article => {
      expect(article).toHaveProperty('id');
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('description');
      expect(article).toHaveProperty('created_at');
      expect(article).toHaveProperty('updated_at');
      expect(article).toHaveProperty('status');
    });
  });
});
