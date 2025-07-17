"use client";
import {
  Button,
  Card,
  Checkbox,
  Textarea,
  ToastToggle,
  ToggleSwitch,
} from "flowbite-react";
import { useEffect, useState } from "react";
import TopDownAnalysis from "./topDownAnalysis";
import ResultOfTopDownAnalysis from "./resultOfTopDownAnalysis";

export default function Home() {
  return (
    <div>
      <TopDownAnalysis />
      <ResultOfTopDownAnalysis />
    </div>
  );
}
