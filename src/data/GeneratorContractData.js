export const tokenGenerator1ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "kind",
        type: "string",
      },
    ],
    name: "TokenDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_premint",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_salt",
        type: "bytes32",
      },
    ],
    name: "generateStandardERC20",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_premint",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_mintable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_burnable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_pausable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_cap",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_salt",
        type: "bytes32",
      },
    ],
    name: "generateSuperERC20Capped",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const tokenGenerator2ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "kind",
        type: "string",
      },
    ],
    name: "TokenDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_premint",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_mintable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_burnable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_pausable",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "_salt",
        type: "bytes32",
      },
    ],
    name: "generateSuperERC20Permit",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const tokenGenerator3ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "kind",
        type: "string",
      },
    ],
    name: "TokenDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_premint",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_mintable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_burnable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_pausable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_cap",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_salt",
        type: "bytes32",
      },
    ],
    name: "generateUltimateERC20",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const tokenGenerator4ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "kind",
        type: "string",
      },
    ],
    name: "TokenDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_premint",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_mintable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_burnable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_pausable",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "_salt",
        type: "bytes32",
      },
    ],
    name: "generateSuperERC20",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const tokenGenerator1Address =
  "0xB9D91E138eC695d2Db2E6b6b07815C8a903aE441";
export const tokenGenerator2Address =
  "0x6eA07c6b923031eaa52F3f23a5EADAE8Ed49228A";
export const tokenGenerator3Address =
  "0xaa1E8a39FAe55656C4094599E48d4b14b0d474c1";
export const tokenGenerator4Address =
  "0x28cE35DCA1ce9EBAaC790a5641EB1a72595a3078";
