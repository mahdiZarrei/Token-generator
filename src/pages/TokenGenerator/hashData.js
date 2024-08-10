import { ethers } from "ethers";
export const hashData = (name, symbol, type, senderAddress, chainId) => {
  const currentTime = Math.floor(Date.now() / 1000);

  const data = `${name}${symbol}${type}${senderAddress}${chainId}${currentTime}`;

  const hash = ethers.keccak256(ethers.toUtf8Bytes(data));

  const hashBytes32 = ethers.zeroPadValue(hash, 32);

  return hashBytes32;
};
