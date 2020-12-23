import fb from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import 'firebase/auth';

const firebase = fb.initializeApp(firebaseConfig);

export { firebase };
