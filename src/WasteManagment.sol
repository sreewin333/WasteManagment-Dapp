//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

//This is a smart contract to make Waste managment Transparent and decentralized
contract WasteManagment {
    address immutable owner;
    uint256 public UniqueNumber;

    constructor() {
        owner = msg.sender;
    }

    struct CompanyDetails {
        address companyAddress;
        string name;
        string industryOrGoverningBody;
        string location;
        uint256 weight;
        string Type;
        string status;
    }

    address[] public companyAddresses;
    //This is the mapping to fetch the CompanyDetails from the Unique Number.

    mapping(uint256 => CompanyDetails) public companyMapping;
    //This is the modifier to allow only the owner to add Company addresses.

    modifier onlyOwner() {
        require(owner == msg.sender, "Admin not Owner");
        _;
    }
    //This is the modifier to allow only the Company addresses to call a function.
    modifier OnlyCompany() {
        bool isCompany = false;
        for (uint256 i = 0; i < companyAddresses.length; i++) {
            if (companyAddresses[i] == msg.sender) {
                isCompany = true;
                break;
            }
        }
        require(isCompany, "Invalid Company Address!");
        _;
    }

    //This function Adds the company Addresses to the contract.
    function addCompany(address _address) public onlyOwner {
        companyAddresses.push(_address);
    }

    //This function is used by the Companies to update the information about the waste being generated .
    function addCompanyDetails(
        address _companyAddress,
        string memory _name,
        string memory _industryOrGoverningBody,
        string memory _location,
        uint256 _weight,
        string memory _type,
        string memory _status
    ) public OnlyCompany {
        require(msg.sender == _companyAddress, "Invalid Company Address");
        companyMapping[UniqueNumber] = CompanyDetails(
            _companyAddress,
            _name,
            _industryOrGoverningBody,
            _location,
            _weight,
            _type,
            _status
        );
        UniqueNumber++;
    }

    //Function to get the Owner
    function getowner() external view returns (address) {
        return owner;
    }

    //Function to get the length of the CompanyAddresses array.
    function getCompanyAddressLength() external view returns (uint256) {
        return companyAddresses.length;
    }

    //Function to retrieve the mapping details.
    function getMapping(
        uint256 i
    ) external view returns (CompanyDetails memory) {
        return companyMapping[i];
    }
}
