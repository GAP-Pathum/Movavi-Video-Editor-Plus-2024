import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/footer';
import leftArrow from '../Components/Assets/left-arrow.png';
import { useNavigate } from 'react-router-dom';
import linkedin from '../Components/Assets/linkedin.png';
import gps from '../Components/Assets/gps.png';
import web from '../Components/Assets/web.png';
import './ProfileCards.css';

const ProfileMs = () => {
    const [profiles, setProfiles] = useState([]);
    const [categorizedProfiles, setCategorizedProfiles] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/materialSuppliers');
                const data = response.data;
                setProfiles(data);
                categorizeProfiles(data);
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setError('Error fetching profiles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const categorizeProfiles = (profiles) => {
        const categories = profiles.reduce((acc, profile) => {
            if (profile.TypeOfMaterials) {
                profile.TypeOfMaterials.forEach(material => {
                    if (!acc[material]) {
                        acc[material] = [];
                    }
                    acc[material].push(profile);
                });
            }
            return acc;
        }, {});

        setCategorizedProfiles(categories);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewProfile = (profile) => {
        navigate(`/Pages/ProfileView/${profile._id}`, { state: { profile } });
    };

    const filteredProfiles = profiles.filter(profile => 
        (profile.msdet && profile.msdet.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (profile.TypeOfMaterials && profile.TypeOfMaterials.some(material => material.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const displayedProfiles = selectedCategory === 'All'
        ? filteredProfiles
        : (categorizedProfiles[selectedCategory] || []).filter(profile => 
            (profile.msdet && profile.msdet.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (profile.TypeOfMaterials && profile.TypeOfMaterials.some(material => material.toLowerCase().includes(searchQuery.toLowerCase())))
          );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="main-container">
            <div className="navbar-container" style={{ backgroundColor: '#FF6B00' }}>
                <Navbar />
            </div>
            <div className='pro-body01'>
                <div className='pro-st1'>Material Suppliers
                    <div className="search-bar3">
                        <input
                            type="text"
                            className="search-input2"
                            placeholder="Search by name or material 🔍"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </div>
                <div className='pro-line'></div>
                <div className='pro-tline'>{selectedCategory === 'All' ? 'All Material Suppliers' : selectedCategory}</div>
                <div className='pro-line'></div>
            </div>
            <div className="content-container">
                <button className="back-button" onClick={() => window.location.href = '/Pages/Home'}>
                    <img src={leftArrow} alt="Back" />
                </button>
                <div className="sidebar">
                    <button
                        onClick={() => handleCategoryChange('All')}
                        className={selectedCategory === 'All' ? 'active' : ''}
                    >
                        All
                    </button>
                    {Object.keys(categorizedProfiles).map((material) => (
                        <button
                            key={material}
                            onClick={() => handleCategoryChange(material)}
                            className={selectedCategory === material ? 'active' : ''}
                        >
                            {material}
                        </button>
                    ))}
                </div>
                <div className="profile-cards-container">
                    {displayedProfiles.length === 0 ? (
                        <div>No profiles found for {selectedCategory}</div>
                    ) : (
                        <div className="profile-cards">
                            {displayedProfiles.map((profile) => (
                                <div key={profile._id} className="profile-card">
                                    <div className="profile-header">
                                        <img src={`http://localhost:8000/${profile.profilePicture}`} alt={profile.msdet} className="profile-image" />
                                        <div className="profile-info01">
                                            <h3 className="profile-name">{profile.msdet}</h3>
                                            <div className="profile-rating">
                                                <img src={gps} alt='location' className='pro-icon' onClick={() => window.location.href = profile.workPlace} />
                                                <img src={linkedin} alt='linkedin' className='pro-icon' onClick={() => window.location.href = profile.linkedin} />
                                                <img src={web} alt='website' className='pro-icon' onClick={() => window.location.href = profile.weblink} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-content">
                                        <p>{profile.bio}</p>
                                        <p className="profile-email">{profile.email}</p>
                                        <p className="profile-materials">{profile.TypeOfMaterials ? profile.TypeOfMaterials.join(', ') : ''}</p>
                                        <a href={`http://localhost:8000/${profile.previousJobFile}`} download>Download Portfolio</a>
                                        <button
                                            onClick={() => handleViewProfile(profile)}
                                            className="view-profile-button"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

export default ProfileMs;
