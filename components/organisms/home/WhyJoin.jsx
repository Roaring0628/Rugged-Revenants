/* eslint-disable @next/next/no-img-element */

const WhyJoin = () => {
  return (
    <section className="w-full pt-40">
      <div className="container">
        <div className="mb-4">
          <h1 className="text-4xl text-center">Why join the revenants?</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div className="">
            <div className="flex justify-center">
              <img
                src="/media/deadApeAnimate.gif"
                alt="deadApe"
                loading="lazy"
                className="max-h-[150px] mb-4"
              />
            </div>
            <p className="text-center">Exchange rugged NFTs</p>
          </div>
          <div className="">
            <div className="flex justify-center">
              <img
                src="/media/tokenAnimated.gif"
                alt="coin"
                loading="lazy"
                className="max-h-[150px] mb-4"
              />
            </div>
            <p className="text-center">Earn $RUG</p>
          </div>
          <div className="">
            <div className="flex justify-center">
              <img
                src="/media/lootPileAnimated.gif"
                alt="loot"
                loading="lazy"
                className="max-h-[150px] mb-4"
              />
            </div>
            <p className="text-center">Win prizes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
