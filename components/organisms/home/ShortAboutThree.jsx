/* eslint-disable @next/next/no-img-element */

const ShortAboutThree = () => {
  return (
    <section className="w-full pt-32">
      <div className="container">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="md:w-1/2 pt-10">
            <div className="flex gap-4 mb-6">
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/lineDark.png" alt="line" loading="lazy" />
            </div>
            <div className="">
              <h1 className="text-3xl mb-6">Use Charges to win loot</h1>
              <p className="text-sm1 mb-6">
                Use Charges to win NFTs of value. That’s right, you can win
                valuable NFTs for FREE! There are 2 ways to earn charges.
                <br />
                <br />
                1. Trade in rugged NFTs
                <br />
                2. Play our game
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="flex justify-center items-center">
              <img
                src="/media/lootPileAnimated-2.gif"
                alt="heroes"
                className="max-h-[250px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortAboutThree;
