// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract TipPost {
  struct Post {
    uint256 id;
    address creator;
    string imageUrl;
    string caption;
    uint256 likes;
    uint256 totalEarned;
    uint256 timestamp;
  }

  uint256 public postCount;
  uint256 public likeCost = 0.0001 ether;

  mapping(uint256 => Post) public posts;
  mapping(uint256 => mapping(address => bool)) public hasLiked;
  mapping(address => uint256) public totalEarnedByUser;

  event PostCreated(
    uint256 indexed id,
    address indexed creator,
    string imageUrl,
    string caption
  );

  event PostLiked(
    uint256 indexed postId,
    address indexed liker,
    address indexed creator,
    uint256 amount,
    uint256 likes,
    uint256 totalEarned
  );

  function createPost(string calldata imageUrl, string calldata caption) external {
    require(bytes(imageUrl).length > 0, "createPost: image URL required");
    require(bytes(caption).length > 0, "createPost: caption required");

    postCount++;

    Post memory post = Post({
      id: postCount,
      creator: msg.sender,
      imageUrl: imageUrl,
      caption: caption,
      likes: 0,
      totalEarned: 0,
      timestamp: block.timestamp
    });

    posts[postCount] = post;

    emit PostCreated(post.id, post.creator, post.imageUrl, post.caption);
  }

  function likePost(uint256 postId) external payable {
    require(postId > 0 && postId <= postCount, "likePost: post does not exist");
    require(msg.value >= likeCost, "likePost: insufficient ETH sent");

    Post storage post = posts[postId];

    require(msg.sender != post.creator, "likePost: cannot like your own post");
    require(!hasLiked[postId][msg.sender], "likePost: already liked");

    hasLiked[postId][msg.sender] = true;
    post.likes++;
    post.totalEarned += msg.value;
    totalEarnedByUser[post.creator] += msg.value;

    (bool sent, ) = payable(post.creator).call{ value: msg.value }("");
    require(sent, "likePost: tip transfer failed");

    emit PostLiked(postId, msg.sender, post.creator, msg.value, post.likes, post.totalEarned);
  }

  function getAllPosts() external view returns (Post[] memory) {
    Post[] memory allPosts = new Post[](postCount);

    for (uint256 i = 0; i < postCount; i++) {
      allPosts[i] = posts[i + 1];
    }

    return allPosts;
  }

  function checkLiked(uint256 postId, address user) external view returns (bool) {
    return hasLiked[postId][user];
  }
}