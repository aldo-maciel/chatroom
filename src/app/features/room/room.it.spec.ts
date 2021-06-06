import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';

import http from '../../../server';

use(chaiHttp);

describe('Room', () => {
  const base = '/api/v1/rooms';
  const userId = '60bce3d10c8dac4b298f2384';

  it('should get empty list', async () => {
    const res = await request(http).get(base);

    expect(res.body).to.deep.equal({ data: [], count: 0 });
  });

  it('should not allow create a room', async () => {
    const res = await request(http).post(`${base}/${userId}`);

    expect(res.error.text).to.contain(
      '{"message":"roomName param is mandatory"}'
    );
  });

  it('should create new rooms', async () => {
    for (let index = 10; index > 0; index--) {
      const res = await request(http)
        .post(`${base}/${userId}`)
        .send({ roomName: `room_${index}` });

      expect(res.body._id).to.match(/[\D\d]/g);
      expect(res.body).to.deep.contain.keys(['success', '_id']);
    }
  });

  it('should get created item', async () => {
    const res = await request(http).get(base);

    expect(res.body).to.deep.contain({ count: 10 });
    expect(res.body.data[0]).to.deep.contain.keys([
      'createdAt',
      '_id',
      'owner',
      'ownerId',
      'roomName',
      'updatedAt',
    ]);
  });

  it('should remove last', async () => {
    let resFind = await request(http).get(base);

    expect(resFind.body).to.deep.contain({ count: 10 });

    const last = resFind.body.data.pop();

    const resDelete = await request(http).delete(
      `${base}/${last._id}/${userId}`
    );

    expect(resDelete.body).to.contain({ success: true });

    resFind = await request(http).get(base);

    expect(resFind.body).to.deep.contain({ count: 9 });
  });
});
