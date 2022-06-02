/* eslint-disable @next/next/no-img-element */

const Partnerships = () => {
  return (
    <section className="w-full pt-48">
      <div className="container">
        <div className="mb-4">
          <h1 className="text-4xl text-center mb-8">Partnerships</h1>
          <p className="text-lg text-center mb-16">
            The Revenants has partnerships with projects across Solana to
            provide holders of those projects with in-game power-ups, custom
            levels, and exclusive in-game characters.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col items-center mb-12">
            <div className="w-4/5 h-60 mb-8 pb-8 border-b-4 border-brand-purple">
              <img
                src="/media/partners/Cyber_Samurai.png"
                alt="Cyber Samurai"
                loading="lazy"
                className="w-full h-full object-contain invert"
              />
            </div>
            <div className="px-2 flex flex-col justify-center items-center">
              <p className="text-lg text-center px-4">
                Protecting Degens and bringing Harmony to the Metaverse.
                <br />
                <br /> The Cyber Samurai are military nobility of DeFi, on a
                mission to protect degens from rug pulls and bring harmony to
                the metaverse. In our first comic we tell the story of Solana’s
                first year on mainnet.Their mission is to onboard new users to
                DeFi via NFTs. Using our comic book, software tools, and strong
                community, we help educate users and give them resources to
                navigate the metaverse.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center mb-12">
            <div className="w-4/5 h-60 mb-8 pb-8 border-b-4 border-brand-purple">
              <img
                src="/media/partners/hippos.png"
                alt="hippos"
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="px-2 flex flex-col justify-center items-center">
              <p className="text-lg text-center px-4">
                The High Roller Hippo Clique(HRHC) is composed of 7,777 hippos
                living on the Solana blockchain. HRHC is a community-run
                organization in which everyone provides value back to the
                community in return for their stake in our decentralized
                autonomous organization(DAO). Throughout HRHC's project
                lifecycle, it will not be operated, decided upon, or controlled
                by any one individual. HRHC has assembled an incredibly strong,
                grass-roots team of like minded individuals, who all share a
                common vision of decentralizing voting power and building new
                tech.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
