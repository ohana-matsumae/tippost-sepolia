import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TipPostModule = buildModule("TipPostModule", (m) => {
  const tipPost = m.contract("TipPost");

  return { tipPost };
});

export default TipPostModule;