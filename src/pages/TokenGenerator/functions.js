import {
  tokenGenerator1Address,
  tokenGenerator1ABI,
  tokenGenerator2Address,
  tokenGenerator2ABI,
  tokenGenerator3Address,
  tokenGenerator3ABI,
  tokenGenerator4Address,
  tokenGenerator4ABI,
} from "../../data/GeneratorContractData";
import { Contract } from "ethers";

export const generateCantract = async (adrress, abi, signer) => {
  const contract = new Contract(adrress, abi, signer);
  return contract;
};

export const executorFunction = async (props, signer, salt) => {
  if (
    props.Burn === false &&
    props.Mint === false &&
    props.Puase === false &&
    props.Permit === false &&
    props.cap === ""
  ) {
    const StandardERC20 = await generateCantract(
      tokenGenerator1Address,
      tokenGenerator1ABI,
      signer
    );
    let kind, token, owner;
    StandardERC20.on("TokenDeployed", (_owner, _token, _kind, _event) => {
      if (_owner === signer.address) {
        token = _token;
        kind = _kind;
        owner = _owner;
      }
      console.log(`owner:${_owner}\ntoken:${_token}\nkind:${_kind}`);
      console.log(_event);
    });
    const tx = await StandardERC20.generateStandardERC20(
      props.name,
      props.symbol,
      props.supply,
      salt
    );
    await tx.wait();
    StandardERC20.off("TokenDeployed", (owner, token, kind, event) => {
      console.log(`owner:${owner}\ntoken:${token}\nkind:${kind}`);
      console.log(event);
    });
    return [token, kind, owner];
  }
  if (props.Permit === false && props.cap !== "") {
    const SuperERC20Capped = await generateCantract(
      tokenGenerator1Address,
      tokenGenerator1ABI,
      signer
    );
    let kind, token, owner;
    SuperERC20Capped.on("TokenDeployed", (_owner, _token, _kind, _event) => {
      if (_owner === signer.address) {
        token = _token;
        kind = _kind;
        owner = _owner;
      }
      console.log(`owner:${_owner}\ntoken:${_token}\nkind:${_kind}`);
      console.log(_event);
    });
    const tx = await SuperERC20Capped.generateSuperERC20Capped(
      props.name,
      props.symbol,
      props.supply,
      props.Mint,
      props.Burn,
      props.Puase,
      props.cap,
      salt
    );
    await tx.wait();
    SuperERC20Capped.off("TokenDeployed", (owner, token, kind, event) => {
      console.log(`owner:${owner}\ntoken:${token}\nkind:${kind}`);
      console.log(event);
    });
    return [token, kind, owner];
  }
  if (props.Permit === true && props.cap === "") {
    const SuperERC20Permit = await generateCantract(
      tokenGenerator2Address,
      tokenGenerator2ABI,
      signer
    );
    let kind, token, owner;
    SuperERC20Permit.on("TokenDeployed", (_owner, _token, _kind, _event) => {
      if (_owner === signer.address) {
        token = _token;
        kind = _kind;
        owner = _owner;
      }
      console.log(`owner:${_owner}\ntoken:${_token}\nkind:${_kind}`);
      console.log(_event);
    });
    const tx = await SuperERC20Permit.generateSuperERC20Permit(
      props.name,
      props.symbol,
      props.supply,
      props.Mint,
      props.Burn,
      props.Puase,
      salt
    );
    await tx.wait();
    SuperERC20Permit.off("TokenDeployed", (owner, token, kind, event) => {
      console.log(`owner:${owner}\ntoken:${token}\nkind:${kind}`);
      console.log(event);
    });
    return [token, kind, owner];
  }
  if (props.Permit === true && props.cap !== "") {
    const UltimateERC20 = await generateCantract(
      tokenGenerator3Address,
      tokenGenerator3ABI,
      signer
    );
    let kind, token, owner;
    UltimateERC20.on("TokenDeployed", (_owner, _token, _kind, _event) => {
      if (_owner === signer.address) {
        token = _token;
        kind = _kind;
        owner = _owner;
      }
      console.log(`owner:${_owner}\ntoken:${_token}\nkind:${_kind}`);
      console.log(_event);
    });
    const tx = await UltimateERC20.generateUltimateERC20(
      props.name,
      props.symbol,
      props.supply,
      props.Mint,
      props.Burn,
      props.Puase,
      props.cap,
      salt
    );
    await tx.wait();
    UltimateERC20.off("TokenDeployed", (owner, token, kind, event) => {
      console.log(`owner:${owner}\ntoken:${token}\nkind:${kind}`);
      console.log(event);
    });
    return [token, kind, owner];
  }
  if (
    props.Burn === true ||
    props.Mint === true ||
    (props.Puase === true && props.Permit === false && props.cap === "")
  ) {
    const SuperERC20 = await generateCantract(
      tokenGenerator4Address,
      tokenGenerator4ABI,
      signer
    );
    let kind, token, owner;
    SuperERC20.on("TokenDeployed", (_owner, _token, _kind, _event) => {
      if (_owner === signer.address) {
        token = _token;
        kind = _kind;
        owner = _owner;
      }
      console.log(`owner:${_owner}\ntoken:${_token}\nkind:${_kind}`);
      console.log(_event);
    });
    const tx = await SuperERC20.generateSuperERC20(
      props.name,
      props.symbol,
      props.supply,
      props.Mint,
      props.Burn,
      props.Puase,
      salt
    );
    await tx.wait();
    SuperERC20.off("TokenDeployed", (owner, token, kind, event) => {
      console.log(`owner:${owner}\ntoken:${token}\nkind:${kind}`);
      console.log(event);
    });
    return [token, kind, owner];
  }
};
