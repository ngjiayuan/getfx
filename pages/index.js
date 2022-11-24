import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function Index() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("CAD");
  const [rate, setRate] = useState("")

  const currencies = ["USD", "CAD"]

  async function getFx(from, to) {
    const response = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${from}`);
    const currRate = response.data.data.rates[to];
    setRate(currRate);
  }

  return (
    <Container className="h-screen flex items-center justify-center">
      <div className="bg-neutral-200 p-4 rounded-4 w-[350px]">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>From Currency</Form.Label>
            <Form.Select disabled value={fromCurrency} onChange={(e) => setFromCurrency(e.currentTarget.value)}>
              {currencies.map((item, idx) => (
                <option key={idx}>{item}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>To Currency</Form.Label>
            <Form.Select disabled value={toCurrency} onChange={(e) => setToCurrency(e.currentTarget.value)}>
              {currencies.map((item, idx) => (
                <option key={idx}>{item}</option>
              ))}
            </Form.Select>
          </Form.Group>
          {rate && <div className="flex justify-between"><span>Raw FX rate:</span><span ><b>{parseFloat(rate).toFixed(5)}</b></span></div>}
          {rate && <div className="flex justify-between"><span>Purchase rate + 40bp:</span><span ><b>{(parseFloat(rate) * (1 + 0.004)).toFixed(5)}</b></span></div>}
          {rate && <div className="flex justify-between"><span>Redeem rate - 40bp:</span><span ><b>{(parseFloat(rate) * (1 - 0.004)).toFixed(5)}</b></span></div>}
          <br />
          <Button onClick={() => getFx(fromCurrency, toCurrency)}>
            Get Rate
          </Button>
        </Form>
      </div>
    </Container>
  )
}