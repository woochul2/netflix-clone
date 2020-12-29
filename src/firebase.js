import fb from 'firebase/app';
import { firebaseConfig } from './private-config';
import 'firebase/auth';

const firebase = fb.initializeApp(firebaseConfig);

export { firebase };
