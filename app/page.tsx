"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [position, setPosition] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (position === null) return;

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ position }),
      });

      if (res.ok) {
        const prediction = await res.text();
        setResult(prediction);
      } else {
        setResult("Error making prediction");
      }
    } catch (error) {
      setResult("Error making prediction");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="w-[500px] flex flex-col items-center justify-center p-5 border border-slate-700 rounded-3xl">
        <h1 className="text-4xl font-extrabold">Salary Predictor</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full"
        >
          <Input
            type="number"
            placeholder="Enter Your Current Position"
            min={0}
            step="0.1"
            className="mt-5 border-slate-700 border rounded-xl text-xl w-full"
            value={position || ""}
            onChange={(e) => setPosition(parseFloat(e.target.value))}
          />
          <Button className="w-3/4 mt-5" type="submit">
            Submit
          </Button>
        </form>
        {result && <p className="mt-5 text-xl">Prediction: {result}</p>}
      </div>
    </div>
  );
}
