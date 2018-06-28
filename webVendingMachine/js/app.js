// testCode
import { getEl, getElAll, updateText, addClassToList, removeClassToList, clearText } from'./util/utils.js'
import { VendingMachineModel } from'./model/VendingMachineModel.js'
import { WalletModel } from'./model/WalletModel.js'
import { Controller } from'./controller/Controller.js'
import { SnackListView } from './view/SnackListView.js'
import { VendingMachineView } from'./view/VendingMachineView.js'
import { WalletView } from './view/WalletView.js'
import { snackList, buttonTextList, myMoney} from'./assets/assets.js'
// template



const vendingMachine = new VendingMachineModel(snackList);
const wallet = new WalletModel(myMoney);
const vendingMachineView = new VendingMachineView();
const walletView = new WalletView();
const snackListView = new SnackListView();

const model = {
  wallet,
  vendingMachine,
}
const view = {
  vendingMachineView,
  walletView,
  snackListView,
}
const vendingMachineController = new Controller(model, view);

document.addEventListener("DOMContentLoaded", (e)=> {
  console.log("DOM fully loaded and parsed");
  // rendering 
  walletView.initRender(myMoney,wallet.getTotalMoney());
  vendingMachineView.initRender();
  snackListView.initRender(snackList)
});











