const showEth = document.querySelector('.showEth');
const eth_amount = document.getElementById('Eth_amount');
const eth_withdrawal = document.getElementById('Eth_withdrawal');

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

var myContract = new web3.eth.Contract([
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "fund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "withdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
],'0x4887F776FC5A19A0E5c4276B1b6d5a378cF7e285');

async function showFunds(){
  myContract.methods.getBalance().call().then(function(number) {
    showEth.innerHTML = number;
  });
}

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
}

async function fund(){
  fundvalue = eth_amount.value;
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  myContract.methods.fund().send({from:account, value:fundvalue});
}

async function withdrawal(){
  withdrawalvalue = eth_withdrawal.value;
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  myContract.methods.withdrawal(withdrawalvalue).send({from:account});
}
