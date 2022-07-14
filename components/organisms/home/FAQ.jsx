/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import classNames from "classnames";

const FAQ = () => {
  return (
    <section id="FAQ" className="w-full pt-48 pb-32">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl text-center">FAQs</h1>
        </div>
        <div className="w-full">
          <Question question="What do Rugged Revenants give me?">
            <div className="px-6">
              They provide in-game benefits like flight and extra lives based on
              their attributes.
            </div>
          </Question>
          <Question question="What is the total supply?">
            <div className="px-6">
              {/* Generation 1 will consist of 4,000 Revenants sent back in time to
              stop Solana from getting Rugged. */}
              TBD
            </div>
          </Question>
          <Question question="How many can I mint per wallet?">
            <div className="px-6">Each wallet can mint 2 NFTs.</div>
          </Question>
          <Question question="What is the price per mint?">
            <div className="px-6">
              {/* <p>
                Whitelist 1 SOL
                <br />
                Public Mint 1.25 SOL
              </p> */}
              TBD
            </div>
          </Question>
          <Question question="Wen mint?">
            <div className="px-6">TBA</div>
          </Question>
          <Question question="What if I have other questions?">
            <div className="px-6">
              Please join our discord and tag @tvacgamer or @cbass for any
              questions!
            </div>
          </Question>
        </div>
      </div>
    </section>
  );
};

function Question({ question, children }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleAnswer = () => {
    setShowAnswer((old) => !old);
  };

  return (
    <div className="relative py-3 bg-primaryBack shadow rounded-lg">
      <div
        className="flex items-center justify-between py-8 border-b-[3px] border-brand-grey cursor-pointer"
        onClick={toggleAnswer}
      >
        <p className="text-[1.6rem]">{question}</p>
        <span className="flex-shrink-0">
          {!showAnswer && <img src="/media/plus.png" alt="plus" />}
          {showAnswer && <img src="/media/minus.png" alt="minus" />}
        </span>
      </div>
      <div
        className={classNames("pt-4 overflow-hidden duration-500", {
          "h-0": !showAnswer,
          "h-36 md:h-16": showAnswer,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default FAQ;
