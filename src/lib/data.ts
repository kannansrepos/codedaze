export const navMenuData = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Posts',
    href: '/posts',
  },
  {
    name: 'About',
    href: '/about',
  },
];

export const Prompt = {
  titlePrompt:
    "Give me one of the best latest title to write post regarding {LANGUAGE} for 5 to 10 min read in JSON object like {title:'My Best Title'} don't add any special characters",
  prompt:
    "I want to write an blog post for '{TITLE}' can you give me 5 to 10 min to read about this topic for blog post with the bellow object format in JSON object  {url:'SEO optimized url for view dot't give any host',metadata:'SEO metadata information',language:language:'angular or  docker or  dotnet  or nextjs or or react based on the post',shortTitle:'',title:'',description:'',category:'',readMin:1,section:[{title:'',content:HTML format type text,code:sample code] please don't add any special characters, don't use markdown format",
};
