import Link from 'next/link';

const Connections = () => {
  return (
    <div>
      <h1>🤝 Let’s Connect & Collaborate</h1>
      <p>
        Join me across your favorite social channels, where I share expert .NET
        insights, software engineering deep dives, and real-world coding tips.
      </p>
      <div>
        <Link href="https://twitter.com/jeremy_daly">X</Link>
        <Link href="https://www.linkedin.com/in/jeremy-daly-657a2512/">
          LinkedIn
        </Link>
        <Link href="https://www.youtube.com/@jeremydaly">YouTube</Link>
        <Link href="https://www.facebook.com/jeremy.daly.33">Facebook</Link>
        <Link href="https://www.instagram.com/jeremydaly/">Instagram</Link>
        <Link href="https://github.com/jeremydaly">GitHub</Link>
        <Link href="https://www.twitch.tv/jeremydaly">Twitch</Link>
        <Link href="https://www.tiktok.com/@jeremydaly">TikTok</Link>
        <Link href="https://www.reddit.com/user/jeremydaly">Reddit</Link>
        <Link href="https://www.pinterest.com/jeremydaly/">Pinterest</Link>
        <Link href="https://www.snapchat.com/add/jeremydaly">Snapchat</Link>
        <Link href="https://www.threads.net/@jeremydaly">Threads</Link>
      </div>
    </div>
  );
};

export default Connections;
