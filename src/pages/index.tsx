import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { AppState } from '@/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { api } from '@/api-config/api'
import { IProviderService } from '@/types/providerServicesInterface'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import WelcomePage from '@/components/welcome-page/WelcomePage'
import { IServicesFilter, Roles } from '@/types/userInterface'
import CompanyWelcomePage from '@/components/company/CompanyWelcomePage'
import { verifyLink } from '@/redux/actions/comanyUserActions'
import { PulseLoader } from 'react-spinners'
import { getServicesFilter } from '@/redux/actions/userActionTypes'

interface HomeProps {
  servicesListData: IProviderService[];
}
export default function Home({ servicesListData }: HomeProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const userProfile = useSelector((state: AppState) => state.userData.userProfile)
  const verifyLinkLoader = useSelector((state: AppState) => state.company.verifyLinkLoader)
 
  const verifyToken = router.query

  useEffect(() => {
    if (userProfile.isAuth) {
      if (userProfile?.name?.length === undefined || userProfile?.name?.length === null && userProfile.isAuth) {
        router.push('/personalinformation')
      }
    }
  }, [userProfile?.name])

  useEffect(() => {
    if (router.isReady) {
      if (verifyToken?.token) {
        let verifyLinkPaylod = {
          token: verifyToken?.token ?? ""
        }
        dispatch(verifyLink(verifyLinkPaylod))
      }
     
    }
  }, [router])

  // const initialFilterPayload = {
  //   name: '',
  //   ratings: [],
  //   availability: '',
  //   start_price: 0,
  //   end_price: 1000,
  //   specialization: [],
  //   page: 1,
  // };

  // const [filterPayload, setFilterPayload] = useState(initialFilterPayload);

  // useEffect(() => {
  //   dispatch(getServicesFilter(filterPayload));
  // }, [filterPayload, dispatch]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setFilterPayload(prevPayload => ({
  //       ...prevPayload,
  //       page: 2,
  //     }));
  //   }, 2000);

  //   return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
  // }, []);

  

  return (
    <main
      className={`mx-auto min-h-screen`}
    >
       {verifyLinkLoader &&
        <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
          <PulseLoader color='#FF5402' />
        </div>
      }
      <Layout>
        <TopNavbar />
        {userProfile?.role !== Roles.COMPANY && 
          <WelcomePage servicesList={servicesListData} />
        }
        {userProfile?.role === Roles.COMPANY  && userProfile.isAuth &&
          <CompanyWelcomePage />
        }
      </Layout>
    </main>
  )


}

export async function getServerSideProps() {
  try {
    const res = await api.get(`services?page=1&per_page=20`);

    if (res.status !== 200) {
      throw new Error("Request failed with status " + res.status);
    }

    // Assuming the response data is JSON
    const servicesListData: IProviderService[] = res.data.data;

    return { props: { servicesListData } };

  } catch (error) {
    console.error(error);

    // Handle the error gracefully, you can choose to return an empty `testData` object or a custom error message
    return { props: { servicesListData: {} } };
  }
};
