import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {Alert, Platform} from 'react-native';

import {User} from '../model/user';

export const getFormattedDate = (dateString: string) => {
  const a = moment(new Date());
  const b = moment(new Date(dateString));
  const dateDiff = a.diff(b, 'days');

  if (dateDiff == 0) {
    return 'Today';
  } else if (dateDiff == 1) {
    return 'Yesterday, ' + moment(dateString).format('hh:mm a z');
  } else if (dateDiff >= 30) {
    return moment(dateString).format('MMMM D, YYYY');
  } else {
    if (Math.floor(dateDiff) === 1) {
      return `${Math.floor(dateDiff)} day ago`;
    }
    return `${Math.floor(dateDiff)} days ago`;
  }
};

export const getFormattedDob = (dateString: string) => {
  return moment(dateString).format('D MMM YYYY');
};

const showAlert = (heading: string, msg: string) => {
  Alert.alert(heading, msg, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

export const downloadProfilePDF = async (selectedUser: User) => {
  const {name, email, dob, registered, location, picture} = selectedUser;

  const htmlTemplate = `<h1>User Information</h1>
                       <p>Name: ${name.first} ${name.last}</p>
                       <p>Email: ${email}</p>
                       <p>Date of Birth: ${getFormattedDob(dob.date)}</p>
                       <p>Date Joined: ${getFormattedDate(registered.date)}</p>
                       <p>Location: ${location.city}, ${location.state}, ${
    location.country
  }, ${location.postcode}</p>`;
  const options = {
    html: htmlTemplate,
    fileName: 'UserInformation',
    directory: 'Documents',
  };

  const pdfFile = await RNHTMLtoPDF.convert(options);
  const destPath = `${RNFS.DocumentDirectoryPath}/UserInformation.pdf`;

  try {
    if (pdfFile && pdfFile.filePath) {
      await RNFS.moveFile(pdfFile.filePath, destPath);
      showAlert('Success', 'PDF file created and downloaded successfully!');
    }
  } catch (error) {
    showAlert('Error', 'Failed to create or download the PDF file.');
  }
};
