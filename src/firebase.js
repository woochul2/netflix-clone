import fb from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import 'firebase/auth';

const firebase = fb.initializeApp(firebaseConfig);

export { firebase };
