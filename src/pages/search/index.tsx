import Layout from '@/components/Layout'
import LoadingAnimated from '@/components/loading/LoadingAnimated'
import NoDataGIF from '@/components/loading/NoDataFound'
import RecommendedCoaches from '@/components/recommended-coaches/RecommendedCoaches'
import ServicesFilter from '@/components/search-filter/ServicesFilter'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import { AppState } from '@/redux/types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DotLoader, PulseLoader } from 'react-spinners'
import { useInView } from 'react-intersection-observer'
import { IServicesFilter } from '@/types/userInterface'
import moment from 'moment'
import { getServicesFilter, resetServicesFilterData, setServicesMetaParams } from '@/redux/actions/userActionTypes'
import { useRouter } from 'next/router'

type Props = {}

const Search = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()



  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: false
  }
  );
  const initialServiceParams = useMemo(
    () => ({
      page: 1,
    }),
    []
  );
  const searchServicesFilter = useSelector((state: AppState) => state.userData.searchServicesFilter)
  const servicesMetaParams = useSelector((state: AppState) => state.userData.servicesMetaParams)
  const isLoading = useSelector((state: AppState) => state.userData.searchServicesFilterLoader)
  const [searchQuery, setSearchQuery] = useState('');
  const [servicesListLength, setServicesListLength] = useState(0);
  const [pageRequested, setPageRequested] = useState(0);
  const [appointmentParams, setAppointmentParams] = useState(initialServiceParams);
  const [scrollValue, setScrollValue] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const [selectedRatingOptionsItems, setSelectedRatingOptionsItems] = useState([]);
  const [priceRangeHandler, setPriceRangeHandler] = useState<number | [number, number]>([0, 1000]);
  const [selecteSpecialization, setSelecteSpecialization] = useState([]);


  const [datetime12h, setDateTime12h] = useState<Date | null>(null);

  const formattedDate = moment(datetime12h)?.format('YYYY-MM-DD HH:mm:ss');

  useEffect(() => {
    if (router.isReady) {
      const filterPayload: IServicesFilter = {
        name: searchQuery,
        ratings: [],
        availability: formattedDate,
        start_price: 0,
        end_price: 1000,
        specialization: [],
        page: 1,
      };
      dispatch(getServicesFilter(filterPayload));
    }

    const metaParams = {
      meta_params: {
        current_page: 0,
        last_page: 0,
        path: "",
        per_page: 10,
        total_count: 0,
        nextPage: 0,
        hasMorePage: false,
      }
    }
    dispatch(setServicesMetaParams(metaParams))
    dispatch(resetServicesFilterData([]))
  }, [router])


  useEffect(() => {
    setServicesListLength(searchServicesFilter?.length);
  }, [searchServicesFilter]);


  useEffect(() => {
    if (
      inView === true &&
      servicesListLength < servicesMetaParams?.meta_params.total_count &&
      servicesMetaParams?.meta_params?.hasMorePage === true
      // Number(pageRequested) !== Number(servicesMetaParams?.meta_params?.nextPage)

    ) {
      setAppointmentParams((candidateParams: any) => {

        return { ...candidateParams, page: servicesMetaParams?.meta_params?.nextPage };
      });
      setScrollValue(true);
    }
  }, [inView, servicesMetaParams?.meta_params?.hasMorePage]);

  useEffect(() => {
    if (
      scrollValue === true &&
      // Number(pageRequested) !== Number(servicesMetaParams?.meta_params.nextPage) &&
      servicesMetaParams?.meta_params?.hasMorePage === true
    ) {
      setPageRequested(servicesMetaParams?.meta_params.nextPage);
      const filterPayload: IServicesFilter = {
        name: searchQuery,
        ratings: selectedRatingOptionsItems,
        availability: formattedDate,
        start_price: Array.isArray(priceRangeHandler) ? priceRangeHandler[0] : priceRangeHandler,
        end_price: Array.isArray(priceRangeHandler) ? priceRangeHandler[1] : priceRangeHandler,
        specialization: selecteSpecialization,
        page: appointmentParams?.page,
      };

      dispatch(getServicesFilter(filterPayload));
      setScrollValue(false);
    } else if (pageRequested === undefined) {
      setPageRequested(1);
    }
  }, [servicesMetaParams?.meta_params?.hasMorePage, servicesMetaParams?.meta_params.nextPage, dispatch,
    pageRequested, scrollValue, appointmentParams?.page]);
  console.log(selecteSpecialization, "formattedDate")

  return (
    <>


      <Layout>
        <TopNavbar />
        <div className='md:px-4 px-3 bg-white'>
          <ServicesFilter
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            appointmentParams={appointmentParams}
            setDateTime12h={setDateTime12h}
            datetime12h={datetime12h}
            setSelectedRatingOptionsItems={setSelectedRatingOptionsItems}
            selectedRatingOptionsItems={selectedRatingOptionsItems}
            priceRangeHandler={priceRangeHandler}
            setPriceRangeHandler={setPriceRangeHandler}
            setSelecteSpecialization={setSelecteSpecialization}
            selecteSpecialization={selecteSpecialization}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className='md:px-4 px-3 pt-3 border-t-[1px]'>
          <h1 className='section_title text-black py-3 ps-2'>
            {(searchQuery.length > 0 || selectedRatingOptionsItems.length > 0 || formattedDate !== "Invalid date" || selecteSpecialization.length > 0 || (Array.isArray(priceRangeHandler) && (priceRangeHandler[0] > 0 || priceRangeHandler[1] < 1000))) ?
              <>
                {!isLoading &&
                  <>
                    {servicesMetaParams?.meta_params?.total_count} result
                  </>
                }
              </>
              :
              "Recommended Services"
            }


          </h1>
          {isLoading &&
            <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
              <PulseLoader color='#FF5402' />
            </div>
          }
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pt-3 pb-10'>
              {searchServicesFilter.length > 0 && searchServicesFilter?.map((value, index) => {
                let isLast = false;
                if (index + 1 === servicesListLength) {
                  isLast = true;
                }
                return (
                  <div key={index}>
                    <RecommendedCoaches data={value} />
                    {isLast === true && <div className="h-25" ref={ref}></div>}
                  </div>
                )
              })}

            </div>

          </>

          {searchServicesFilter?.length == 0 && !isLoading &&
            <div className='pt-3'>
              <NoDataGIF loading={true} />
            </div>
          }
        </div>
      </Layout >

    </>
  )
}

export default Search


