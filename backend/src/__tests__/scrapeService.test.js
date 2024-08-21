const request = require('supertest');
const app = require('../app');

describe('API Endpoint Tests for /api/scrape', () => {

  // Test case 1:Single Url Check for a 200 status code (successful request)
  it('should return 200 for a valid request', async () => {
    const response = await request(app)
      .post('/api/scrape')
      .send({ urls: ['https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst'] });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // Test case 2: Check for a 400 status code (bad request)
  it('should return 400 for a request with no URLs', async () => {
    const response = await request(app)
      .post('/api/scrape')
      .send({ urls: [] });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Bad Request: Please provide an array of valid URLs to scrape.');
  });

  // Test case 3: Check for a 500 status code (server error)
  it('should return 500 if the scraping service fails', async () => {
    const response = await request(app)
      .post('/api/scrape')
      .send({ urls: ['invalid-url'] });
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error: An error occurred during scraping.');
  });

    //Test case 4: Multiple Url Check for a 200 status code (successful request)
  it('should return 200 for a valid request', async () => {
    const response = await request(app)
      .post('/api/scrape')
      .send({ urls: ['https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst',
        'https://www.youtube.com/watch?v=jb210-OXOCM&list=PLuVrpx3FP3xUzOEzk5BUvlfs_3nyRlpaj&index=33',
        'https://www.southparkstudios.com/'] });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });




  // Test case 5: Check if scraping returns correct data structure
  it('should return metadata with correct structure', async () => {
    const response = await request(app)
      .post('/api/scrape')
      .send({ urls: ['https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst',
        'https://www.youtube.com/watch?v=jb210-OXOCM&list=PLuVrpx3FP3xUzOEzk5BUvlfs_3nyRlpaj&index=33',
        'https://www.southparkstudios.com/'

      ] });
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('url');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('image');
  });

});
