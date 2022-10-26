/* eslint-disable @next/next/no-img-element */

const TeamMembers = () => {
  const team = [
    {
      name: "Tony Valcarcel",
      title: "Head of 1KL Gamefi Division",
      image: "/media/team/tony.png",
      bio: "Executive VP of Gaming, 15+ years experience in game development, management including prior roles at Twitch Prime, EA, and Nintendo",
    },
    {
      name: "CBass (Sebastian)",
      title: "Community Manager for Rugged Revenants",
      image: "/media/team/cBass.png",
      bio: "Head of Marketing and Community for 1KL, Project Lead at Dope Cats. 5+ Years of Networking and Organizational Development",
    },
    {
      name: "Matt Marcou",
      title: "",
      image: "/media/team/matt.png",
      bio: "VP, Game Production, Commissioner, Madden Championship Series, EA's Competitive Gaming. Founder Riot Games League of Legends Championship Series",
    },
    {
      name: "Jim Welch",
      title: "Creative Director of The Devhouse Agency",
      image: "/media/team/jim.png",
      bio: "Creative Director and Head of Studio of The Devhouse Agency. Jim and The Devhouse Agency craft stunning augmented reality, virtual reality, and gaming experiences",
    },
    {
      name: "Mark Paton",
      title: "Co-Founder and Tokenization Director of 1Kin Labs",
      image: "/media/team/mark.png",
      bio: "Chief Token Officer 1KL, global macro hedge fund, private cryptocurrency trader, qualified Investment Advisor",
    },
    {
      name: "Jason Kingdon",
      title: "Co-Founder and Director at 1Kin Labs",
      image: "/media/team/jason.png",
      bio: "President and Chief Operating Officer 1KL, entrepreneur-in residence for international Chinese venture firms, Previously funded founder, HBS MBA 2021",
    },
    {
      name: 'Jason "Zofrus" Fuller',
      title: "Chief Technical Officer",
      image: "/media/team/zforus.png",
      bio: "Chief Technical Officer, Founder Paperhand Labs, Co-Founder Rocketpower Labs, Co-host web3zone",
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
                <p className=" text-[1.4rem] text-center mb-6">{member.name}</p>
                {/* <p className="text-sm text-center mb-8">{member.title}</p> */}
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
