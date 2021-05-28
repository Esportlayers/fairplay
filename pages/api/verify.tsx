import type { NextApiRequest, NextApiResponse } from 'next'

import spadille from 'spadille';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { serverSeed, clientSeed, entries } = req.body;
    const arbitrarySequence = await spadille.prng.generate({
      secret: serverSeed,
      payload: clientSeed,
      minimum: 0,
      maximum: entries,
      amount: 1,
      distinct: false,
    });
    const winnerEntry = arbitrarySequence[0];
    return res.status(200).json({ ticket: winnerEntry });
  }
  return res.status(404);
}