import axios from 'axios';
import { BASE_URL } from '../constants/appConstants';
import { setHeaders } from './common';

// export const uploadFiles = async (email, username, data) => {
//   const formData = new FormData();
//   for (let i = 0; i < data.length; i++) {
//     formData.append('files', data[i]);
//   }

//   try {
//     return await axios.post(
//       BASE_URL + `api/v1/file/upload-files?email=${email}&username=${username}`,
//       formData,
//       setHeaders()
//     );
//   } catch (error) {
//     return error;
//   }
// };
export const getRootData = async () => {
  try {
    return await axios.get(
      BASE_URL + 'root/children?$select=id,name,folder,file',
      setHeaders()
    );
  } catch (error) {
    return error;
  }
};

export const getSingleItem = async (id) => {
  try {
    return await axios.get(BASE_URL + `items/${id}`, setHeaders());
  } catch (error) {
    return error;
  }
};
