import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIotDataByUserName } from "../../redux/features/iotData/iotDataSlice";
import NoiseGraphPopup from './NoiseGraphPopup';
import CalibrationPopup from '../Calibration/CalibrationPopup';
import CalibrationExceeded from "../CalibartionPage/CalibrationExceeded";
import { useOutletContext } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import DashboardSam from '../Dashboard/DashboardSam';
import Hedaer from '../Header/Hedaer';

const Noise = () => {
  const outletContext = useOutletContext() || {};
  const selectedUserIdFromRedux = useSelector((state) => state.selectedUser.userId);
  const { searchTerm = '' } = outletContext;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { latestData } = useSelector((state) => state.iotData);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCalibrationPopup, setShowCalibrationPopup] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [currentUserName, setCurrentUserName] = useState("KSPCB001");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (userName) => {
      setLoading(true);
      try {
        const result = await dispatch(fetchIotDataByUserName(userName)).unwrap();
        setSearchResult(result);
        setCompanyName(result?.companyName || "Unknown Company");
        setSearchError("");
      } catch (err) {
        setSearchResult(null);
        setCompanyName("Unknown Company");
        setSearchError(err.message || 'No result found for this userID');
      } finally {
        setLoading(false);
      }
    };

    // Check sessionStorage for stored selectedUserId
    const storedUserId = sessionStorage.getItem('selectedUserId');

    // Fetch data if storedUserId is present, otherwise use current state or searchTerm
    const userName = searchTerm || storedUserId || selectedUserIdFromRedux || currentUserName;

    // Trigger data fetch with the correct userName
    fetchData(userName);

    if (storedUserId) {
      setCurrentUserName(storedUserId);  // Set to the retrieved userId
    }
  }, [selectedUserIdFromRedux, searchTerm, currentUserName, dispatch]);

  const handleCardClick = (card) => {
    setSelectedCard(card);  // Set the clicked card data
    setShowPopup(true);  // Open the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  const handleOpenCalibrationPopup = () => {
    setShowCalibrationPopup(true);
  };

  const handleCloseCalibrationPopup = () => {
    setShowCalibrationPopup(false);
  };

  const handleNextUser = () => {
    const userIdNumber = parseInt(currentUserName.replace(/[^\d]/g, ''), 10);
    if (!isNaN(userIdNumber)) {
      const newUserId = `KSPCB${String(userIdNumber + 1).padStart(3, '0')}`;
      fetchUserData(newUserId);  // Fetch data for the next user
    }
  };

  const handlePrevUser = () => {
    const userIdNumber = parseInt(currentUserName.replace(/[^\d]/g, ''), 10);
    if (!isNaN(userIdNumber) && userIdNumber > 1) {
      const newUserId = `KSPCB${String(userIdNumber - 1).padStart(3, '0')}`;
      fetchUserData(newUserId);  // Fetch data for the previous user
    }
  };

  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const result = await dispatch(fetchIotDataByUserName(userId)).unwrap();
      setSearchResult(result);
      setCompanyName(result?.companyName || "Unknown Company");
      setSearchError("");
      setCurrentUserName(userId);  // Update current user name
    } catch (error) {
      setSearchResult(null);
      setCompanyName("Unknown Company");
      setSearchError('No Result found for this userID');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block">
          {/* Optional Sidebar */} <DashboardSam />
        </div>
        <div className="col-lg-9 col-12">
        <div className=" ">
        <div className="row">
          <div className="col-12">
          <Hedaer />
          </div>
        </div>

    
      </div>
          <div className="d-flex justify-content-between prevnext mt-5 ps-5 pe-5">
            <div>
              <button className='btn btn-outline-dark' onClick={handlePrevUser} disabled={loading}>
                <i className="fa-solid fa-arrow-left me-1"></i>Prev
              </button>
            </div>
            <h2 className='text-center'>NOISE DASHBOARD</h2>
            <div>
              <button className='btn btn-outline-dark' onClick={handleNextUser} disabled={loading}>
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h3 className="text-center">{companyName}</h3>
            </div>
          </div>

          <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap justify-content-between">
            {userData?.validUserOne && userData.validUserOne.userType === 'user' && (
              <h5>Data Interval: <span className="span-class">{userData.validUserOne.dataInteval}</span></h5>
            )}
            {userData?.validUserOne && userData.validUserOne.userType === 'user' && (
              <button type="button" onClick={handleOpenCalibrationPopup} className="btn  mb-2 mt-2" style={{backgroundColor:'236a80' , border:'none'}}>
                Calibration
              </button>
            )}
           
           
          </div>
         <div className='d-flex justify-content-end'>
         {latestData && (
              <>
                <h5>Analyser Health:</h5>
                {searchResult?.validationStatus ? (
                  <h5 style={{ color: "green" }}>Good</h5>
                ) : (
                  <h5 style={{ color: "red" }}>Problem</h5>
                )}
              </>
            )}
         </div>

          {searchError && (
            <div className="card mb-4">
              <div className="card-body">
                <h1>{searchError}</h1>
              </div>
            </div>
          )}

          {loading ? (
            <div className="spinner-container">
              <Oval
                height={60}
                width={60}
                color="#236A80"
                ariaLabel="Fetching details"
                secondaryColor="#e0e0e0"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <div className="card my-5 justify-content-start" onClick={() => handleCardClick({ title: 'Noise Level' })} style={{ maxWidth: '400px' }}>
              <div className="card-body">
                <form className='m-4 p-4'>
                  <div className="row">
                    <div>
                      <h3 className='text-center'><b>Limits in DB</b></h3>
                    </div>
                    <h4 className='text-center'>
                      {searchResult ? searchResult.db || 'N/A' : 'N/A'} dB
                    </h4>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showPopup && selectedCard && (
            <NoiseGraphPopup
              isOpen={showPopup}
              onRequestClose={handleClosePopup}
              parameter={selectedCard.title}
              userName={currentUserName}
            />
          )}

          {showCalibrationPopup && (
            <CalibrationPopup onClose={handleCloseCalibrationPopup} />
          )}

          <CalibrationExceeded />
        </div>
      </div>

      <footer className="footer">
        <div className="container-fluid clearfix">
          <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
            {/* Ebhoom Control and Monitor System */}
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            ©{" "}
            <a href="" target="_blank">
              Ebhoom Solutions LLP
            </a>{" "}
            2023
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Noise;
