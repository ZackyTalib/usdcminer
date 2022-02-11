import Head from "next/head";
import { useEffect, useState } from "react";

function Header(props: { walletConnected: boolean, connectWallet: () => void }) {
  return (
    <header className="items-center w-full pl-10 pr-10 sm:pl-16 sm:pr-16 md:pl-20 md:pr-20 lg:pl-24 lg:pr-24 xl:pl-28 xl:pr-28 pt-10 pb-8 flex justify-between">
      <div className="items-center flex">
        <img src="/images/logo.png" className="w-8 h-8 cursor-pointer" onClick={() => window.location.href = "/"} />
        <h2 className="font-bold text-lg ml-5">USDCMINER</h2>
      </div>
      <a onClick={props.walletConnected ? () => window.location.href = "#dashboard" : () => props.connectWallet()} className="hidden sm:block cursor-pointer hover:scale-105 transition-all font-semibold text-sm p-2.5 pl-6 pr-6 border border-gray-300 rounded-md">{props.walletConnected ? "Goto Dashboard" : "Connect Wallet"}</a>
    </header>
  )
}

function Hero(props: { walletConnected: boolean, connectWallet: () => void }) {
  return (
    <div className="mt-16 ml-10 mr-10 sm:ml-16 sm:mr-16 md:ml-20 md:mr-20 lg:ml-24 lg:mr-24 xl:ml-28 xl:mr-28 flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-1/2 pr-8 mt-16 lg:mt-0">
        <h3 className="mb-2.5 tracking-wider">SAFEST MINING GAME ON FANTOM</h3>
        <h1 className="font-bold text-5xl sm:text-6xl">Start Earning More <span className="text-blue-500">USDC</span></h1>
        <p className="mt-10 leading-7">
          You can earn extra money on your USDC by purchasing our miners. Our miners will give you a 1% ROI, which can be compounded to generate even higher returns. USDCMINER is the safest mining game on Fantom. Connect your wallet and start earning now!
        </p>
        <div className={props.walletConnected ? "hidden" : "" + " flex flex-col mt-10 mr-0 sm:mr-10"}>
          <label className="text-sm" htmlFor="refferal">Have a refferal link?</label>
          <input className="mt-2.5 text-sm p-3 border border-gray-300 rounded-md" type="text" name="refferal" placeholder="Enter refferal address..." />
        </div>
        <button onClick={props.walletConnected ? () => window.location.href = "#dashboard" : () => props.connectWallet()} className={(props.walletConnected ? "mt-16" : "mt-10") + " w-fit transition-all hover:scale-105 pl-6 pr-6 rounded-lg bg-blue-500 text-white font-bold p-4"}>{props.walletConnected ? "Goto Dashboard" : "Connect Wallet"}</button>
      </div>
      <img src="/images/hero.svg" className="w-full lg:w-1/2" />
    </div>
  )
}

function LinkCard(props: { name: string, description: string, img: string }) {
  return (
    <div className="text-center mr-6 ml-6 cursor-pointer hover:scale-105 transition-all flex flex-col items-center mb-12">
      <img src={props.img} className="stroke-white w-20 mb-6" />
      <h2 className="text-xl font-bold mb-2">{props.name}</h2>
      <p>{props.description}</p>
    </div>
  )
}

function LinkCards() {
  const linkCards = [
    { img: "/images/documentation.svg", name: "Documentation", description: "View our official gitbook documentation." },
    { img: "/images/discord.svg", name: "Discord", description: "Join our official discord server." },
    { img: "/images/scan.svg", name: "FTMScan", description: "View our Fantom blockchain entry." }
  ];
  return (
    <div className="flex-wrap items-center text-white mt-28 w-full p-20 pb-8 pl-0 pr-0 bg-gradient-to-r from-blue-500 to-blue-600 flex justify-evenly">
      {
        linkCards.map((card, iter) => <LinkCard key={iter} {...card} />)
      }
    </div>
  )
}

