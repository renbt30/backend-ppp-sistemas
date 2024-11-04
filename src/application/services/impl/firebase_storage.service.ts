import { Injectable } from '@nestjs/common';
import { FirebaseConfig } from 'src/config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseStorageService {

  constructor(private firebaseConfig: FirebaseConfig) {

  }

  private readonly bucket = this.firebaseConfig.getFirebaseAdmin().storage().bucket();

  async uploadFile(file: Express.Multer.File): Promise<{ fileName: string, fileLink: string }> {
    
    const uuid = uuidv4();
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = this.bucket.file(fileName);
    const fileLink = `https://firebasestorage.googleapis.com/v0/b/${this.bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        }
      },
      resumable: false
    });

    blobStream.on('error', (error) => {
      throw new Error('Error al subir archivo a firebase');
    });

    blobStream.on('finish', () => {
      console.log('Archivo subido');
    });

    blobStream.end(file.buffer);

    return { fileName, fileLink }
  }
}