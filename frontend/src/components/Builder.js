import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Navbar from './Navbar';
// import CodeText from './CodeText';
import { ChromePicker } from 'react-color';
import { Radio } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import { Link } from 'react-router-dom';
import BgImg from '../images/background.png';
import { useMediaQuery } from 'react-responsive';

const Builder = () => {
  const [radio, setRadio] = useState();

  const [colors, setColors] = useState({
    background: '#cccccc',
    navBackground: '#333333',
    linkColor: '#ffffff',
    hoverLinkColor: '#3344ff',
    mobileNavDrawerBackground: '#333333',
    mobileNavDrawerLinkColor: '#ffffff',
  });

  const [storedColors, setStoredColors] = useState({
    navBackground: '#333333',
  });

  const [colorPicker, setColorPicker] = useState(false);
  const [colorPickerText, setColorPickerText] = useState('Choose an Element to Begin');
  const [navbarPosition, setNavbarPosition] = useState('static');
  const [navbarWidth, setNavbarWidth] = useState('100%');
  const [navbarHeight, setNavbarHeight] = useState('0');
  const [storedNavbarHeight, setStoredNavbarHeight] = useState('0');
  const [navbarViewWidth, setNavbarViewWidth] = useState('100%');
  const [navbarShrink, setNavbarShrink] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [linkHoverState, setLinkHoverState] = useState('none');
  const [scrollText, setScrollText] = useState('Scroll down to see how the navbar reacts');

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.pageYOffset);
      if (navbarShrink === true && navbarPosition === 'fixed') {
        if (scrollY > 50) {
          setNavbarHeight('0');
        } else if (scrollY < 50) {
          setNavbarHeight(storedNavbarHeight);
        }
      } else {
        setNavbarHeight(storedNavbarHeight);
      }
      if (scrollY > 100) {
        setScrollText(':)');
      } else if (scrollY < 100) {
        setScrollText('Scroll down to see how the navbar reacts');
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrollY, navbarPosition, navbarShrink, storedNavbarHeight]);

  const handleColorChange = (color) => {
    setStoredColors({ ...storedColors, navBackground: colors.navBackground });
    if (radio === 'bgColor') {
      setColors({ ...colors, background: color.hex });
      //   document.getElementById('root').style.backgroundColor = colors.background;
    } else if (radio === 'navBgColor') {
      setColors({ ...colors, navBackground: color.hex });
    } else if (radio === 'linkColor') {
      setColors({ ...colors, linkColor: color.hex });
    } else if (radio === 'linksHoverColor') {
      setColors({ ...colors, hoverLinkColor: color.hex });
    } else if (radio === 'linksHoverScaleAndColor') {
      setColors({ ...colors, hoverLinkColor: color.hex });
    } else if (radio === 'mobileNavDrawerBackgroundColor') {
      setColors({ ...colors, mobileNavDrawerBackground: color.hex });
    } else if (radio === 'mobileNavDrawerLinkColor') {
      setColors({ ...colors, mobileNavDrawerLinkColor: color.hex });
    }
  };

  const handleClick = (e) => {
    if (e) {
      setColorPicker(true);
    } else {
      setColorPickerText('Choose an Element');
    }
  };

  const handleClose = () => {
    setColorPicker(false);
  };

  const handleRadio = (x) => {
    // setStoredColors({ ...storedColors, navBackground: colors.navBackground });
    setRadio(x);
    if (x === 'bgColor') {
      setColorPickerText('Page Background Color');
    } else if (x === 'linkColor') {
      setColorPickerText('Link Color');
    } else if (x === 'transparentNavBg') {
      //   setStoredColors({ ...storedColors, navBackground: colors.navBackground });
      setColors({ ...colors, navBackground: 'transparent' });
      setColorPickerText('Choose an Element');
    } else if (x === 'navBgColor') {
      setColors({ ...colors, navBackground: storedColors.navBackground });
      setColorPickerText('Navbar Background Color');
    } else if (x === 'navbarPositionFixed') {
      setNavbarPosition('fixed');
    } else if (x === 'navbarPositionStatic') {
      setNavbarPosition('static');
    } else if (x === 'navbarWidthWide') {
      setNavbarWidth('100%');
    } else if (x === 'navbarWidthContained') {
      setNavbarWidth('1100px');
    } else if (x === 'navbarHeightShort') {
      setNavbarHeight('0');
      setStoredNavbarHeight('0');
    } else if (x === 'navbarHeightMedium') {
      setNavbarHeight('1rem');
      setStoredNavbarHeight('1rem');
    } else if (x === 'navbarHeightTall') {
      setNavbarHeight('2rem');
      setStoredNavbarHeight('2rem');
    } else if (x === 'viewWidthDesktop') {
      setNavbarViewWidth('100%');
    } else if (x === 'viewWidthTablet') {
      setNavbarViewWidth('768px');
    } else if (x === 'viewWidthMobile') {
      setNavbarViewWidth('480px');
    } else if (x === 'navbarShrinkOff') {
      setNavbarShrink(false);
      setNavbarHeight(storedNavbarHeight);
    } else if (x === 'navbarShrinkOn') {
      setNavbarShrink(true);
    } else if (x === 'linksHoverNone') {
      setLinkHoverState('none');
    } else if (x === 'linksHoverScale') {
      setLinkHoverState('scale');
    } else if (x === 'linksHoverColor') {
      setLinkHoverState('color');
      setColorPickerText('Links On Hover Color');
    } else if (x === 'linksHoverScaleAndColor') {
      setLinkHoverState('scaleandcolor');
      setColorPickerText('Links On Hover Color');
    } else if (x === 'mobileNavDrawerBackgroundColor') {
      setColorPickerText('Mobile Nav Drawer Background Color');
    } else if (x === 'mobileNavDrawerLinkColor') {
      setColorPickerText('Mobile Nav Drawer Link Color');
    }
  };

  const isMobile = useMediaQuery({
    query: '(max-width: 414px)',
  });

  const style = {
    background: `url(${BgImg}) no-repeat center center/cover`,
    backgroundColor: colors.background,
  };

  const popover = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    zIndex: '2',
  };

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  const newTo = {
    pathname: '/code',
    state: {
      navBackground: colors.navBackground,
      navbarPosition: navbarPosition,
      navbarWidth: navbarWidth,
      storedNavbarHeight: storedNavbarHeight,
      linkColor: colors.linkColor,
      linkHoverState: linkHoverState,
      hoverLinkColor: colors.hoverLinkColor,
      mobileNavDrawerBackground: colors.mobileNavDrawerBackground,
      mobileNavDrawerLinkColor: colors.mobileNavDrawerLinkColor,
      navbarShrink: navbarShrink,
    },
  };

  return (
    <>
      <Navbar
        navBg={colors.navBackground}
        linkColor={colors.linkColor}
        navbarPosition={navbarPosition}
        navbarWidth={navbarWidth}
        navbarHeight={navbarHeight}
        navbarViewWidth={navbarViewWidth}
        linkHoverState={linkHoverState}
        hoverLinkColor={colors.hoverLinkColor}
        mobileNavDrawerBackground={colors.mobileNavDrawerBackground}
        mobileNavDrawerLinkColor={colors.mobileNavDrawerLinkColor}
      />
      <div style={style} id='builder'>
        {/* <div id='builder'> */}
        <div id='view-width'>
          <Radio
            name='viewWidth'
            value='viewWidthDesktop'
            shape='round'
            variant='fill'
            animation='jelly'
            color='info'
            bigger
            onChange={() => handleRadio('viewWidthDesktop')}
            defaultChecked={isMobile ? false : true}
            data-tip
            data-for='desktop'
            data-delay-show={500}
            disabled={isMobile ? true : false}
          >
            Desktop
          </Radio>
          <ReactTooltip id='desktop'>View navbar on desktop</ReactTooltip>
          <Radio
            name='viewWidth'
            value='viewWidthTablet'
            shape='round'
            variant='fill'
            animation='jelly'
            color='info'
            bigger
            onChange={() => handleRadio('viewWidthTablet')}
            data-tip
            data-for='tablet'
            data-delay-show={500}
            disabled={isMobile ? true : false}
          >
            Tablet
          </Radio>
          <ReactTooltip id='tablet'>View navbar on tablet</ReactTooltip>
          <Radio
            name='viewWidth'
            value='viewWidthMobile'
            shape='round'
            variant='fill'
            animation='jelly'
            color='info'
            bigger
            onChange={() => handleRadio('viewWidthMobile')}
            defaultChecked={isMobile ? true : false}
            data-tip
            data-for='mobile'
            data-delay-show={500}
          >
            Mobile
          </Radio>
          <ReactTooltip id='mobile'>View navbar on mobile</ReactTooltip>
        </div>
        <div id='attributes-window'>
          {/* HEADER */}
          {/* HEADER */}
          {/* HEADER */}
          <div id='attributes-header'>
            <h2>Designer</h2>
          </div>
          {/* BODY */}
          {/* BODY */}
          {/* BODY */}
          <div id='attributes-body'>
            {/* ================= PAGE BACKGROUND COLOR */}
            <div className='attributes-wrapper'>
              <Radio
                name='component'
                value='bgColor'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('bgColor')}
                data-tip
                data-for='page-background'
                data-delay-show={500}
              >
                Page Background Color
              </Radio>
              <ReactTooltip id='page-background'>Choose a color closest to the background of your site</ReactTooltip>
              <p>{colors.background}</p>
            </div>
            {/* ================= NAVBAR BACKGROUND COLOR */}
            <div className='title-box'>
              <hr />
              <h6>NAVBAR BACKGROUND COLOR</h6>
              <hr />
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='component'
                value='navBgColor'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navBgColor')}
                data-tip
                data-for='navbar-background'
                data-delay-show={500}
              >
                Navbar Background Color
              </Radio>
              <ReactTooltip id='navbar-background'>What color would you like your navbar to be?</ReactTooltip>
              <p>{colors.navBackground}</p>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='component'
                value='transparentNavBg'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('transparentNavBg')}
                data-tip
                data-for='navbar-transparent'
                data-delay-show={500}
              >
                Transparent Navbar
              </Radio>
              <ReactTooltip id='navbar-transparent'>If you don't want a colored navbar, choose tranparent</ReactTooltip>
            </div>
            {/* ================= LINKS COLOR */}
            <div className='title-box'>
              <hr />
              <h6>LINKS COLOR</h6>
              <hr />
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='component'
                value='linkColor'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('linkColor')}
                data-tip
                data-for='link-color'
                data-delay-show={500}
              >
                Links Color
              </Radio>
              <ReactTooltip id='link-color'>
                Change the color of your links. P.S. You'll have to style your logo separately.
              </ReactTooltip>
              <p>{colors.linkColor}</p>
            </div>
            {/* ================= NAVBAR POSITION */}
            <div className='title-box'>
              <hr />
              <h6>NAVBAR POSITION</h6>
              <hr />
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarPosition'
                value='navbarPositionStatic'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarPositionStatic')}
                defaultChecked
                data-tip
                data-for='navbar-static'
                data-delay-show={500}
              >
                Navbar Position - Static
              </Radio>
              <ReactTooltip id='navbar-static'>Your navbar will scroll with the page.</ReactTooltip>
              <p>{navbarPosition}</p>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarPosition'
                value='navbarPositionFixed'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarPositionFixed')}
                data-tip
                data-for='navbar-fixed'
                data-delay-show={500}
              >
                Navbar Position - Fixed
              </Radio>
              <ReactTooltip id='navbar-fixed'>Your navbar sticks right to the top of the page.</ReactTooltip>
            </div>
            {/* ================= INNER NAVBAR WIDTH */}
            <div className='title-box'>
              <hr />
              <h6>INNER NAVBAR WIDTH</h6>
              <hr />
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarWidth'
                value='navbarWidthWide'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarWidthWide')}
                defaultChecked
                data-tip
                data-for='navbar-wide'
                data-delay-show={500}
              >
                Navbar Width - Wide
              </Radio>
              <ReactTooltip id='navbar-wide'>
                Your logo and links will be pushed to the edge of the screen.
              </ReactTooltip>
              <p>{navbarWidth}</p>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarWidth'
                value='navbarWidthContained'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarWidthContained')}
                data-tip
                data-for='navbar-contained'
                data-delay-show={500}
              >
                Navbar Width - Contained
              </Radio>
              <ReactTooltip id='navbar-contained'>
                Your logo and links will be in a container that's 1100px max.
              </ReactTooltip>
            </div>
            {/* ================= NAVBAR HEIGHT */}
            <div className='title-box'>
              <hr />
              <h6>NAVBAR HEIGHT</h6>
              <hr />
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarHeight'
                value='navbarHeightShort'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarHeightShort')}
                defaultChecked
                data-tip
                data-for='navbar-short'
                data-delay-show={500}
              >
                Navbar Height - Short
              </Radio>
              <ReactTooltip id='navbar-short'>The height of your navbar will be 0.</ReactTooltip>
              <p>{navbarHeight}</p>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarHeight'
                value='navbarHeightMedium'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarHeightMedium')}
                data-tip
                data-for='navbar-medium'
                data-delay-show={500}
              >
                Navbar Height - Medium
              </Radio>
              <ReactTooltip id='navbar-medium'>
                The height of your navbar will be 1rem above and below your links.
              </ReactTooltip>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarHeight'
                value='navbarHeightTall'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarHeightTall')}
                data-tip
                data-for='navbar-tall'
                data-delay-show={500}
              >
                Navbar Height - Tall
              </Radio>
              <ReactTooltip id='navbar-tall'>
                The height of your navbar will be 2rem above and below your links.
              </ReactTooltip>
            </div>
            {/* ================= NAVBAR SHRINK ON SCROLL */}
            <div className='title-box'>
              <hr />
              <h6>NAVBAR SHRINK ON SCROLL</h6>
              <hr />
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarShrink'
                value='navbarShrinkOff'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarShrinkOff')}
                defaultChecked
                data-tip
                data-for='navbar-shrink-off'
                data-delay-show={500}
              >
                Navbar Shrink - Off
              </Radio>
              <ReactTooltip id='navbar-shrink-off'>
                This will maintain the height of your navbar while scrolling.
              </ReactTooltip>
              <p>{navbarShrink ? 'On' : 'Off'}</p>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='navbarShrink'
                value='navbarShrinkOn'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('navbarShrinkOn')}
                data-tip
                data-for='navbar-shrink-on'
                data-delay-show={500}
              >
                Navbar Shrink - On
              </Radio>
              <ReactTooltip id='navbar-shrink-on'>
                This changes the height of your navbar to 0 (short) during scrolling. P.S. This only works if your
                navbar position is set to Fixed and the height is set to at least Medium.
              </ReactTooltip>
            </div>
            {/* ================= LINKS HOVER EFFECTS */}
            <div className='title-box'>
              <hr />
              <h6>LINKS HOVER EFFECTS</h6>
              <hr />
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='linksHover'
                value='linksHoverNone'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('linksHoverNone')}
                defaultChecked
                data-tip
                data-for='navbar-hover-none'
                data-delay-show={500}
              >
                Links Hover - None
              </Radio>
              <ReactTooltip id='navbar-hover-none'>
                Your links will have no effects when being hovered over.
              </ReactTooltip>
              <p>{linkHoverState}</p>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='linksHover'
                value='linksHoverScale'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('linksHoverScale')}
                data-tip
                data-for='navbar-hover-scale'
                data-delay-show={500}
              >
                Links Hover - Scale
              </Radio>
              <ReactTooltip id='navbar-hover-scale'>
                Your links will scale 1.2 times bigger than they are when hovered over.
              </ReactTooltip>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='linksHover'
                value='linksHoverColor'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('linksHoverColor')}
                data-tip
                data-for='navbar-hover-color'
                data-delay-show={500}
              >
                Links Hover - Color
              </Radio>
              <ReactTooltip id='navbar-hover-color'>Your links will change color when they hovered over.</ReactTooltip>
              <p>{linkHoverState === 'color' || linkHoverState === 'scaleandcolor' ? colors.hoverLinkColor : ''}</p>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='linksHover'
                value='linksHoverScaleAndColor'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('linksHoverScaleAndColor')}
                data-tip
                data-for='navbar-hover-scale-and-color'
                data-delay-show={500}
              >
                Links Hover - Scale and Color
              </Radio>
              <ReactTooltip id='navbar-hover-scale-and-color'>
                Your links will both scale 1.2 times bigger and change color when they hovered over.
              </ReactTooltip>
            </div>
            {/* ================= MOBILE NAV DRAWER */}
            <div className='title-box'>
              <hr />
              <h6>MOBILE NAV DRAWER</h6>
              <hr />
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='component'
                value='mobileNavDrawerBackgroundColor'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('mobileNavDrawerBackgroundColor')}
                data-tip
                data-for='navbar-mobile-drawer-background'
                data-delay-show={500}
              >
                Drawer Background Color
              </Radio>
              <ReactTooltip id='navbar-mobile-drawer-background'>
                Change the color of the background of the drawer (links menu) for mobile displays.
              </ReactTooltip>
              <p>{colors.mobileNavDrawerBackground}</p>
            </div>
            <div className='attributes-wrapper'>
              <Radio
                name='component'
                value='mobileNavDrawerLinkColor'
                shape='round'
                variant='fill'
                animation='jelly'
                color='info'
                bigger
                onChange={() => handleRadio('mobileNavDrawerLinkColor')}
                data-tip
                data-for='navbar-mobile-drawer-link-color'
                data-delay-show={500}
              >
                Drawer Link Color
              </Radio>
              <ReactTooltip id='navbar-mobile-drawer-link-color'>
                Change the color of the links in your mobile drawer.
              </ReactTooltip>
              <p>{colors.mobileNavDrawerLinkColor}</p>
            </div>
          </div>
          {/* FOOTER */}
          {/* FOOTER */}
          {/* FOOTER */}
          <div id='attributes-footer'>
            {/* <div></div> */}
            <button className='circle-btn' />
            <div id='color-picker' onClick={() => handleClick(radio)}>
              <h3>{colorPickerText}</h3>
            </div>
            {colorPicker ? (
              <div style={popover}>
                <div style={cover} onClick={handleClose} />
                <ChromePicker
                  color={
                    radio === 'bgColor'
                      ? colors.background
                      : radio === 'navBgColor'
                      ? colors.navBackground
                      : radio === 'linkColor'
                      ? colors.linkColor
                      : radio === 'linksHoverColor'
                      ? colors.hoverLinkColor
                      : radio === 'linksHoverScaleAndColor'
                      ? colors.hoverLinkColor
                      : radio === 'mobileNavDrawerBackgroundColor'
                      ? colors.mobileNavDrawerBackground
                      : radio === 'mobileNavDrawerLinkColor' && colors.mobileNavDrawerLinkColor
                  }
                  onChange={handleColorChange}
                  disableAlpha={true}
                />
              </div>
            ) : null}
          </div>
        </div>

        <Link to={newTo} className='code-btn'>
          Generate Code
        </Link>
        <div className='scroll-text'>
          <p>{scrollText}</p>
        </div>
        {/* TEXTAREA */}
        {/* TEXTAREA */}
        {/* TEXTAREA */}
        {/* <CodeText
          id={'html-code'}
          title={'HTML'}
          textSelectId={'html-select'}
          theCode={`<nav>
  <div id="nav-container">
    <div id="nav-logo">
      <!-- YOUR LOGO HERE -->
    </div>
    <div id="nav-links">
      <a href="#"><!-- YOUR LINKS --></a>
      <a href="#"><!-- WILL GO HERE --></a>
      <a href="#"><!-- ADD OR REMOVE --></a>
      <a href="#"><!-- AS MANY AS --></a>
      <a href="#"><!-- YOU'D LIKE --></a>
    </div>
    <div id="nav-links-mobile">
      <div id="nav-icon">
        <span class='nav-icon-span'></span>
        <span class='nav-icon-span'></span>
        <span class='nav-icon-span'></span>
        <span class='nav-icon-span'></span>
      </div>
    </div>
  </div>
  <div id="nav-mobile-menu">
    <div id="nav-mobile-links">
      <a href="#"><!-- THE SAME LINKS --></a>
      <a href="#"><!-- FROM ABOVE --></a>
      <a href="#"><!-- WILL GO HERE --></a>
      <a href="#"><!-- AS WELL --></a>
      <a href="#"><!-- YOUR LINKS --></a>
    </div>
  </div>
</nav>`}
        /> */}

        {/* <CodeText
          id={'css-code'}
          title={'CSS'}
          textSelectId={'css-select'}
          theCode={`nav { 
  background-color: ${colors.navBackground} 
  width: 100%;
  position: ${navbarPosition};
}

#nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${navbarWidth}; 
  margin: 0 auto; 
  padding: ${storedNavbarHeight} 0;
}

#nav-links a {
  text-decoration: none;
  display: inline-block;
  margin-left: 16px;
  color: ${colors.linkColor};
  transition: 0.2s;
}

${
  linkHoverState === 'scale'
    ? `#nav-links a:hover {
  transform: scale(1.2);
}`
    : linkHoverState === 'color'
    ? `#nav-links a:hover {
  color: ${colors.hoverLinkColor};
}`
    : linkHoverState === 'scaleandcolor'
    ? `#nav-links a:hover {
  transform: scale(1.2);
  color: ${colors.hoverLinkColor};
}`
    : ''
}
#nav-links-mobile {
  display: none;
}

#nav-icon {
  width: 30px;
  height: 20px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  z-index: 10;
}

#nav-icon span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: ${colors.linkColor};
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

#nav-icon span:nth-child(1) {
  top: 0px;
}

#nav-icon span:nth-child(2),
#nav-icon span:nth-child(3) {
  top: 9px;
}

#nav-icon span:nth-child(4) {
  top: 18px;
}

#nav-icon.open span:nth-child(1) {
  top: 18px;
  width: 0%;
  left: 50%;
}

#nav-icon.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#nav-icon.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#nav-icon.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}

#nav-mobile-menu {
  width: 100%;
  height: 500px;
  background: ${colors.mobileNavDrawerBackground};
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: top;
  transform: scaleY(0);
  transition: 0.2s;
}

#nav-mobile-links {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

#nav-mobile-links a {
  text-decoration: none;
  color: ${colors.mobileNavDrawerLinkColor};
}`}
        /> */}
        {/* <CodeText
          id={'javascript-code'}
          title={'JAVASCRIPT'}
          textSelectId={'javascript-select'}
          theCode={`
const navIcon = document.getElementById('nav-icon');

navIcon.addEventListener('click', () => {
  navIcon.classList.toggle('open');
});

const navMobileMenu = document.getElementById('nav-mobile-menu');
const body = document.querySelector('body');

navIcon.onclick = () => {
  openCloseNav(navIcon.classList.value);
};

function openCloseNav(navOpen) {
  if (navOpen === 'open') {
    navMobileMenu.style.transform = 'scaleY(1)';
    body.style.overflow = 'hidden';
  } else {
    navMobileMenu.style.transform = 'scaleY(0)';
    body.style.overflow = 'scroll';
  }
}

${
  navbarShrink
    ? `const nav = document.querySelector('nav');

window.onscroll = () => scrollNav();

function scrollNav() {
  if (window.pageYOffset > 50) {
    nav.style.padding = '0 32px';
  } else {
    nav.style.padding = '${storedNavbarHeight} 32px';
  }
}
          `
    : ''
}`}
        /> */}
      </div>
      <div id='section-2'>
        <h6>Thank you for using NavBam!</h6>
        <p>made with love by steve.vegas &copy; 2020</p>
      </div>
    </>
  );
};

export default Builder;
