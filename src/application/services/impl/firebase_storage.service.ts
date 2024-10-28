import { Injectable } from '@nestjs/common';
import { FirebaseConfig } from 'src/config/firebase.config';

@Injectable()
export class FirebaseStorageService {

  constructor (private firebaseConfig: FirebaseConfig) {

  }

  private readonly bucket = this.firebaseConfig.getFirebaseAdmin().storage().bucket();

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = this.bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    await fileUpload.makePublic();
    return `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
  }
}