"use client";
import * as React from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionA from "./components/SectionA";
import SectionB from "./components/SectionB";
import Message from "./components/Message";
import Contact from "./components/Contact";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header />
            <Hero />
            <SectionA />
            <SectionB />
            <Message />
            <Contact />
        </main>
    );
}