function DashboardLeft() {
  return (
    <div className="md:w-1/2">
      <h3 className="font-bold text-2xl mb-8">Your Miners</h3>
      <p>You have 0 miners</p>
      <form className="mt-8 flex flex-col">
        <label htmlFor="amount" className="text-sm mb-2.5">Enter USDC amount</label>
        <div className="flex items-center">
          <input className="text-sm w-72 flex-grow p-3 rounded-md border border-gray-300" name="amount" type="text" placeholder="1" />
          <p className="ml-4">USDC</p>
        </div>
        <button className="pl-12 pr-12 max-w-none md:max-w-xs hover:scale-105 transition-all mt-8 self-start p-3 bg-blue-500 text-white font-bold text-sm rounded-md">Buy Miners</button>
      </form>
    </div>
  )
}

function Timer(props: { time: number, completed: () => void }) {
  const [time, setTime] = useState(props.time);
  const complete = () => {
    props.completed();
    return 0;
  };
  useEffect(() => {
    const interval = setInterval(() => setTime(prev => (prev <= 0 ? complete() : prev - 1)), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-center rounded-md mt-12 p-5 bg-red-400 text-white">
      <p className="text-sm font-bold">Please wait before withdrawing/compounding again.</p>
      <p className="font-bold mt-5">{String(Math.floor(time / 3600)).padStart(2, "0")} : {String(Math.floor((time % 3600) / 60)).padStart(2, "0")} : {String((time % 3600) % 60).padStart(2, "0")}</p>
    </div>
  )
}

function DashboardRight() {
  const [countdown, setCountdown] = useState(true);
  return (
    <div className="md:w-1/2">
      <h3 className="font-bold text-2xl mb-8">Your USDC</h3>
      <p>You have ? USDC in your barrel</p>
      <p className="mt-1">You have ? USDC in your wallet</p>
      {
        countdown ?
          <Timer time={20} completed={() => setCountdown(false)} />
          :
          <div className="w-56 flex flex-col mt-8 max-w-none md:max-w-xs">
            <button className="w-full hover:scale-105 transition-all mt-4 self-start p-3 pl-0 pr-0 bg-blue-500 text-white font-bold text-sm rounded-md">Compound USDC</button>
            <button className="w-full hover:scale-105 transition-all mt-4 self-start p-3 pl-0 pr-0 bg-blue-500 text-white font-bold text-sm rounded-md">Pocket USDC</button>
          </div>
      }
    </div>
  )
}

function Dashboard() {
  return (
    <div className="m-24 mb-0 ml-10 mr-10 sm:ml-16 sm:mr-16 md:ml-20 md:mr-20 lg:ml-24 lg:mr-24 xl:ml-28 xl:mr-28" id="dashboard">
      <h2 className="font-bold text-4xl">Dashboard</h2>
      <p className="mt-6">Contract balance: ?</p>
      <p className="mt-1">Your referral address: ?</p>
      <div className="mt-12 flex flex-col md:flex-row">
        <DashboardLeft />
        <div className="border border-gray-300 ml-0 mr-0 md:mr-12 md:ml-12 lg:ml-20 lg:mr-20 mt-10 mb-10 md:mt-0 md:mb-0"></div>
        <DashboardRight />
      </div>
    </div>
  )
}

function UnconnectedDashboard(props: { connectWallet: () => void }) {
  return (
    <div className="m-24 mb-0 ml-10 mr-10 sm:ml-16 sm:mr-16 md:ml-20 md:mr-20 lg:ml-24 lg:mr-24 xl:ml-28 xl:mr-28">
      <h2 className="font-bold text-4xl">Dashboard</h2>
      <div className="mt-12 p-10 border border-gray-300 rounded-md">
        <p>Oh no! Looks like there isn't a wallet connected right now. In order to use USDCMINER, a USDC wallet needs to be connected. Please click the button below in order to connect your wallet and start using our dashboard!</p>
        <button onClick={() => props.connectWallet()} className="transition-all hover:scale-105 pl-8 pr-8 rounded-lg bg-blue-500 text-white font-bold p-3 mt-10 text-sm">Connect Wallet</button>
      </div>
    </div>
  )
}

function FooterLink(props: { title: string, items: { [name: string]: string; } }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold">{props.title}</h3>
      <div className="mt-3 flex flex-col mr-20">
        {
          Object.keys(props.items).map(item => <a href={props.items[item]} className="text-sm mb-0.5 transition-all hover:font-bold">{item}</a>)
        }
      </div>
    </div>
  )
}

function FooterLinks() {
  const links: { [category: string]: any } = {
    "Resources": {
      "About": "/privacypolicy",
      "Dashboard": "/termsofservice"
    },
    "Contact": {
      "Discord": "#",
      "Email": "#"
    },
    "Legal": {
      "Privacy Policy": "/privacypolicy",
      "Terms of Service": "/termsofservice"
    }
  }
  return (
    <div className="ml-16 lg:ml-20 xl:ml-24 flex flex-grow flex-wrap">
      {
        Object.keys(links).map(link => <FooterLink title={link} items={links[link]} />)
      }
    </div>
  )
}

function Footer(props: { walletConnected: boolean, connectWallet: () => void }) {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-600 text-white mt-28 pl-10 pr-10 sm:pl-16 sm:pr-16 md:pl-20 md:pr-20 lg:pl-24 lg:pr-24 xl:pl-28 xl:pr-28 pt-10 pb-8 flex">
      <header>
        <div className="flex items-center">
          <h3 className="font-bold">USDCMINER</h3>
        </div>
        <p className="mt-2 text-xs tracking-wider">SAFEST MINING GAME ON PHANTOM</p>
        <p className="text-sm mt-12">Copyright © 2022 USDCMINER</p>
      </header>
      <FooterLinks />
      <a onClick={props.walletConnected ? () => window.location.href = "#dashboard" : () => props.connectWallet()} className="hidden md:block text-center h-fit cursor-pointer hover:scale-105 transition-all font-semibold text-sm p-2.5 pl-6 pr-6 border border-gray-300 rounded-md">{props.walletConnected ? "Goto Dashboard" : "Connect Wallet"}</a>
    </footer>
  )
}

