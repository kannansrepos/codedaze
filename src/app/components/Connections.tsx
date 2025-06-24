import SocialLinks from './posts/SocialLinks';

const Connections = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <div className="container mx-auto px-10 flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
          Let’s Connect & Collaborate
        </h1>
        <p className="text-lg">
          Join me across your favorite social channels, where I share expert{' '}
          <br />
          <b>
            <ul>
              <li> ✔ .NET insights</li>
              <li> ✔ software engineering deep dives</li>
              <li> ✔ real-world coding tips</li>
            </ul>
          </b>
        </p>
        <SocialLinks />
      </div>
    </div>
  );
};

export default Connections;
