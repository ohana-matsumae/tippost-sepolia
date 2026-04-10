import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAddress } from "viem";

import { network } from "hardhat";

describe("TipPost", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  it("Post creation stores data and emits PostCreated", async function () {
    const [creator] = await viem.getWalletClients();
    const tipPost = await viem.deployContract("TipPost", [], {
      client: { wallet: creator },
    });

    const imageUrl = "https://example.com/image.png";
    const caption = "my first post";

    await viem.assertions.emitWithArgs(
      tipPost.write.createPost([imageUrl, caption], { account: creator.account }),
      tipPost,
      "PostCreated",
      [1n, getAddress(creator.account.address), imageUrl, caption],
    );

    const post = await tipPost.read.posts([1n]);
    assert.equal(post[0], 1n);
    assert.equal(post[1].toLowerCase(), creator.account.address.toLowerCase());
    assert.equal(post[2], imageUrl);
    assert.equal(post[3], caption);
    assert.equal(post[4], 0n);
    assert.equal(post[5], 0n);
  });

  it("Successful like updates counters and transfers ETH to creator", async function () {
    const [creator, liker] = await viem.getWalletClients();
    const tipPost = await viem.deployContract("TipPost", [], {
      client: { wallet: creator },
    });

    await tipPost.write.createPost(["https://example.com/2.png", "hello"], {
      account: creator.account,
    });

    const likeCost = await tipPost.read.likeCost();
    const creatorBalanceBefore = await publicClient.getBalance({
      address: creator.account.address,
    });

    await viem.assertions.emitWithArgs(
      tipPost.write.likePost([1n], {
        account: liker.account,
        value: likeCost,
      }),
      tipPost,
      "PostLiked",
      [
        1n,
        getAddress(liker.account.address),
        getAddress(creator.account.address),
        likeCost,
        1n,
        likeCost,
      ],
    );

    const creatorBalanceAfter = await publicClient.getBalance({
      address: creator.account.address,
    });
    assert.equal(creatorBalanceAfter - creatorBalanceBefore, likeCost);

    const updatedPost = await tipPost.read.posts([1n]);
    assert.equal(updatedPost[4], 1n);
    assert.equal(updatedPost[5], likeCost);
    assert.equal(await tipPost.read.totalEarnedByUser([creator.account.address]), likeCost);
    assert.equal(await tipPost.read.checkLiked([1n, liker.account.address]), true);
  });

  it("Rejects double like from same account", async function () {
    const [creator, liker] = await viem.getWalletClients();
    const tipPost = await viem.deployContract("TipPost", [], {
      client: { wallet: creator },
    });

    await tipPost.write.createPost(["https://example.com/3.png", "double-like"], {
      account: creator.account,
    });

    const likeCost = await tipPost.read.likeCost();

    await tipPost.write.likePost([1n], {
      account: liker.account,
      value: likeCost,
    });

    await assert.rejects(
      tipPost.write.likePost([1n], {
        account: liker.account,
        value: likeCost,
      }),
      /already liked/i,
    );
  });

  it("Rejects self-like", async function () {
    const [creator] = await viem.getWalletClients();
    const tipPost = await viem.deployContract("TipPost", [], {
      client: { wallet: creator },
    });

    await tipPost.write.createPost(["https://example.com/4.png", "self-like"], {
      account: creator.account,
    });

    const likeCost = await tipPost.read.likeCost();

    await assert.rejects(
      tipPost.write.likePost([1n], {
        account: creator.account,
        value: likeCost,
      }),
      /cannot like your own post/i,
    );
  });
});