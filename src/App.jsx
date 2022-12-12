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
  const rootData = async () => {
    const result = await getRootData();
    const newData = result?.data?.value?.map((item) => {
      if (item?.file?.mimeType === 'video/mp4') {
        return item?.id;
      } else {
        return 0;
      }
    });

    setVideoId(newData[2]);
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
  console.log(accounts, 'accounts');
  // function RequestProfileData() {
  //   // Silently acquires an access token which is then attached to a request for MS Graph data
  //   instance
  //     .acquireTokenSilent({
  //       ...loginRequest,
  //       account: accounts[0],
  //     })
  //     .then((response) => {
  //       callMsGraph(response.accessToken).then((response) =>
  //         setGraphData(response)
  //       );
  //     });
  // }

  return (
    <>
      <h5 className='card-title'>Welcome {accounts[0]?.name}</h5>
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        ''
        // <Button variant='secondary' onClick={RequestProfileData}>
        //   Request Profile Information
        // </Button>
      )}
      <LinkGroup videoid={videoid} />
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
