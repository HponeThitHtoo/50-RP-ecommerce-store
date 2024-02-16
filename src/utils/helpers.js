import _ from 'lodash';

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  // console.log(unique);
  // color is array, so unique is two dimensional array, so need to flat to one dimensional
  if (type === 'colors') {
    unique = unique.flat();
    // console.log(unique);
  }
  return ['all', ...new Set(unique)];
};

export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
};

// not used in this project
export const paginateOne = (data, itemsPerPage = 5) => {
  const pages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = Array.from({ length: pages }, (__, index) => {
    const start = index * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  });

  // console.log(paginatedData);
  return paginatedData;
};

export const paginateTwo = (data, page, limit = 5) => {
  const array = [];
  // console.log(data);
  if (data.length > 0) {
    for (let i = (page - 1) * limit; i < page * limit && data[i]; i += 1) {
      array.push(data[i]);
    }
  }
  return array;
};

export const returnPaginationRange = (totalPage, page, limit, siblings) => {
  const totalPageNoInArray = 7 + siblings;

  if (totalPageNoInArray >= totalPage) {
    return _.range(1, totalPage + 1);
  }

  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const rightSiblingsIndex = Math.min(page + siblings, totalPage);
  /* console.log(leftSiblingsIndex);
  console.log(rightSiblingsIndex);
  console.log(totalPage); */

  const showLeftDots = leftSiblingsIndex > 2;
  const showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, '...', totalPage];
  }
  if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings;
    // console.log(totalPage - rightItemsCount + 1);
    const rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, '...', ...rightRange];
  }
  const middleRanges = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
  return [1, '...', ...middleRanges, '...', totalPage];
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};
