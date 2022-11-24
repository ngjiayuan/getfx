import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Tab, Tabs } from "react-bootstrap";

export default function Index() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("CAD");
  const [redeemRate, setRedeemRate] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [key, setKey] = useState("redeem");

  const currencies = ["USD", "CAD"]

  async function getFx(from, to) {
    const response = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${from}`);
    const currRate = response.data.data.rates[to];
    if (key === "redeem") {
      setRedeemRate(currRate);
    } else {
      setPurchaseRate(currRate);
    }
  }

  return (
    <Container className="h-screen flex flex-column items-center justify-center">
      <Tabs
        defaultActiveKey="redeem"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="redeem" title="Redeem">
          <div className="bg-neutral-200 p-4 rounded-4 w-[350px]">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>From Currency</Form.Label>
                {/* <Form.Select disabled value={fromCurrency} onChange={(e) => setFromCurrency(e.currentTarget.value)}>
                  {currencies.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </Form.Select> */}
                <Form.Control 
                  disabled
                  defaultValue="USD"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>To Currency</Form.Label>
                {/* <Form.Select disabled value={toCurrency} onChange={(e) => setToCurrency(e.currentTarget.value)}>
                  {currencies.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </Form.Select> */}
                <Form.Control 
                  disabled
                  defaultValue="CAD"
                />
              </Form.Group>
              {redeemRate && <div className="flex justify-between"><span>Raw FX rate:</span><span ><b>{parseFloat(redeemRate).toFixed(5)}</b></span></div>}
              {redeemRate && <div className="flex justify-between"><span>Redeem rate - 40bp:</span><span ><b>{(parseFloat(redeemRate) * (1 - 0.004)).toFixed(5)}</b></span></div>}
              <br />
              <Button onClick={() => getFx(fromCurrency, toCurrency)}>
                Get Rate
              </Button>
            </Form>
          </div>
        </Tab>
        <Tab eventKey="purchase" title="Purchase">
          <div className="bg-neutral-200 p-4 rounded-4 w-[350px]">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>From Currency</Form.Label>
                {/* <Form.Select disabled value={fromCurrency} onChange={(e) => setFromCurrency(e.currentTarget.value)}>
                  {currencies.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </Form.Select> */}
                <Form.Control 
                  disabled
                  defaultValue="CAD"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>To Currency</Form.Label>
                {/* <Form.Select disabled value={toCurrency} onChange={(e) => setToCurrency(e.currentTarget.value)}>
                  {currencies.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </Form.Select> */}
                <Form.Control 
                  disabled
                  defaultValue="USD"
                />
              </Form.Group>
              {purchaseRate && <div className="flex justify-between"><span>Raw FX rate:</span><span ><b>{parseFloat(purchaseRate).toFixed(5)}</b></span></div>}
              {purchaseRate && <div className="flex justify-between"><span>Purchase rate + 40bp:</span><span ><b>{(parseFloat(purchaseRate) * (1 + 0.004)).toFixed(5)}</b></span></div>}
              <br />
              <Button onClick={() => getFx(fromCurrency, toCurrency)}>
                Get Rate
              </Button>
            </Form>
          </div>
        </Tab>
      </Tabs>
    </Container>
  )
}