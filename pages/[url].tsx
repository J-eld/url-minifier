import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'

interface URLProps {

}

const URL: React.FC<URLProps> = ({}) => {
        return (
            <></>
        );
}

export default URL

export const getServerSideProps: GetServerSideProps = async (context) => {
    const result = await axios.get(process.env.SERVER_URL + '/api/get-long-url/' + context.query.url)
    return {
        redirect: {
            permanent: false, 
            destination: result.data.longURL
        }
    }
}