import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Timeline } from "react-ts-tradingview-widgets";
import { TickerTape } from "react-ts-tradingview-widgets";
import { fetchToken } from "../../Auth";
import { orderType } from "../../Feature/Order/orderSlice";
import { memoType } from "../../Feature/Order/orderSlice";

function Dashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState();

  const account = () => {
    console.log(item)
    fetch("https://flitchcoin.com/api/account", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    })
      .then((result) => result.json()
        .then(res => {

          // if we have to convert object to array we have to use Object.keys or Object.entries 
          // Object.keys will return keys of object 
          // Object.entries will return array of key with value
          // Object.values will return array of values of all keys

          const data = Object.entries(res.acc);
          let tempArray = [];
          data.map((items) => {
            for (let i = 0; i < 1; i++) {
              tempArray.push(items);
            }
          })
          setItem([...tempArray])
        })
      ).catch((err) => {
        console.log(err);
      })
  };
  const [temp, setTemp] = useState();

  useEffect(() => {
    console.log(temp);
    if (item === undefined) {
      setTemp(false)
    } else {
      setTemp(true)
    }
  }, [item])

  useEffect(() => {
    account();
  }, [])

  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);

  const table = () => {
    const out = [];
    const out1 = [];
    const out2 = [];
    const out3 = [];
    for (let index = 3; index < 24; index++) {
      out.push((item[index])[0]);
      out1.push((item[index])[1].total);
      out2.push((item[index])[1].used);
      out3.push((item[index])[1].yield);
    }
    setArr([...out]);
    setArr1([...out1]);
    setArr2([...out2]);
    setArr3([...out3]);
  }

  useEffect(() => {
    item && table();
  }, [temp === true]);

  const onRepayment = () => {
    dispatch(orderType("repayment"));
    dispatch(memoType("memoRepayment"));
    navigate("/order");
  };

  const onMargin = () => {
    dispatch(orderType("margin"));
    dispatch(memoType("memoMargin"));
    navigate("/order");
  }

  return (
    <>
      <TickerTape colorTheme="light" symbols={[
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "BTC/USD"
        },
        {
          "proName": "BITSTAMP:ETHUSDT",
          "title": "ETH/USDT"
        },
        {
          "proName": "BINANCE:SOLUSDT",
          "title": "SOL/USDT"
        },
        {
          "proName": "BINANCE:MATICUSDT",
          "title": "MATIC/USDT"
        },
        {
          "proName": "BINANCE:AVAXUSDT",
          "title": "AVAX/USDT"
        },
        {
          "proName": "BINANCE:XRPUSDT",
          "title": "XRP/USDT"
        },
      ]} ></TickerTape>
      <div className="container mt-4">
        <div className="row ms-1 mb-3">
          <div className="col-12 col-lg-7 card back mt-3 p-3">
            <div className="row">
              <div className="col-12 col-md-8">
                <h3>Balance Details</h3>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <button type='button' style={{ position: "relative" }} className='btn deposit btn-warning' onClick={() => navigate("/place_order")} >Deposit</button>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <button type='button' className='primary' style={{ position: "relative" }} onClick={() => (navigate('/withdraw'))} >Withdraw</button>
              </div>
            <hr />
            </div>
            <div className="row">
              <p className='text-muted'>Account Balance : </p>
              <h1>0.04487898<span className="balance ps-2">BTC</span></h1>
              <p className='text-muted'>Estimated Value : </p>
              <h3>$ 1,606.25</h3>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 card back manage_margin_2" >
            <Timeline colorTheme="light" feedMode="market" displayMode="compact" market="crypto" height={300} width="100%" symbol="BTCUSD" isTransparent></Timeline>
          </div>
        </div>
        </div>
        <div className="container card back mt-5 mb-3">
          <div className="row">
            <div className="col-2 text-muted account text-center p-3">Name</div>
            <div className="col-2 text-muted account text-center p-3">Liquidate</div>
            <div className="col-2 text-muted account text-center p-3">Total</div>
            <div className="col-2 text-muted account text-center p-3">Used</div>
            <div className="col-2 text-muted account text-center p-3">Yield</div>
            <div className="col-2 text-muted account text-center p-3">Duration</div>
          </div>
          <div className="row dashboard_table">
            <div className="col col-md-2 p-3">
              {arr.map(names => {
                return (
                  <>
                    <div className="row p-3">{names}</div>
                    <hr />
                  </>
                )
              })}
            </div>
            <div className='col col-md-2 p-3'>
              <div className='row ps-3 pb-1 memo_margin'>memoMargin</div>
              <button type='button' className='btn btn-dark margin-btn btn-sm' onClick={onMargin}>Add Margin</button>
              <hr />
            </div>
            <div className="col col-md-2 p-3">
              {arr1.map(names => {
                return (
                  <>
                    <div className="row p-3">{names}</div>
                    <hr />
                  </>
                )
              })}
            </div>
            <div className="col col-md-2 p-3">
              {arr2.map(names => {
                return (
                  <>
                    <div className="row p-3">{names}</div>
                    <hr />
                  </>
                )
              })}
            </div>
            <div className="col col-md-2 p-3">
              {arr3.map(names => {
                return (
                  <>
                    <div className="row p-3">{names}</div>
                    <hr />
                  </>
                )
              })}
            </div>
            <div className='col col-md-2 p-3'>
              <div className='row ps-3 pb-1 margin'>memoRepayment</div>
              <button type='button' className='btn btn-dark margin-btn btn-sm' onClick={onRepayment}>Repayment</button>
              <hr />
            </div>
          </div>
          </div>
    </>
  );
}

export default Dashboard;
