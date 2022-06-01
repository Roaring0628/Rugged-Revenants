/* eslint-disable @next/next/no-img-element */

const DemoVideo = () => {
  return (
    <section className="w-full pt-32">
      <div className="container">
        <div className="videoHeader">
          <video
            className="video"
            muted
            autoPlay={true}
            playsInline
            loop
            preload="auto"
            controls={false}
            poster="/media/heroBackground.png"
          >
            <source type="video/mp4" src="/media/ruggedPreviewVid.mp4" />
            Your browser does not support the video tag.
          </video>
          <img
            className="tv-screen"
            src="/media/tvScreenTransparent.png"
            alt="tv screen"
          ></img>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
