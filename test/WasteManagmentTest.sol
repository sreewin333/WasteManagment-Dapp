// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {Test, console} from "forge-std/Test.sol";
import {WasteManagment} from "../src/WasteManagment.sol";
import {WasteManagmentDeployer} from "../script/WasteManagmentDeployer.sol";

contract WasteManagmentTest is Test {
    WasteManagment wastemanagment;

    function setUp() external {
        WasteManagmentDeployer deployer = new WasteManagmentDeployer();
        wastemanagment = deployer.run();
    }

    //This function tests only the owner can add the company address
    function testOnlyOwnerCanAddCompany() public {
        address FakeOwner = makeAddr("FakeOwner");
        vm.expectRevert();
        vm.prank(FakeOwner);
        wastemanagment.addCompany(FakeOwner);
    }

    //This function tests the owner of the Contract.
    function testOwner() public view {
        assert(wastemanagment.getowner() == msg.sender);
        console.log(wastemanagment.getowner());
    }

    //This function tests the addCompanyDetails function.
    function testaddCompanyWorks() public {
        address company = makeAddr("company");
        vm.prank(msg.sender);
        wastemanagment.addCompany(company);
        vm.prank(company);
        wastemanagment.addCompanyDetails(
            company,
            "sneha pvt ltd",
            "industry",
            "trivandrum",
            2,
            "plastic",
            "disposed"
        );
    }

    //This function tests the addCompany function reverts if the caller is not added in the companyAddresses array
    function testaddCompanyReverts() public {
        address Fakecompany = makeAddr("Fakecompany");
        address company = makeAddr("company");
        vm.prank(msg.sender);
        wastemanagment.addCompany(company);
        vm.expectRevert();
        vm.prank(Fakecompany);
        wastemanagment.addCompanyDetails(
            company,
            "sneha pvt ltd",
            "industry",
            "trivandrum",
            2,
            "plastic",
            "disposed"
        );
    }

    //This function tests the increment of the unique number

    function testuniqueNumberIncrements() public {
        address company = makeAddr("company");
        vm.prank(msg.sender);
        wastemanagment.addCompany(company);

        vm.prank(company);
        wastemanagment.addCompanyDetails(
            company,
            "sneha pvt ltd",
            "industry",
            "trivandrum",
            2,
            "plastic",
            "not disposed"
        );
        assert(wastemanagment.UniqueNumber() == 1);
    }

    //This function tests for the addCompanyDetails function reverts when the address is wrong.

    function testcallrevertsWhenAddressIsWrong() public {
        address Fakecompany = makeAddr("Fakecompany");
        address company = makeAddr("company");
        vm.prank(msg.sender);
        wastemanagment.addCompany(company);
        vm.prank(msg.sender);
        wastemanagment.addCompany(Fakecompany);

        vm.expectRevert();
        vm.prank(Fakecompany);
        wastemanagment.addCompanyDetails(
            company,
            "sneha pvt ltd",
            "industry",
            "trivandrum",
            2,
            "plastic",
            "disposed"
        );
    }
}
