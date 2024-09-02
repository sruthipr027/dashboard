import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/features/user/userSlice';

const NavItem = ({ to, iconClass, title, subtitle }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <li className="nav-item">
      <Link
        className="nav-link"
        to={to}
        style={{ backgroundColor: isHovered ? '#c8d425' : 'inherit' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i className={`menu-icon ${iconClass}`}></i>
        <span className="menu-title">
          {title}
          {subtitle && (
            <span style={{ display: 'block', fontSize: '0.9em' }}>{subtitle}</span>
          )}
        </span>
      </Link>
    </li>
  );
};

const LeftSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userType, loading, error, userData } = useSelector((state) => state.user);
  const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);

  useEffect(() => {
    if (!userData) {
      validateUser();
    }
  }, [userData]);

  const validateUser = async () => {
    try {
      const response = await dispatch(fetchUser()).unwrap();
      if (!response) {
        navigate('/');
      }
    } catch (error) {
      console.error(`Error Validating user: ${error}`);
      navigate('/');
    }
  };

  const handleDashboardClick = () => setShowDashboardSubMenu(!showDashboardSubMenu);

  const getMenuItems = () => {
    if (userType === 'admin') {
      return (
        <>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={handleDashboardClick}>
              <i className="menu-icon typcn typcn-document-text"></i>
              <span className="menu-title">Quality</span>
            </a>
            {showDashboardSubMenu && (
              <ul className="nav sub-menu">
                <NavItem
                  to="/water"
                  iconClass="typcn typcn-document-text"
                  title="Effluent/Water Dashboard"
                />
                <NavItem
                  to="/ambient-air"
                  iconClass="typcn typcn-document-text"
                  title="Ambient Air Dashboard"
                />
                <NavItem
                  to="/noise"
                  iconClass="typcn typcn-document-text"
                  title="Noise Dashboard"
                />
              </ul>
            )}
          </li>
          <NavItem to="/quantity" iconClass="typcn typcn-document-text" title="Quantity" />
          <NavItem to="/energy" iconClass="typcn typcn-document-text" title="Energy" />
          <NavItem to="/live-video" iconClass="typcn typcn-document-text" title="Live Emission Video" />
          <NavItem to="/manage-users" iconClass="typcn typcn-document-text" title="Manage Users" />
          <NavItem to="/users-log" iconClass="typcn typcn-document-text" title="Users Log" />
          <NavItem to="/calibration" iconClass="typcn typcn-document-text" title="Calibration" />
          <NavItem
            to="/calibration-exceed-value"
            iconClass="typcn typcn-document-text"
            title="Parameter Threshold"
            subtitle="exceedance value"
          />
          <NavItem to="/notification" iconClass="typcn typcn-document-text" title="Notification" />
          <NavItem to="/account" iconClass="typcn typcn-document-text" title="Account" />
          <NavItem to="/report" iconClass="typcn typcn-document-text" title="Report" />
          <NavItem to="/subscribe-data" iconClass="typcn typcn-document-text" title="Subscribe" />
          <NavItem
            to="/supportedAnalyserModels"
            iconClass="typcn typcn-document-text"
            title="Supported Analyser Models"
          />
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={handleDashboardClick}>
              <i className="menu-icon typcn typcn-document-text"></i>
              <span className="menu-title">Quality</span>
            </a>
            {showDashboardSubMenu && (
              <ul className="nav sub-menu">
                <NavItem to="/water" iconClass="typcn typcn-document-text" title="Effluent/Water Dashboard" />
                <NavItem to="/ambient-air" iconClass="typcn typcn-document-text" title="Ambient Air Dashboard" />
                <NavItem to="/noise" iconClass="typcn typcn-document-text" title="Noise Dashboard" />
              </ul>
            )}
          </li>
          <NavItem to="/quantity" iconClass="typcn typcn-document-text" title="Quantity" />
          <NavItem to="/energy" iconClass="typcn typcn-document-text" title="Energy" />
          <NavItem to="/account" iconClass="typcn typcn-document-text" title="Account" />
          <NavItem to="/report" iconClass="typcn typcn-document-text" title="Report" />
          <NavItem to="/transactions" iconClass="typcn typcn-document-text" title="Payments" />
          <NavItem
            to="/supportedAnalyserModels"
            iconClass="typcn typcn-document-text"
            title="Supported Analyser Models"
          />
        </>
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="text-wrapper">
              <p className="profile-name">Ebhoom Solutions</p>
              <p className="designation">AquaBox Model M</p>
            </div>
          </a>
        </li>
        <li className="nav-item nav-category">Main Menu</li>
        {getMenuItems()}
      </ul>
    </nav>
  );
};

export default LeftSideBar;
