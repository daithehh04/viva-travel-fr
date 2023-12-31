'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import logo from '@/assets/images/logo.svg'
// import Button from '@mui/material/Button'
import star from '@/assets/images/star.svg'
import bookTourIcon from '@/assets/images/bookTourIcon.svg'

import SelectLang from '../Language/SelectLang'
import MenuDestinations from '@/components/Menu/Destinations'
import MenuStyle from '@/components/Menu/TravelStyle'
import MenuRcmService from '@/components/Menu/RecomendServices'
import bars from '@/assets/images/bars.svg'
import InputSearchMb from './InputSearchMb'
import MenuAbout from '../Menu/AboutUs/MenuAbout'
import MenuMb from '../Menu/MenuMb'
import planeF from '@/assets/images/planeF.svg'
import starF from '@/assets/images/starF.svg'
import HotDeal from './HotDeal'
import BookTour from './BookTour'
import ModalCustom from './ModalCustom'
import Button from './Button'
import { usePathname } from 'next/navigation'
import { createTheme, useMediaQuery } from '@mui/material'
import { DataProvider } from '../Menu/DataContextMenu'

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 1023
    }
  }
})
export default function Navbar({
  socialMobile,
  lang,
  dataHome,
  dataMenuCountry,
  travelStylesList,
  rcmServicesList,
  hotDeals,
  listVoucher,
  dataAboutUs,
  dataBookTour,
  dataTaxonomiesCountry,
  dataTaxonomiesStyleTour,
  dataTaxonomiesBudget,
  dataTaxonomiesDuration,
  contactInfo
}) {
  const arrDataTaxonomiesBudget = dataTaxonomiesBudget?.data?.allBudget?.nodes
  const arrDataTaxonomiesDuration = dataTaxonomiesDuration?.data?.allDuration?.nodes
  const arrDataTaxonomiesCountry = dataTaxonomiesCountry?.data?.allCountries?.nodes
  const arrDataTaxonomiesStyleTour = dataTaxonomiesStyleTour?.data?.allTourStyle?.nodes
  const refMb = useRef()
  const refMenu = useRef()
  const refNav = useRef()
  const refOverlay = useRef()
  const refBtnBookTour = useRef()
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const titleAboutUs = {
    whoWeAre: dataAboutUs?.wwrRes?.who_we_are?.banner?.title,
    ResTravel: dataAboutUs?.rtRes?.responsibleTravel?.banner?.title,
    AboutUs: dataAboutUs?.rvRes?.aboutUsReviews?.banner?.title
  }
  //check pathName
  const pathName = usePathname()
  const [openModal, setOpenModal] = useState(false)

  const [isTransparent, setIsTransparent] = useState(false)
  const pathNameMb = [
    'our-tours',
    'travel-style',
    'tours',
    'who-we-are',
    'responsible-travel',
    'review',
    'hot-deals/',
    'check-visa'
  ]
  const pathNamePc = ['tours']

  useEffect(() => {
    const nav = document.querySelector('.navbar')
    const menuItems = refMenu?.current?.querySelectorAll('.menu-item')
    const menuNavs = refMenu?.current?.querySelectorAll('.nav-link:has(.menu-item)')
    // check header transpent or not
    const isTrans = onlySmallScreen
      ? pathNameMb.some((item) => pathName.includes(item))
      : pathName.includes(pathNamePc) && !pathName.includes('our-tours')

    if (isTrans) {
      nav.classList.add('nav-mb-special')
    } else {
      nav.classList.remove('nav-mb-special')
    }

    //-------------------------
    window.addEventListener('scroll', function () {
      var scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (scrollPosition >= 200) {
        nav.classList.add('nav-active')
        nav.classList.remove('nav-mb-special')
        menuNavs.forEach((item, index) => {
          item.classList.remove('show')
        })
      } else {
        nav.classList.remove('nav-active')
        if (isTrans) {
          nav.classList.add('nav-mb-special')
        } else {
          nav.classList.remove('nav-mb-special')
        }
      }
    })
    // ===========================
    window.addEventListener('scroll', headerSticky)
    let lastScrolledPos = 0
    function headerSticky() {
      if (lastScrolledPos >= window.scrollY) {
        nav.classList.remove('header-hide')
        if (menuItems) {
          menuItems.forEach((item) => {
            item.style.display = 'block'
            refOverlay.current.style.display = 'block'
          })
        }
      } else {
        nav.classList.add('header-hide')
        if (menuItems) {
          menuItems.forEach((item) => {
            item.style.display = 'none'
            refOverlay.current.style.display = 'none'
          })
        }
      }
      lastScrolledPos = window.scrollY
    }

    menuItems?.forEach((item, index) => {
      var distance = menuNavs[index].getBoundingClientRect().left + menuNavs[index].clientWidth / 2
      item.style.transformOrigin = `${distance}px top`
    })
    menuNavs?.forEach((item, index) => {
      item.addEventListener('mouseover', function () {
        nav.classList.remove('nav-mb-special')
        item.classList.add('show')
        refOverlay.current.classList.add('active')
        menuItems[index].style.transition = 'all 0.5s'
      })
      item.addEventListener('mouseout', function () {
        item.classList.remove('show')
        refOverlay.current.classList.remove('active')
        if (pathName.includes('tours') && !pathName.includes('our-tours') && window.pageYOffset === 0) {
          nav.classList.add('nav-mb-special')
        } else {
          nav.classList.remove('nav-mb-special')
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, onlySmallScreen])

  const handleCloseMenu = () => {
    const menuLink = refMenu?.current?.querySelector('.nav-link.show')
    const menuItem = refMenu?.current?.querySelector('.nav-link.show .menu-item')

    if (menuItem && menuLink) {
      menuLink.classList.remove('show')
      menuItem.style.transition = 'none'
      refOverlay.current.classList.remove('active')
    }
  }
  const handleClickBars = () => {
    refMb.current.classList.add('active')
  }
  const handleClickClose = () => {
    refMb.current.classList.remove('active')
  }

  function handleTaxonomies(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item)
    })
    return newArrDataTaxonomies
  }
  const newArrDataTaxonomiesCountry = handleTaxonomies(arrDataTaxonomiesCountry)
  const newArrDataTaxonomiesStyleTravel = handleTaxonomies(arrDataTaxonomiesStyleTour)
  const newArrDataTaxonomiesBudget = handleTaxonomies(arrDataTaxonomiesBudget)
  const newArrDataTaxonomiesDuration = handleTaxonomies(arrDataTaxonomiesDuration)
  // ==============================================================
  const dataFilter = {
    countries: newArrDataTaxonomiesCountry,
    style: newArrDataTaxonomiesStyleTravel,
    budget: newArrDataTaxonomiesBudget,
    duration: newArrDataTaxonomiesDuration
  }

  const handleCloseNav = () => {
    if (refNav.current.classList.contains('nav-mb-special') && onlySmallScreen) {
      refNav.current.classList.remove('nav-mb-special')
    }
  }

  return (
    <DataProvider>
      <div className='nav-container'>
        <nav
          className={`bg-white w-[100vw] navbar h-[5.375vw] max-lg:h-[14.93vw]`}
          ref={refNav}
        >
          <div className='bg-trans flex items-center h-full w-full px-[8.125%] bg-white'>
            <div className='flex items-center gap-x-[2vw]'>
              <Link href={`/`}>
                <Image
                  src={logo}
                  width={100}
                  height={100}
                  alt='viva-travel'
                  className='nav-logo w-[3.5625vw] object-cover max-lg:w-[10.4vw]'
                />
              </Link>
              <div
                className='nav-list max-lg:hidden flex items-center gap-x-[2vw] mr-[6vw]'
                ref={refMenu}
              >
                <div className='relative flex-shrink-0'>
                  <div
                    className='capitalize text-[1vw] nav-link cursor-pointer'
                    menu={dataHome?.nav1}
                  >
                    <span>{dataHome?.nav1}</span>
                    <div className='menu-item'>
                      <MenuDestinations
                        data={dataMenuCountry}
                        lang={lang}
                        onCloseMenu={handleCloseMenu}
                      />
                    </div>
                  </div>
                  <span className='icon-hot absolute top-[-12px] right-[-6px] px-[10px] rounded-[99px] bg-primaryColor text-[12px]'>
                    Hot
                  </span>
                </div>
                <div
                  className='capitalize text-[1vw] nav-link cursor-pointer'
                  menu={dataHome?.nav2}
                >
                  <span>{dataHome?.nav2}</span>
                  <div className='menu-item '>
                    <MenuStyle
                      travelStylesList={travelStylesList}
                      lang={lang}
                      onCloseMenu={handleCloseMenu}
                    />
                  </div>
                </div>
                <Link
                  href={`/hot-deals`}
                  className='capitalize text-[1vw] nav-link cursor-pointer'
                  menu={dataHome?.nav3}
                  onClick={handleCloseMenu}
                >
                  <span>{dataHome?.nav3}</span>

                  <div className='hidden menu-item menu-item3'>
                    <HotDeal
                      hotDeals={hotDeals}
                      listVoucher={listVoucher}
                      menu
                      lang={lang}
                      onCloseMenu={handleCloseMenu}
                    />
                  </div>
                </Link>
                <Link
                  href={`/check-visa`}
                  className='capitalize text-[1vw] nav-link '
                  menu={dataHome?.nav4}
                >
                  <span>{dataHome?.nav4}</span>
                </Link>
                <div
                  className='capitalize text-[1vw] nav-link cursor-pointer'
                  menu={dataHome?.nav5}
                >
                  <span>{dataHome?.nav5}</span>
                  <div className='menu-item'>
                    <MenuAbout
                      dataAboutUs={dataAboutUs}
                      onCloseMenu={handleCloseMenu}
                      lang={lang}
                    />
                  </div>
                </div>
                <div
                  className='capitalize text-[1vw] nav-link cursor-pointer'
                  menu={dataHome?.nav6}
                >
                  <span>{dataHome?.nav6}</span>
                  <div className='menu-item'>
                    <MenuRcmService
                      rcmServicesList={rcmServicesList}
                      lang={lang}
                      onCloseMenu={handleCloseMenu}
                    />
                  </div>
                </div>
                <Link
                  href={`/blog`}
                  className='capitalize text-[1vw] nav-link cursor-pointer'
                  menu={dataHome?.nav7}
                >
                  <span>{dataHome?.nav7}</span>
                </Link>
              </div>
            </div>
            <div
              className='flex ml-auto max-lg:hidden'
              ref={refBtnBookTour}
              // onClick={handleOpenPopup}
              onClick={() => setOpenModal(true)}
            >
              <Button className='flex-shrink-0 btn-primary mr-[3.25vw]'>
                <Image
                  src={bookTourIcon}
                  width={50}
                  height={50}
                  alt='img'
                  className='w-[1.25vw] object-cover mr-[0.75vw]'
                />
                Book tour
              </Button>
            </div>
            {/* <div className='flex-shrink-0 max-lg:hidden'>
              <SelectLang lang={lang} />
            </div> */}
            <div className='flex-1 hidden max-lg:block'>
              <InputSearchMb
                lang={lang}
                dataFilter={dataFilter}
                onCloseNav={handleCloseNav}
              />
            </div>
            <Image
              src={bars}
              width={50}
              height={50}
              alt='bars'
              className={`w-[4.8vw] h-[2.93vw] ml-auto object-cover cursor-pointer hidden max-lg:block`}
              onClick={handleClickBars}
            />
          </div>
        </nav>
        <div
          className='menu-popup fixed inset-0 hidden overflow-x-hidden overflow-y-auto w-full h-full bg-white nav-mobile max-lg:block !z-[199] nav-mobile'
          ref={refMb}
        >
          <MenuMb
            dataHome={dataHome}
            socialMobile={socialMobile}
            onCloseMenu={handleClickClose}
            lang={lang}
            titleAboutUs={titleAboutUs}
            hotDeals={hotDeals}
            dataMenuCountry={dataMenuCountry}
            travelStylesList={travelStylesList}
            rcmServicesList={rcmServicesList}
            menu
            contactInfo={contactInfo}
          />
        </div>
        <div
          className={`${
            (pathName.includes('tours') && !pathName.includes('our-tours')) || pathName.includes('hot-deals/')
              ? 'max-md:hidden'
              : ''
          } books-footer h-[15.2vw] fixed bottom-0 left-0 right-0 z-[99] hidden max-md:flex`}
        >
          <Link
            href={`/search`}
            className='flex items-center gap-[1.6vw] w-[50%] bg-[#fff] justify-center'
          >
            <Image
              src={planeF}
              width={50}
              height={50}
              alt='img'
              className='w-[4.26vw] h-[4.26vw]'
            />
            <span className='text-[3.46vw] font-[500]'>Tours List</span>
          </Link>
          <div
            onClick={() => setOpenModal(true)}
            className='flex items-center gap-[1.6vw] w-[50%] bg-[#FFD220] justify-center'
          >
            <Image
              src={bookTourIcon}
              width={50}
              height={50}
              alt='img'
              className='w-[4.26vw] h-[4.26vw]'
            />
            <span className='text-[3.46vw] font-[500]'>Book tour</span>
          </div>
        </div>

        {openModal && (
          <ModalCustom
            openModal={openModal}
            setOpenModal={setOpenModal}
            className='w-[91.46vw] md:w-[82.93vw] md:h-[90vh] h-[80vh]'
          >
            <div className='w-full h-full overflow-y-auto md:rounded-[16px] overflow-x-hidden'>
              <BookTour
                data={dataBookTour}
                setOpenModal={setOpenModal}
              />
            </div>
          </ModalCustom>
        )}
        <div
          className='overlay'
          ref={refOverlay}
        ></div>
      </div>
    </DataProvider>
  )
}
