export const tipPostAbi = [
  {
    type: "function",
    name: "createPost",
    stateMutability: "nonpayable",
    inputs: [
      { name: "imageUrl", type: "string" },
      { name: "caption", type: "string" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "likePost",
    stateMutability: "payable",
    inputs: [{ name: "postId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "getAllPosts",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "imageUrl", type: "string" },
          { name: "caption", type: "string" },
          { name: "likes", type: "uint256" },
          { name: "totalEarned", type: "uint256" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "checkLiked",
    stateMutability: "view",
    inputs: [
      { name: "postId", type: "uint256" },
      { name: "user", type: "address" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "totalEarnedByUser",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "PostCreated",
    anonymous: false,
    inputs: [
      { indexed: true, name: "id", type: "uint256" },
      { indexed: true, name: "creator", type: "address" },
      { indexed: false, name: "imageUrl", type: "string" },
      { indexed: false, name: "caption", type: "string" },
    ],
  },
  {
    type: "event",
    name: "PostLiked",
    anonymous: false,
    inputs: [
      { indexed: true, name: "postId", type: "uint256" },
      { indexed: true, name: "liker", type: "address" },
      { indexed: true, name: "creator", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "likes", type: "uint256" },
      { indexed: false, name: "totalEarned", type: "uint256" },
    ],
  },
] as const;
