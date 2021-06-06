import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';

import http from '../../../server';

use(chaiHttp);

describe('Chatroom', () => {
  const originalUrl = 'https://test.com';
  const base = '/api/v1/users';

  it('should get empty list', async () => {
    const res = await request(http).get(base);

    expect(res.body).to.deep.equal({ data: [], count: 0 });
  });

  it('should not allow create a short url', async () => {
    const res = await request(http).post(base);

    expect(res.error.text).to.contain(
      '{"message":"originalUrl param is mandatory"}'
    );
  });

  it('should create short urls', async () => {
    for (let index = 10; index > 0; index--) {
      const res = await request(http)
        .post(base)
        .send({ originalUrl: `${originalUrl}${index}` });

      expect(res.body).to.deep.contain({
        originalUrl: `${originalUrl}${index}`,
      });
      expect(res.body).to.deep.contain.keys([
        'createdAt',
        '_id',
        'shortUrl',
        'updatedAt',
        'originalUrl',
      ]);
    }
  });

  it('should get created item', async () => {
    const res = await request(http).get(base);

    expect(res.body).to.deep.contain({ count: 10 });
    expect(res.body.data[0]).to.deep.contain.keys([
      'createdAt',
      '_id',
      'shortUrl',
      'updatedAt',
      'originalUrl',
    ]);
  });
});
