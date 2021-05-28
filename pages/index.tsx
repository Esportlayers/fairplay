import { Button, Input, Link, Spacer, Text } from "@geist-ui/react";
import { ReactElement, useCallback, useEffect, useState } from "react";

import Head from 'next/head';
import ProvablyFairIcon from "../components/ProvablyFairIcon";
import StreamDotaIcon from "../components/StreamDotaIcon";

export default function Home(): ReactElement {
  const [serverSeed, setServerSeed] = useState('');
  const [clientSeed, setClientSeed] = useState('');
  const [entries, setEntries] = useState(0);
  const [winnerTicket, setWinnerTicket] = useState<number | null>(null);

  useEffect(() => setWinnerTicket(null), [serverSeed]);
  useEffect(() => setWinnerTicket(null), [clientSeed]);
  useEffect(() => setWinnerTicket(null), [entries]);

  const confirm = useCallback(async () => {
    if (serverSeed.length > 0 && clientSeed.length > 0 && entries > 0) {
      const response = await fetch('/api/verify', { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify({ serverSeed, clientSeed, entries }) });
      if (response.ok) {
        setWinnerTicket((await response.json()).ticket);
      }
    }
  }, [serverSeed, clientSeed, entries])

  return <main>
    <Head>
      <title>streamdota.com | Provably Fair</title>
    </Head>
    <div className={'row'}>
      <StreamDotaIcon />
      <span className={'plus'}>+</span>
      <ProvablyFairIcon />
    </div>

    <Spacer y={2} />
    <Text h1>Streamdota.com is provably fair.</Text>
    <p>This page allows anyone to prove any random winners from streamdota.com. Just fill out the fields below and check the results yourself.</p>
    <p>Read more info on provably fair on <a href={'https://en.wikipedia.org/wiki/Provably_fair_algorithm'} target={'_blank'} rel={'noreferrer nofollow'}>Wikipedia</a>.</p>

    <Spacer y={1} />

    <form onSubmit={(e) => {
      e.preventDefault();
      confirm();
    }}>
      <Input size="large" placeholder="Server seed from chat" value={serverSeed} onChange={(e) => setServerSeed(e.target.value)}>
        Server Seed
      </Input>
      <Spacer />
      <Input size="large" placeholder="Client seed from chat" value={clientSeed} onChange={(e) => setClientSeed(e.target.value)}>
        Client Seed
      </Input>
      <Spacer />
      <Input size="large" placeholder="Entries from chat" value={'' + entries} onChange={(e) => setEntries(+e.target.value)} type={'number'}>
        Entries
      </Input>
      <Spacer />
      <div className={'button'}>
        <Button onClick={confirm} type={'success'}>Submit</Button>
      </div>
    </form>

    <Spacer y={5} />

    {winnerTicket && <h2>Winner Ticket: #{winnerTicket}</h2>}


    <Spacer y={5} />

    <Link href={'https://github.com/Esportlayers/fairplay'} target={'_blank'} rel={'noreferrer nofollow'} underline color>Check the source code of this website</Link>

    <Spacer y={10} />

    <Link href={'https://streamdota.com/about'} target={'_blank'} rel={'noreferrer nofollow'} underline>Impressum</Link>
    <style jsx>{`
      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5rem 2rem;
      }
      
      .row {
        display: flex;
        align-items: center;
        grid-gap: 4rem;
      }

      .plus {
        font-size: 80px;
        font-weight: bold;
      }

      .button {
        text-align: center;
      }
    `}</style>
  </main>
}