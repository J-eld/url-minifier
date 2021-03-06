import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Header } from '../components/Header'
import { Body } from '../components/Body'

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  )
}

export default Home
