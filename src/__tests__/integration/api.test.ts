

describe('GET articles', () => {
  test('articles endpoint', async () => {
    const response = await fetch(process.env.REACT_APP_BASE_URL + 'test-articles-v4.json' || '');
    expect(response.status).toBe(200);
    
  })
})