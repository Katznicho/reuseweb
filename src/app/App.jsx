import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import '../fake-db';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const App = () => {
  const content = useRoutes(routes);

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (error) {
      console.log('Error Occured');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SettingsProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
