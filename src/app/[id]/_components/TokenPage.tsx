"use client";

import { useReducer } from "react";
import SideBar from "../../../components/SideBar";
import FunctionContainer from "./FunctionContainer/FunctionContainer";
import { TransactionsTable } from "./Transactions/TransactionTable";
import { useDeployedContractInfo, useTargetNetwork } from "~~/hooks/scaffold-eth";
import { Contract, ContractName } from "~~/utils/scaffold-eth/contract";

interface TokenPageProps {
  contractName: ContractName;
}

/**
 * FunctionContainer component
 * @param contractName - Contract name should be same as deployed contract name.
 * @returns
 */

const TokenPage = ({ contractName }: TokenPageProps) => {
  const [refreshDisplayVariables, triggerRefreshDisplayVariables] = useReducer(value => !value, false);
  const { targetNetwork } = useTargetNetwork();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName) as {
    data: Contract<ContractName>;
    isLoading: boolean;
  };

  if (deployedContractLoading) {
    return (
      <div className="mt-[15rem] w-full min-h-full flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!deployedContractData) {
    return (
      <p className="text-3xl mt-14">
        {`No contract found by the name of "${contractName}" on chain "${targetNetwork.name}"!`}
      </p>
    );
  }

  const functionNames = ["mint", "burn"];
  return (
    <div className="flex md:flex-row flex-col flex-1">
      <SideBar
        contractName={contractName}
        refreshDisplayVariables={refreshDisplayVariables}
        deployedContractData={deployedContractData}
      />
      <div className={`2xl:px-6 lg:px-2 px-0 lg:gap-10 2xl:gap-12 my-0 mt-2 flex-1`}>
        <div className="h-full grid grid-cols-1 xl:grid-cols-7 2xl:grid-cols-9 gap-3 lg:gap-5 2xl:gap-10">
          <div className="col-span-1  xl:col-span-4 2xl:col-span-5 flex flex-col">
            <div className="flex flex-1"></div>
            <div className="w-full flex flex-col relative z-50">
              <FunctionContainer
                functionNames={functionNames}
                contractName={contractName}
                deployedContractData={deployedContractData}
                onChange={triggerRefreshDisplayVariables}
              />
            </div>
          </div>

          <div className="col-span-1  xl:col-span-3 2xl:col-span-4 flex flex-col relative  max-h-screen mt-2">
            <h1 className="w-full lg:text-3xl text-xl bg-base-300 p-4 pl-6 antialiased font-semibold rounded-t-xl m-0">
              {contractName.toUpperCase()} Transactions
            </h1>
            <TransactionsTable deployedContractData={deployedContractData} contractName={contractName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;