interface AccountProps {
  contractBalance: number,
  referralAddress: string,
  minersAmount: number,
  barrelUSDC: number,
  walletUSDC: number
}

export default function Home() {
  let [walletConnect, setWalletConnect] = useState(false);
  const connectWallet = () => {
    setWalletConnect(true);
  };
  return (
    <div>
      <Head>
        <title>USDCMINER</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="title" content="USDC Miner - Earn More USDC" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="You can earn extra money on your USDC by purchasing our miners. Our miners will give you a 1% ROI, which can be compounded to generate even higher returns. USDCMINER is the safest mining game on Fantom. Connect your wallet and start earning now!" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="USDC Miner - Earn More USDC" />
        <meta property="og:description" content="You can earn extra money on your USDC by purchasing our miners. Our miners will give you a 1% ROI, which can be compounded to generate even higher returns. USDCMINER is the safest mining game on Fantom. Connect your wallet and start earning now!" />
        <meta property="og:image" content="/images/screenshot.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="USDC Miner - Earn More USDC" />
        <meta property="twitter:description" content="You can earn extra money on your USDC by purchasing our miners. Our miners will give you a 1% ROI, which can be compounded to generate even higher returns. USDCMINER is the safest mining game on Fantom. Connect your wallet and start earning now!" />
        <meta property="twitter:image" content="/images/screenshot.png" />
      </Head>
      <div>
        <Header walletConnected={walletConnect} connectWallet={connectWallet} />
        <main>
          <Hero walletConnected={walletConnect} connectWallet={connectWallet} />
          <LinkCards />
          {
            walletConnect ? <Dashboard /> : <UnconnectedDashboard connectWallet={connectWallet} />
          }
        </main>
        <Footer walletConnected={walletConnect} connectWallet={connectWallet} />
      </div>
    </div>
  )
}