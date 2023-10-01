import Pusher from "pusher-js";

const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_APIKEY}`, {
  cluster: `${process.env.NEXT_PUBLIC_PUSHER_CLUSTER}`,
});

export default pusher;
