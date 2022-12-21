import React from 'react';
import Header from '../../common/Header';
import HomeFooter from '../../common/HomeFooter';
import AboutSection from './AboutSection';
import FAQSection from './FAQSection';
import HeroSection from './HeroSection';
import HorizontalSection from './HorizontalSection';
import RoadMapSection from './RoadmapSection';
import SpecsSection from './SpecsSection';
import TeamSection from './TeamSection';
import '../../../main.css'


function HomePage(props) {
    return (
        <section className='flex flex-col bg-black'>
            <Header /> 
            <HeroSection />
            <div className='flex flex-col'>
                <AboutSection />
                <HorizontalSection /> 
            </div>
            <RoadMapSection />
            <SpecsSection />
            <TeamSection />
            <FAQSection />
            <HomeFooter />
        </section>
    );
}

export default HomePage;