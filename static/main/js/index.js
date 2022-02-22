const ethereumButton = document.querySelector('.enableEthereumButton');
const fundButton = document.querySelector('.fund');
const showEth = document.querySelector('.showEth');
const showAccount = document.querySelector('.showAccount');
const withdrawalButton = document.querySelector('.withdrawalButton');

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

showFunds();

ethereumButton.addEventListener('click', () => {
  getAccount();
});

fundButton.addEventListener('click', () => {
  fund();
});

withdrawalButton.addEventListener('click', () => {
  withdrawal();
});

async function showFunds(){
  myContract.methods.getBalance().call().then(function(number) {
    showEth.innerHTML = number;
  });
}

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}

async function fund(){
  fundvalue = fundForm.one.value;
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  myContract.methods.fund().send({from:account, value:fundvalue});
}

async function withdrawal(){
  withdrawalvalue = withdrawalForm.one.value;
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  myContract.methods.withdrawal(withdrawalvalue).send({from:account});
}
