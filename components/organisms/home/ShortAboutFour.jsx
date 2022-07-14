/* eslint-disable @next/next/no-img-element */

const ShortAboutFour = () => {
  return (
    <section className="w-full pt-32">
      <div className="container">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="flex justify-center items-center">
              <img
                src="/media/tokenAnimated.gif"
                alt="token"
                className="max-h-[300px]"
              />
            </div>
          </div>
          <div className="md:w-1/2 pt-10 flex flex-col items-center md:block">
            <div className="flex gap-4 mb-6">
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/line.png" alt="line" loading="lazy" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl mb-6">Use $RUG to upgrade your characters</h1>
              <p className="text-sm1 mb-6">
                1. Fire Damage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <br />
                2. Acid Damage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <br />
                3. Lightning Damage
                <br />
                4. Ice Damage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortAboutFour;
