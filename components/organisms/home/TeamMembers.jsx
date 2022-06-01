/* eslint-disable @next/next/no-img-element */

const TeamMembers = () => {
  const team = [
    {
      name: "Tony Valcarcel",
      title: "Head of 1KL Gamefi Division",
      image: "/media/team/tony.png",
      bio: "Tony Valcarcel is the head of 1KL gamefi division and plans to explode games onto Solana and throughout the metaverse. Formerly Amazon: Twitch Prime, EA, and Nintendo. He has been working in the gaming world for over 15 years. Tony's passion for gaming is immediately evident and ignites hype across web3. Eat, Sleep, Degen.",
    },
    {
      name: "Greg Parrish",
      title: "Technical Product Director at 1Kin Labs",
      image: "/media/team/greg.png",
      bio: "Greg Parrish, is the Technical Product Director at 1Kin Labs with over three decades of experience building and leading product development teams through creating complex innovative platforms across a myriad of industries.",
    },
    {
      name: "Jason Atwood",
      title: "CEO/Co-founder of Drop-In Gaming",
      image: "/media/team/jasonA.png",
      bio: "Jason Atwood is CEO/Co-founder of Drop-In Gaming.  With 30 years in the IT and gaming world he brings not only knowledge in the space but a passion for disrupting the industry. He is an experienced executive with a demonstrated history of success and accomplishments in the gaming and technology industries.",
    },
    {
      name: "Tanner Bogart",
      title: "CGO and Co-Founder of Drop-In Gaming",
      image: "/media/team/tanner.png",
      bio: "Tanner Bogart is the CGO and Co-Founder of Drop-In Gaming. Playing video games since the age of 6, Tanner has always had a competitive background and thrives when its tournament time.",
    },
    {
      name: "Jim Welch",
      title: "Creative Director of The Devhouse Agency",
      image: "/media/team/jim.png",
      bio: "Jim Welch is the Creative Director and Head of Studio of The Devhouse Agency. Pioneering the metaverse while sharing a passion for gaming, Jim and The Devhouse Agency craft stunning augmented reality, virtual reality, and gaming experiences.",
    },
    {
      name: "CBass (Sebastian)",
      title: "Community Manager for Rugged Revenants",
      image: "/media/team/cBass.png",
      bio: "Hey! My name is Sebastian, but I go by Cbass! I'm the Community Manager for Rugged Revenants, I help out making sure Twitter & Discord run smooth for Rugged Revenants! In my free time I enjoy Spending Time w/ Dani (my s/o), Traveling, Play Video Games, and Induce myself in a Food Coma! I'm very grateful for the connections I've made, the friends I have, and the family I get to spend my time with! A special shoutout to My Step Mom hehe!",
    },
    {
      name: "Jason Kingdon",
      title: "Co-Founder and Director at 1Kin Labs",
      image: "/media/team/jason.png",
      bio: "Jason M. Kingdon, is a Co-founder and Director at 1Kin Labs. Previously he worked as an entrepreneur in residence for early stage venture firms. He has an MBA from Harvard Business School and a Bachelor of Arts from Columbia University.",
    },
    {
      name: "Jack O'Neill",
      title: "Co-Founder and Managing Director of 1Kin Labs",
      image: "/media/team/jack.png",
      bio: "Jack O-Neill, is the Co-founder and Managing Director of 1Kin Labs. In addition to being a serial funded founder, Jack was Chief of Staff at Office Depot and a PM at Lenovo. He holds an MBA from Harvard Business School, where he spearheaded the first annual Harvard Blockchain Conference.",
    },
    {
      name: "Mark Paton",
      title: "Co-Founder and Tokenization Director of 1Kin Labs",
      image: "/media/team/mark.png",
      bio: "Mark Paton, is a Co-founder of 1Kin Labs and serves as the Tokenization Director to all things on-chain. Prior to 1Kin Labs, Mark was a professional securities trader managing a global macro hedge fund and has been actively participating in the cryptocurrency markets for the better half of a decade. He is a licensed Investment Advisor and has a BS from Babson College ‘16.",
    },
  ];

  return (
    <section id="team" className="w-full pt-48">
      <div className="container">
        <h1 className="text-4xl text-center mb-36">Rugged Revenants Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {team.map((member, index) => {
            return (
              <div key={index} className="px-2 mb-8">
                <div className="flex justify-center mb-4">
                  <img
                    title={member.title}
                    src={member.image}
                    alt={member.title}
                    className="w-1/2"
                  />
                </div>
                <p className=" text-[1.4rem] text-center mb-3">{member.name}</p>
                <p className="text-sm text-center mb-8">{member.title}</p>
                <p className="text-[0.7rem] leading-[1rem] text-center">
                  {member.bio}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
