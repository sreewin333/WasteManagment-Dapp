//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;
import {Script} from "forge-std/Script.sol";
import {WasteManagment} from "../src/WasteManagment.sol";

contract WasteManagmentDeployer is Script {
    function run() external returns (WasteManagment) {
        vm.startBroadcast();
        WasteManagment wastemanagment = new WasteManagment();
        vm.stopBroadcast();
        return wastemanagment;
    }
}
