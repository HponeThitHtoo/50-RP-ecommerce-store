import React, { useState } from 'react';

import { useGearsFilterContext } from '../context/gearsFilterContext';

import GearsSort from '../components/GearsSort';
import GearsFilter from '../components/GearsFilter';
import GearList from '../components/GearList';

function Gears() {
  const { filteredGears } = useGearsFilterContext();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const totalPage = Math.ceil(filteredGears.length / limit);

  let pageNo = 1;

  if (totalPage > 0) {
    if (page <= totalPage) {
      pageNo = page;
    } else {
      setPage(totalPage);
      pageNo = page;
    }
  }

  const handlePageChange = (value) => {
    if (value === '&laquo;') {
      setPage(1);
    } else if (value === 'prev-group') {
      setPage((prevPage) => prevPage - 3);
    } else if (value === '&lsaquo;') {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === '&rsaquo;') {
      if (page !== totalPage) {
        setPage(page + 1);
      }
    } else if (value === 'next-group') {
      setPage((prevPage) => prevPage + 3);
    } else if (value === '&raquo;') {
      setPage(totalPage);
    } else {
      setPage(value);
    }
  };

  return (
    <section className="">
      <div className="bg-darkBackGroundTwo">
        <h1 className="py-14 font-oswald text-center text-3xl uppercase font-bold font-outline-1">
          gears
        </h1>
      </div>
      <div className="px-8 2xl:px-48 py-4 flex flex-col md:flex-row gap-3 bg-darkBackGround text-white">
        <GearsFilter />
        <div className="flex-1 space-y-3">
          <GearsSort
            totalPage={totalPage}
            page={pageNo}
            limit={limit}
            onPageChange={handlePageChange}
            onLimitChange={setLimit}
          />
          <GearList page={pageNo} limit={limit} />
        </div>
      </div>
    </section>
  );
}

export default Gears;
