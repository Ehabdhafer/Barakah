import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import food from "../assets/food.png";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PostForm from "../components/PostForm";
import { useAuth } from "../hooks/Authcontext";

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Newest", href: "#", current: false },
  { name: "Longest shelf life", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "industry",
    name: "Providers",
    options: [
      { value: "Restaurant", label: "Restaurent", checked: false },
      { value: "Supermarket", label: "SuperMarket", checked: false },
      {
        value: "foodManufacturer",
        label: "Food Manufacturer",
        checked: false,
      },
      { value: "agriculture", label: "Agriculture", checked: false },
      { value: "caterer", label: "Caterer", checked: false },
      { value: "individual", label: "Indivisual", checked: false },
    ],
  },
  {
    id: "city",
    name: "City",
    options: [
      { value: "Amman", label: "Amman", checked: false },
      { value: "Zarqa", label: "Zarqa", checked: false },
      { value: "Irbid", label: "Irbid", checked: false },
      { value: "Aqaba", label: "Aqaba", checked: false },
      { value: "Karak", label: "Karak", checked: false },
      { value: "AlSalt", label: "AlSalt", checked: false },
      { value: "Ajloun", label: "Ajloun", checked: false },
      { value: "Jerash", label: "Jerash", checked: false },
      { value: "Maan", label: "Maan", checked: false },
      { value: "Altafila", label: "Altafila", checked: false },
    ],
  },
  {
    id: "free",
    name: "Free/Paid",
    options: [
      { value: "true", label: "Free", checked: false },
      { value: "false", label: "Paid", checked: false },
    ],
  },
  {
    id: "expired",
    name: "Expired",
    options: [{ value: "true", label: "Expired", checked: false }],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Filter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [donations, setDonations] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 15; // Set the number of products per page
  //   const [isAuthenticated, setIsAuthenticated] = useState(true); // Set this based on your authentication state
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState({
    industry: [],
    city: [],
    free: [],
    expired: [],
  });

  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);

  const handleFormClick = () => {
    if (isAuthenticated()) {
      // User is authenticated, show the modal
      setShowModal(true);
    } else {
      // User is not authenticated, show an alert
      Swal.fire({
        title: "Authentication Required",
        text: "Please log in or sign up to continue.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sign In",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#26577C", // Customize the confirm button color
        cancelButtonColor: "gray", // Customize the cancel button color
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to your login page or handle authentication flow
          navigate("/signin");
        }
      });
    }
  };

  const closeModal = () => {
    // Close the modal by setting showModal to false
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getdonation")
      .then((response) => {
        setDonations(response.data);
        setDisplayed(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Apply filters to the donations data
    let filteredData = [...donations];
    for (const filterType in selectedFilters) {
      if (selectedFilters[filterType].length > 0) {
        if (filterType == "free") {
          filteredData = filteredData.filter((post) =>
            selectedFilters[filterType][0].includes(post[filterType])
          );
        } else if (filterType == "expired") {
          filteredData = filteredData.filter((post) =>
            selectedFilters[filterType][0].includes(post[filterType])
          );
        } else {
          filteredData = filteredData.filter((post) => {
            console.log("original", post[filterType]);
            console.log("selected", selectedFilters[filterType]);
            return selectedFilters[filterType].includes(post[filterType]);
          });
        }
      }
      console.log("fffffffffffffff", filteredData);
    }

    // Sort the filtered data based on the selected sort option
    if (selectedSortOption.name === "Newest") {
      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedSortOption.name === "Longest shelf life") {
      filteredData.sort((a, b) => {
        if (!a.expiry_date && !b.expiry_date) {
          return 0; // If both items have null/undefined expiry_date, maintain their relative order
        }
        if (!a.expiry_date) {
          return 1; // Move items with null/undefined expiry_date to the end
        }
        if (!b.expiry_date) {
          return -1; // Keep items with null/undefined expiry_date at the end
        }
        return new Date(b.expiry_date) - new Date(a.expiry_date); // Compare dates for non-null/undefined expiry_date
      });
    } else if (selectedSortOption.name === "Price: Low to High") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption.name === "Price: High to Low") {
      filteredData.sort((a, b) => b.price - a.price);
    }

    // Update the displayed data based on the filtered results
    setDisplayed(filteredData);
    // Reset page number to 0 when filters change
    setPageNumber(0);
  }, [selectedFilters, selectedSortOption, donations]);

  const pageCount = Math.ceil(displayed.length / productsPerPage);
  const displayedProducts = displayed.slice(
    pageNumber * productsPerPage,
    (pageNumber + 1) * productsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    // Filter the donations based on the search term
    const searchResults = donations.filter((post) =>
      post.type.toLowerCase().includes(searchTerm)
    );

    // Update the displayedProducts state with the search results
    setDisplayed(searchResults);
  };

  const handleFilterChange = (filterType, value, checked) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (filterValue) => filterValue !== value
        );
      }
      return updatedFilters;
    });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl ">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-blue">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-blue"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200 ">
                    {/* <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-blue">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul> */}

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-blue hover:text-blue">
                                <span className="font-medium text-blue">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      value={option.value}
                                      type="checkbox"
                                      checked={selectedFilters[
                                        section.id
                                      ].includes(option.value)}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          section.id,
                                          option.value,
                                          e.target.checked
                                        )
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-blue focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-blue"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row items-end  justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-blue hidden sm:block  ">
              Posts
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-[254px] sm:w-[300px] md:w-[450px] lg:w-[500px] p-4 ps-10 text-sm h-11 text-gray-900 border border-blue rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Oil, Rice..."
                  onChange={handleSearch}
                  //required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-blue hover:text-blue">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-blue group-hover:text-blue"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-blue"
                                  : "text-blue",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => {
                                setSelectedSortOption(option);
                                // setMobileFiltersOpen(false); // Close the mobile filters dialog when a sort option is selected
                              }}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-blue hover:text-blue sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
              {/* Filters */}
              <form className="hidden lg:block">
                {/* <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-blue"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-blue hover:text-blue">
                            <span className="font-medium text-blue">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={selectedFilters[section.id].includes(
                                    option.value
                                  )}
                                  onChange={(e) =>
                                    handleFilterChange(
                                      section.id,
                                      option.value,
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-blue focus:ring-indigo-500"
                                />

                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-blue"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              {displayedProducts.length === 0 ? (
                <div className="flex flex-col   justify-center h-48 items-center mx-auto col-span-4 ml-[40%]  ">
                  <p className="text-blue text-2xl  font-semibold ">
                    No Matches Found
                  </p>
                  <p className="text-gray-500 text-xl mt-3  ">
                    Please try another search.
                  </p>
                </div>
              ) : (
                <div className="lg:col-span-5">
                  {/* Your content */}

                  <div className="flex flex-wrap gap-3 justify-around">
                    {displayedProducts.map((post) => (
                      <div
                        key={post.id}
                        className="max-w-xs w-full overflow-hidden shadow-lg mb-5 card-container"
                      >
                        <img
                          className="w-full h-32 object-cover"
                          src={post.imageurl}
                          alt="Food Image"
                        />
                        <div className="px-4 py-2 bg-white">
                          <Link to={`/details/${post.donation_id}`}>
                            <div className="font-bold text-sm mb-1 text-blue">
                              {post.type}
                            </div>
                          </Link>
                          <div className="text-gray-700 text-xs flex gap-1 mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4 inline-block"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                              />
                            </svg>

                            {post.city}
                          </div>
                          <p className="text-gray-700 text-xs mb-2">
                            Posted by: {post.username}
                          </p>
                          <div className="flex justify-between">
                            <p className="text-gray-700 text-xs flex justify-start">
                              {post.price} JOD
                            </p>
                            <p className="text-gray-700 text-xs flex justify-end">
                              {post.time.split()} / {post.date.split("T")[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ReactPaginate
                    className="flex flex-row gap-6 m-10 justify-center text-blue font-medium"
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName="active_page"
                  />

                  {/* <ReactPaginate
                  activeClassName={"item active_page "}
                  breakClassName={"item break-me "}
                  breakLabel={"..."}
                  containerClassName={"pagination"}
                  disabledClassName={"disabled-page"}
                  marginPagesDisplayed={2}
                  nextClassName={"item next "}
                  nextLabel={"next"}
                  onPageChange={handlePageClick}
                  pageCount={pageCount}
                  pageClassName={"item pagination-page "}
                  pageRangeDisplayed={5}
                  previousClassName={"item previous"}
                  previousLabel={"previous"}
                /> */}
                </div>
              )}
            </div>
          </section>
        </main>
        {/* Floating Add Post Button */}
        <button
          onClick={handleFormClick}
          className="fixed bottom-8 right-8 bg-orange text-white p-2 rounded-full shadow-md"
        >
          <PlusIcon className="h-10 w-10 font-bold" />
        </button>

        <PostForm showModal={showModal} onClose={closeModal} />
      </div>
    </div>
  );
}
