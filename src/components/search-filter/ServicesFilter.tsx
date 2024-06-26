import React, { useEffect, useRef, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FaStar } from 'react-icons/fa';
import { Slider } from "primereact/slider";
import { Calendar } from 'primereact/calendar';
import HistoryFilter from './HistoryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesFilter, resetServicesFilterData, setServicesMetaParams } from '@/redux/actions/userActionTypes';
import { IServicesFilter } from '@/types/userInterface';
import moment from 'moment';
import { AppState } from '@/redux/types';
import { setSearchHistory } from '@/redux/actions/userActionTypes';
import { ISetSearchHistory } from '@/types/providerServicesInterface';
import Image from 'next/image';

import { OverlayPanel } from 'primereact/overlaypanel';
import { IoCloseSharp } from 'react-icons/io5';


type Props = {
  searchQuery: any;
  setSearchQuery: any;
  appointmentParams: any;
  setDateTime12h: any;
  datetime12h: any;
  selectedRatingOptionsItems: any;
  setSelectedRatingOptionsItems: any;
  priceRangeHandler: any;
  setPriceRangeHandler: any;
  setSelecteSpecialization: any;
  selecteSpecialization: any;
  selectedCategory: any;
  setSelectedCategory: any;
};

const ServicesFilter = (props: Props) => {

  const dispatch = useDispatch()
  const op = useRef<OverlayPanel>(null);

  const searchHistory = useSelector((state: AppState) => state.userData.searchHistory)

  const { searchQuery, setSearchQuery, setDateTime12h, datetime12h, selectedRatingOptionsItems, setSelectedRatingOptionsItems,
    priceRangeHandler, setPriceRangeHandler, setSelecteSpecialization, selecteSpecialization , setSelectedCategory, selectedCategory} = props

  const [priceRange, setPriceRange] = useState<number | [number, number]>([0, 1000]);

  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = moment(datetime12h)?.format('YYYY-MM-DD HH:mm:ss');


  const handleSearchClick = (e: any) => {
    if (op.current) {
      op.current?.toggle(e);
    }
  };


  const specializationOptions = [
    { label: "Coach", value: "3" },
    { label: "Financial Advisor", value: "4" },
    { label: "Pastoral Care", value: "2" },
    { label: "Spiritual Director", value: "1" },
  ]
    ;


  const ratingOptions = [
    { value: "5", label: <><FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#FFA500' /></> },
    { value: "4", label: <><FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#E1E1E1' /></> },
    { value: "3", label: <><FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#E1E1E1' /> <FaStar color='#E1E1E1' /></> },
    { value: "2", label: <><FaStar color='#FFA500' /> <FaStar color='#FFA500' /> <FaStar color='#E1E1E1' /> <FaStar color='#E1E1E1' /> <FaStar color='#E1E1E1' /></> },
    { value: "1", label: <><FaStar color='#FFA500' /> <FaStar color='#E1E1E1' /> <FaStar color='#E1E1E1' /> <FaStar color='#E1E1E1' /> <FaStar color='#E1E1E1' /></> },
  ];


  const clearAllFilters = () => {
    setSearchQuery('');
    setSelecteSpecialization([]);
    setSelectedRatingOptionsItems([]);
    setPriceRange([0, 1000]);
    setPriceRangeHandler([0, 1000]);
    setDateTime12h(null);
  };


  const priceRangeDropdown = () => {
    setIsOpen(!isOpen);
  };
  const priceRangeApply = () => {
    setIsOpen(!isOpen);
    setPriceRangeHandler(priceRange)
  };

  const filterServices = () => {
    const searchHistory: ISetSearchHistory = {
      name: "",
      ratings: [],
      availability: [],
      start_price: "0",
      end_price: "0",
      specialization: [],
    }

    dispatch(setSearchHistory(searchHistory));
    dispatch(resetServicesFilterData([]))

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

    const filterPayload: IServicesFilter = {
      name: searchQuery,
      ratings: selectedRatingOptionsItems,
      availability: formattedDate,
      start_price: Array.isArray(priceRangeHandler) ? priceRangeHandler[0] : priceRangeHandler,
      end_price: Array.isArray(priceRangeHandler) ? priceRangeHandler[1] : priceRangeHandler,
      specialization: selecteSpecialization,
      page: 1,
    };
    dispatch(getServicesFilter(filterPayload));
  };

  useEffect(() => {
    dispatch(resetServicesFilterData([]))
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
    // Trigger filtering when any of the dependencies change
    filterServices();
  }, [searchQuery, selectedRatingOptionsItems, datetime12h, priceRangeHandler, selecteSpecialization]);

  // Check if any filter is applied
  const isAnyFilterApplied = (
    searchQuery !== '' ||
    selecteSpecialization.length > 0 ||
    selectedRatingOptionsItems.length > 0 ||
    (Array.isArray(priceRangeHandler) ? priceRangeHandler[0] !== 0 || priceRangeHandler[1] !== 1000 : priceRangeHandler !== 0) ||
    datetime12h !== null
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.currentTarget.value);
      op.current?.hide(); // Hide OverlayPanel
    }
  };
  const handleApplyClick = () => {
    const searchInput = document.getElementById('searchName') as HTMLInputElement | null; // Explicitly specify the type
    const searchValue = searchInput?.value ?? ''; // Use optional chaining to access value safely
    setSearchQuery(searchValue);
    op.current?.hide(); // Hide OverlayPanel
  };
 
  const groupedCities = [
      {
          name: 'Germany',
          // code: 'DE',
          itemsTesting: [
              { name: 'Berlin', value: 'Berlin' },
              { name: 'Frankfurt', value: 'Frankfurt' },
              { name: 'Hamburg', value: 'Hamburg' },
              { name: 'Munich', value: 'Munich' }
          ]
      },
      {
          name: 'USA',
          // code: 'US',
          itemsTesting: [
              { name: 'Chicago', value: 'Chicago' },
              { name: 'Los Angeles', value: 'Los Angeles' },
              { name: 'New York', value: 'New York' },
              { name: 'San Francisco', value: 'San Francisco' }
          ]
      },
      {
          name: 'Japan',
          // code: 'JP',
          itemsTesting: [
              { name: 'Kyoto', value: 'Kyoto' },
              { name: 'Osaka', value: 'Osaka' },
              { name: 'Tokyo', value: 'Tokyo' },
              { name: 'Yokohama', value: 'Yokohama' }
          ]
      }
  ];
  console.log(selectedCategory, "selectedCategory");
  
  const groupedItemTemplate = (option: any) => {
      return (
          <div className="flex align-items-center">
               <div>{option.name}</div>
          </div>
      );
  };


  return (
    <div className=''>
      <></>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 py-2 md:pe-2">
          <input
            onClick={handleSearchClick}
            placeholder='Search...'
            className='border w-full p-2 rounded-[8px]'
            value={searchQuery}
          />
          <OverlayPanel ref={op}>
            <div className='mb-2'>
              <label htmlFor="searchName" className='text-[12px] font-medium text-black'>Search name</label>
            </div>
            <input
              id='searchName'
              placeholder='Search...'
              maxLength={20}
              className='border w-full p-2 rounded-[8px] text-black text-[12px]'
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <button className='btn btn-danger w-full btn-shadnow-danger mt-3 text-[14px] font-medium' onClick={handleApplyClick}>Apply</button>
          </OverlayPanel>


        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 py-2 md:pe-2 ">
          <Calendar
            onChange={(e) => setDateTime12h(e.value as Date)}
            hourFormat="12"
            dateFormat="M d, yy "
            placeholder="Availability"
            value={datetime12h || null} // Set initial value to null
          />

        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 py-2 md:pe-2">
          {/* <MultiSelect
            value={selecteSpecialization}
            onChange={(e) => setSelecteSpecialization(e.value)}
            options={specializationOptions}
            optionLabel=""
            filter
            placeholder="Specialization"
            showSelectAll={false}
            maxSelectedLabels={0}
            className="border w-full rounded-[8px]"
          /> */}
          <MultiSelect value={selectedCategory} options={groupedCities} onChange={(e) => setSelectedCategory(e.value)} optionLabel="name"
            optionGroupLabel="name" optionGroupChildren="itemsTesting" optionGroupTemplate={groupedItemTemplate}
            placeholder="Select Cities" maxSelectedLabels={0} className="border w-full rounded-[8px]" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 py-2 md:pe-2 rating-dropdown">
          <MultiSelect
            value={selectedRatingOptionsItems}
            onChange={(e) => setSelectedRatingOptionsItems(e.value)}
            options={ratingOptions}
            optionLabel=""
            filter={false}
            showClear={false}
            placeholder="Rating"
            showSelectAll={false}
            maxSelectedLabels={0}
            className="border w-full rounded-[8px]"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 py-2 md:pe-2">
          <div className="">
            <div className="relative"
            >
              <span
                onClick={priceRangeDropdown}
                className="px-2 py-2 w-full border text-[#868686] rounded-[8px] flex justify-between cursor-pointer placeholder-text"
              >
                Price Range
                <span className="pt-1"><svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-icon p-multiselect-trigger-icon p-c" aria-hidden="true" data-pc-section="triggericon"><path d="M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z" fill="currentColor"></path></svg></span>
              </span>

              {isOpen && (
                // <OverlayPanel ref={range} className='box-range'>
                <div className='box-range'>
                  <div className="menu_box p-4 relative">
                    <div>
                      <p className='text-[#B2B2B2] text-[14px] font-medium pb-2'><span className='w-[50px] inline-block'>From: </span><span className='text-black text-[14px] '>${Array.isArray(priceRange) ? priceRange[0] : priceRange}.00</span></p>
                      <p className='text-[#B2B2B2] text-[14px] font-medium'><span className='w-[50px] inline-block'>To:</span> <span className='text-black text-[14px]'>${Array.isArray(priceRange) ? priceRange[1] : priceRange}.00</span></p>
                    </div>
                    <div className='px-3 py-5'>
                      <Slider value={priceRange} onChange={(e) => setPriceRange(e.value)} className="bg-[#F1F1F1] w-full"
                        range
                        min={0}
                        max={1000}
                      />
                    </div>
                    <div>
                      <button className='btn btn-danger w-full mt-3' onClick={() => priceRangeApply()}>Apply</button>
                    </div>
                    <div className='absolute right-2 top-2' onClick={() => setIsOpen(false)}>
                      <IoCloseSharp color="#FF5402" size={25} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      {isAnyFilterApplied && (
        <div className='border-t-[1px] flex items-center'>
          <div className='lg:w-11/12 md:w-9/12 w-9/12'>
            <div className='inline'>
              <HistoryFilter historyData={searchHistory} setSearchQuery={setSearchQuery} setPriceRangeHandler={setPriceRangeHandler} setDateTime12h={setDateTime12h} specializationOptions={specializationOptions} setSelecteSpecialization={setSelecteSpecialization} setSelectedRatingOptionsItems={setSelectedRatingOptionsItems} />
            </div>
          </div>
          <div className='lg:w-1/12 md:w-3/12 w-3/12 z-30 md:px-5'>
            <span className='text-[13px] flex items-center cursor-pointer justify-end' onClick={clearAllFilters}>
              <Image src={'/images/icons/deleter_icon.svg'} className='min-w-[15px]' width={15} height={15} alt='delete icon' />

              <span className='ps-2 text-nowrap '>Clear All</span>
            </span>
          </div>
        </div>
      )}
    </div >
  )
}

export default ServicesFilter