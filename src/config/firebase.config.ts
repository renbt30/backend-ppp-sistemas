import * as admin from 'firebase-admin';
import * as serviceAccount from '../config/serviceAccountKey.json';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseConfig {
  
  constructor (private configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: this.configService.get<string>('BUCKET')
    });
  }

  getFirebaseAdmin() {
    return admin;
  }
  
}