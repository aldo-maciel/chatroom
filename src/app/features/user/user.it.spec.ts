import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';

import http from '../../../server';
import { testDbUtils } from '@/config/mongo-test.config';

use(chaiHttp);

describe('User', () => {
  const base = '/api/v1/users';

  after(() => {
    testDbUtils.cleanup();
    testDbUtils.stop();
  });

  it('should get empty list', async () => {
    const res = await request(http).get(base);

    expect(res.body).to.deep.equal({ data: [], count: 0 });
  });

  it('should not allow create a new user without username', async () => {
    const res = await request(http).post(base);

    expect(res.error.text).to.contain(
      '{"message":"username param is mandatory"}'
    );
  });

  it('should not allow create a new user without password', async () => {
    const res = await request(http).post(base).send({ username: 'test' });

    expect(res.error.text).to.contain(
      '{"message":"password param is mandatory"}'
    );
  });

  it('should create user', async () => {
    for (let index = 10; index > 0; index--) {
      const res = await request(http)
        .post(base)
        .send({ username: `username_${index}`, password: index });

      expect(res.body._id).to.match(/[\D\d]/g);
      expect(res.body).to.deep.contain.keys(['success', '_id']);
    }
  });

  it('should get created items', async () => {
    const res = await request(http).get(base);

    expect(res.body).to.deep.contain({ count: 10 });
    expect(res.body.data[0]).to.deep.contain.keys([
      'createdAt',
      '_id',
      'username',
      'updatedAt',
      'admin',
      'readonly',
    ]);
  });
});
