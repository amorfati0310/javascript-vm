import {VendingMachineView} from '../js/VendingMachineView.js';
import {getEl, getElAll} from '../js/utils.js';
import {templateMock} from './templateMock.js';

describe('VendingMachineView Test', () => {
  let vendingMachineView;
  beforeEach(()=>{
    document.body.innerHTML = templateMock.trim()
    vendingMachineView = new VendingMachineView()
    // console.log('test',gs('.money-button-list') === vendingMachineView.moneyButtonListEl)
    vendingMachineView.bindEvents();
    vendingMachineView.controller = {}
    vendingMachineView.controller.on = (evtName, data)=> {evtName, data} 
  })
  test('vendingMachine View 돈 입력된 만큼 insertMoney표시 된다.', () => {
  
     //given
    const vendingMachineMoney = 1000;
    //when
    vendingMachineView.updateViewVendingMachineMoney(vendingMachineMoney)

    //then
    const loggedMoney = Number(vendingMachineView.insertedMoneyEl.innerText)
    expect(loggedMoney).toBe(vendingMachineMoney)
   });

   test('vendingMachine View 돈 입력된 만큼 살 수 있는 목록을 하이라이트 시켜준다.', () => {
  
    //given
   const vendingMachineMoney = 1000;
   //when
   vendingMachineView.displayCanBuyList(vendingMachineMoney)
   const getList =vendingMachineView.getCanBuyList(vendingMachineMoney)
  
   //then
   expect( getList.length ).toBe(getElAll('.red').length)
  });

  test('vendingMachineView number Button Click시 timer메소드가 불린다.', () => {
  
    //given
   const vendingMachineMoney = 1000;
    vendingMachineView.startTimer = jest.fn();
    const mockButton = getEl('button')

   //when
   vendingMachineView.handleNumberBtnClicked(mockButton)
  
   //then
   expect(vendingMachineView.startTimer).toHaveBeenCalled()
  });
  
  test('누적된 버튼 텍스트를 최근 두자리를 저장한다.', () => {
  
    //given
    vendingMachineView.updateLogView = jest.fn();
    const mocktemplate = `
                    <button class="mock-1">1</button>
                    <button class="mock-2">2</button>
                    <button class="mock-3">3</button>
                    `
    document.body.insertAdjacentHTML('beforeend' , mocktemplate)
   

   //when

  //  console.log(getEl('.mock-1').innerText) 
   
    // undefined 나옴 .... domMethod로 test하기 어려운 상황 mockData를 통해서 test
   const mock1 = {
     innerText : '1'
   }
   const mock2 = {
    innerText : '2'
  }
  const mock3 = {
    innerText : '3'
  }
   vendingMachineView.handleNumberBtnClicked(mock1)
   vendingMachineView.handleNumberBtnClicked(mock2)
   vendingMachineView.handleNumberBtnClicked(mock3)
  // vendingMachineView.handleNumberBtnClicked(getEl('.select-button'))
  //  vendingMachineView.handleNumberBtnClicked(getEl('.mock-2'))
  //  vendingMachineView.handleNumberBtnClicked(getEl('.mock-3'))
  
   //then
   expect(vendingMachineView.updateLogView).toHaveBeenCalledWith("23", 'nowSelectedNumber')
  });


  
  // 비동기 test 

  test('startTimer 시작하면 setInterval 1초뒤 callback함수로 handleTime이 불린다. ', () => {
    
    //given
    jest.useFakeTimers();
    vendingMachineView.handleTime = jest.fn();
    vendingMachineView.startTimer()
   
    //when
    jest.advanceTimersByTime(1000);
    // jest.advanceTimersByTime(5000);
    //then
    expect(vendingMachineView.handleTime).toBeCalled();


    });

    test('startTimer 시작뒤 6초뒤에는 자동으로 handleChose 선택 method가 불린다.', () => {
    
      // 버튼 클릭후 1초뒤에 초가 불리므로 !
      //given
      jest.useFakeTimers();
      vendingMachineView.clearSelectedInfo()
      vendingMachineView.handleChoseBtnClicked = jest.fn();
      vendingMachineView.startTimer()
     
      //when
      jest.advanceTimersByTime(6000);
      //then
      expect(vendingMachineView.handleChoseBtnClicked).toBeCalled();
  
  
      });

});
