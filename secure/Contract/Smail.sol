pragma solidity >= 0.7.0 <0.9.0;

contract Smail {
    //mail ID
    uint256 mailID;
    //mail by receivers
    mapping(address=>uint256[]) mailReceived;
    //mail by sender
    mapping(address=>uint256[]) mailSent;

    //mail content by Id
    mapping(uint256=>string) mailContent;

    struct Profile {
        address id; //address hash
        string pubkey; //encrypt message content
    }

    //mapping profile
    mapping(address=>Profile) profiles;

    //mail sent event
    event sent(address indexed _from, address indexed _to, uint256 indexed _id, string _value);

    //@dev sent email to user
    function send(address _to, string memory _value) public {
        mailContent[mailID] = _value;
        mailReceived[_to].push(mailID);
        mailSent[msg.sender].push(mailID);
        emit sent(msg.sender, _to, mailID, _value);
        mailID = mailID+ 1;
    }
    //@dev set public key of user
    function setKey(string memory _key) public {
        profiles[msg.sender] = Profile(msg.sender, _key);
    }

    function getKey(address _address) public view returns (string memory) {
        return profiles[_address].pubkey;
    }

    function getReceived() public view returns (uint256[] memory) {
        return mailReceived[msg.sender];
    }

    function getSent() public view returns (uint256[] memory) {
        return mailSent[msg.sender];
    }

    function getMail(uint256 _mailid) public view returns (string memory) {
        return mailContent[_mailid];
    }

    function getProfiles(address address_hash) public view returns (Profile memory) {
        return profiles[address_hash];
    }
}