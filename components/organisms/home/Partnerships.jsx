/* eslint-disable @next/next/no-img-element */

const Partnerships = () => {
  return (
    <section className="w-full pt-48">
      <div className="container">
        <div className="mb-4">
          <h1 className="text-4xl text-center mb-8">Partnerships</h1>
          <p className="text-lg text-center mb-16">
            The Revenants will be partnering with collections for in-game
            abilities, integragtions and loot.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col items-center mb-12">
            <img
              src="/media/sovana.png"
              alt="sovana"
              loading="lazy"
              className="w-3/5 mb-12"
            />
            <div className="px-4 flex flex-col justify-center items-center">
              <a
                href="https://www.sovana.world/"
                rel="noreferrer"
                target="_blank"
                className="mb-12"
              >
                <div className="w-96 h-40 relative flex justify-center items-center cursor-pointer flex-shrink-0 hover:text-brand-purple">
                  <img
                    className="absolute top-0 left-0 w-full h-full"
                    src="/media/button.png"
                    alt="button"
                  ></img>
                  <span className="text-lg mb-3 z-10">SOVANA</span>
                </div>
              </a>
              <h1 className="text-4xl text-center mb-4">Sovana</h1>
              <p className="text-lg text-center px-4">
                Our game will be the first playable game in Sovana! Sovana
                holders will also receive in-game benefits.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center mb-12">
            <img
              src="/media/coolCats.png"
              alt="sovana"
              loading="lazy"
              className="w-3/5 mb-12"
            />
            <div className="px-4 flex flex-col justify-center items-center">
              <a
                href="https://www.dopecats.com/"
                rel="noreferrer"
                target="_blank"
                className="mb-12"
              >
                <div className="w-96 h-40 relative flex justify-center items-center cursor-pointer flex-shrink-0 hover:text-brand-purple">
                  <img
                    className="absolute top-0 left-0 w-full h-full"
                    src="/media/button.png"
                    alt="button"
                  ></img>
                  <span className="text-lg mb-3 z-10">DOPE CATS</span>
                </div>
              </a>
              <h1 className="text-4xl text-center mb-4">Dope Cats</h1>
              <p className="text-lg text-center px-4">
                Dope cat holders will receive in-game benefits and 1 rugged
                revenant NFT.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
