import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
  {
    username: "gato",
    avatar: "https://www.larazon.es/resizer/6ZgsBmWHenWo-kxfXbG3DLl0j_g=/600x400/smart/filters:format(jpg)/cloudfront-eu-central-1.images.arcpublishing.com/larazon/WDD4YYSISFGDRJPKHYGRUIRTRU.jpg"
  }
];

const tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "gato",
    tweet: "miau"
  }
];

server.post("/sign-up", (req, ans) => {
  const { username, avatar } = req.body;
  const user = {
    username,
    avatar,
  };
  users.push(user);
  ans.send("OK");
  return;
});

server.get("/tweets", (req, ans) => {
  const lastTweets = [];
  if (tweets.length > 10) {
    for (let i = tweets.length - 10; i < tweets.length; i++) {
      lastTweets.push(tweets[i]);
    }
  }

  const avatarTweets = (tweets.length > 10 ? lastTweets : tweets).map(
    (tweet) => {
      const find = users.find((item) => item.username === tweet.username);
      const avatarTweet = { ...tweet, avatar: find.avatar };
      return avatarTweet;
    }
  ).reverse();
  ans.send(avatarTweets);
});

server.post('/tweets', (req, ans) => {
  const {username, tweet} = req.body
  const tweetPost = {
    username,
    tweet
  }
  tweets.push(tweetPost)
  ans.send('OK')
})

server.listen(5000);
