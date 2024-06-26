import React, { useRef } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { setCopmanyWalletLedgerLoader } from '@/redux/actions/comanyUserActions';

type Props = {
  setSearchQuery: any
  searchQuery: any;
  id?: any;
  paymentHistory?: boolean
}

const SearchModal = (props: Props) => {
  const op = useRef<OverlayPanel>(null);
  const dispatch = useDispatch()

  const { searchQuery, setSearchQuery, id, paymentHistory } = props

  const handleSearchClick = (e: any) => {
    if (op.current) {
      op.current?.toggle(e);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.currentTarget.value);
      op.current?.hide(); // Hide OverlayPanel
    }
  };

  const handleApplyClick = () => {
    if (paymentHistory && searchQuery.length > 0) {
      dispatch(setCopmanyWalletLedgerLoader(true))
    }
    const searchInput = document.getElementById('searchName') as HTMLInputElement | null; // Explicitly specify the type
    const searchValue = searchInput?.value ?? ''; // Use optional chaining to access value safely
    setSearchQuery(searchValue);
    op.current?.hide(); // Hide OverlayPanel
  };






  return (
    <div>
      <input
        onClick={handleSearchClick}
        placeholder='Search'
        className='border w-full p-2 rounded-[8px]'
        value={searchQuery}
      />
      <OverlayPanel ref={op}>
        <div className='mb-2'>
          <label htmlFor="searchName" className='text-[12px] font-medium text-black'>Search name</label>
        </div>
        <input
          id='searchName'
          placeholder='Search'
          className='border w-full p-2 rounded-[8px] text-black text-[12px]'
          onKeyPress={handleKeyPress}
          maxLength={30}
          autoFocus
        />
        <button className='btn btn-danger w-full btn-shadnow-danger mt-3 text-[14px] font-medium' onClick={handleApplyClick}>Apply</button>
      </OverlayPanel>
      <div className='absolute top-2 right-4 bg-white'>
        {searchQuery?.length > 0 ?
          <div onClick={() => setSearchQuery('')} className='cursor-pointer'>
            <IoMdClose size={25} color='#FF5402' />
          </div>
          :
          <IoSearchOutline size={25} />
        }

      </div>

    </div>
  )
}

export default SearchModal