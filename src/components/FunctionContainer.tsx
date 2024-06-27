"use client";

import { ContractWriteMethods } from "~~/app/debug/_components/contract/ContractWriteMethods";
import { Contract, ContractName } from "~~/utils/scaffold-eth/contract";

/**
 * This component is implemented for specific functions' ui.
 * It displays a form with inputs and a button to call either function on a specified contract.
 * Depending on the functionName prop, it shows different inputs and handles the contract call accordingly.
 */

interface FunctionContainerProps {
  contractName: ContractName;
  functionName: string;
  deployedContractData: Contract<ContractName>;
  onChange: () => void;
}

/**
 * FunctionContainer component
 * @param contractName - Contract name should be same as deployed contract name.
 * @param functionName - It should be same as deployed contract abi functions.
 * @returns A container for the selected function (mint or burn) with input fields and a submit button.
 */

const FunctionContainer = ({ contractName, functionName, deployedContractData, onChange }: FunctionContainerProps) => {
  const suffix = "token";

  const contractSymbol = contractName.toLowerCase().endsWith(suffix)
    ? contractName.slice(0, -suffix.length).toUpperCase()
    : contractName.toUpperCase();

  function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return (
    <>
      <div
        className="flex flex-col  justify-center items-center w-full h-auto"
        id={contractName + " " + functionName + " id"}
      >
        <div className="flex flex-col relative w-full min-w-[500px] max-sm:min-w-[350px] max-w-[650px] items-center justify-center">
          <div className="flex h-[5.5rem] w-full pr-1 bg-base-300 absolute self-start rounded-[22px] -top-[55px] -left-[1px] shadow-lg shadow-base-300">
            <h1 className="antialiased font-bold text-3xl max-md:text-2xl max-md:pt-1 bold m-2 text-center w-full">
              {functionName === "mint"
                ? "💵 Mint " + contractSymbol
                : functionName === "burn"
                ? "🔥 Burn " + contractSymbol
                : functionName === "transfer"
                ? "💸 Transfer " + contractSymbol
                : capitalizeFirstLetter(functionName) + " " + contractSymbol}
            </h1>
          </div>
          <div className="flex flex-col justify-center w-full z-10 p-7 divide-y bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 min-h-[250px]">
            <ContractWriteMethods
              deployedContractData={deployedContractData}
              functionName={functionName}
              onChange={onChange}
              nameFix={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FunctionContainer;
