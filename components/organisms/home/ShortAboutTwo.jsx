/* eslint-disable @next/next/no-img-element */

const ShortAboutTwo = () => {
  return (
    <section className="w-full pt-32">
      <div className="container">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="flex justify-center items-center">
              <img
                src="/media/heroes-2.gif"
                alt="heroes"
                className="max-h-[350px]"
              />
            </div>
          </div>
          <div className="md:w-1/2 pt-10">
            <div className="flex gap-4 mb-6">
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/lineDark.png" alt="line" loading="lazy" />
            </div>
            <div className="">
              <h1 className="text-3xl mb-6">What are Rugged Revenants?</h1>
              <p className="text-sm1 mb-6">
                Rugged revenants are NFTs that holders will use as playable
                characters within the game. They provide in-game benefits like
                flight and extra lives based on their attributes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortAboutTwo;
