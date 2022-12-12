import React, { useState, useEffect } from 'react';
import { getRootData } from './services/services';

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { loginRequest } from './authConfig';
import { PageLayout } from './components/PageLayout';
import { ProfileData } from './components/ProfileData';
import { callMsGraph } from './graph';
import Button from 'react-bootstrap/Button';
import LinkGroup from './components/LinkGroup';
import './styles/App.css';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
  const [videoid, setVideoId] = useState('');
  const [imageid, setImageId] = useState('');
  const [pdfid, setpdfid] = useState('');
  const rootData = async () => {
    const result = await getRootData();
    let pdfArray = [];
    let imageArray = [];
    let videoArray = [];

    result?.data?.value?.map((item) => {
      if (item?.file?.mimeType === 'video/mp4') {
        videoArray.push(item?.id);
      } else if (
        item?.file?.mimeType === 'image/png' ||
        item?.file?.mimeType === 'image/jpeg' ||
        item?.file?.mimeType === 'image/jpg'
      ) {
        imageArray.push(item?.id);
      } else if (item?.file?.mimeType === 'application/pdf') {
        pdfArray.push(item?.id);
      } else return 0;
    });

    setVideoId(videoArray[2]);
    setImageId(imageArray[2]);
    setpdfid(pdfArray[2]);
  };

  useEffect(() => {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        localStorage.setItem('token', response.accessToken);
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
        });
      });
    rootData();
  }, []);
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  return (
    <>
      <h5 className='card-title'>Welcome {accounts[0]?.name}</h5>
      {graphData ? <ProfileData graphData={graphData} /> : ''}
      <LinkGroup videoid={videoid} imageid={imageid} pdfid={pdfid} />
    </>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  return (
    <div className='App'>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className='card-title'>
          Please sign-in to see your profile information.
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  return (
    <PageLayout>
      <MainContent />
    </PageLayout>
  );
}
