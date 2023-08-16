import React from 'react';
import { Carousel } from 'antd';
import ProfileCard from './ProfileCard';

const profiles = [
  // List of profile data (you can replace this with your actual data)
  {
    name: 'Harish Muleva',
    designation: 'Software Engineer',
    mobile: '123-456-7890',
    email: 'johndoe@example.com',
    education: 'Bachelor of Science in Computer Science',
    business: 'Software Development',
  },
  {
    name: 'Abhi Pawar',
    designation: 'Web Developer',
    mobile: '987-654-3210',
    email: 'janesmith@example.com',
    education: 'Bachelor of Engineering in Information Technology',
    business: 'Web Development',
  },
  // Add more profiles as needed
];

const ProfileSlider = () => {
  return (
    <Carousel dots={false} autoplay>
      {profiles.map((profile, index) => (
        <ProfileCard key={index} profile={profile} />
      ))}
    </Carousel>
  );
};

export default ProfileSlider;
