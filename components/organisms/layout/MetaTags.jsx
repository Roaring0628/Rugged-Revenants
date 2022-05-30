import Head from "next/head";

export default function MetaTags() {
  return (
    <Head>
      <title key="title">Rugged Revenants</title>
      <meta
        name="description"
        content="Rugged Revenants are the keys into getting prized, valuable NFTs. Play P2E games with your rugged NFTs to earn prizes."
        key="description"
      />

      {/* page open graph meta tags */}
      <meta property="og:title" content="Rugged Revenants" key="og:title" />
      <meta
        property="og:description"
        content="Rugged Revenants are the keys into getting prized, valuable NFTs. Play P2E games with your rugged NFTs to earn prizes."
        key="og:description"
      />
    </Head>
  );
}
