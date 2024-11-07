// profileFunctions.ts

import { useState } from 'react';
import { auth, db, storage } from '../config'; // Adjust the import path based on your project structure
import * as ImagePicker from "expo-image-picker";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

export async function pickImageAndUpload(): Promise<string | undefined> {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const imageUrl = await uploadImage(result.assets[0].uri);
            return imageUrl;
        }
    } catch (error) {
        console.error('Error picking and uploading image:', error);
    }

    return undefined;
}

async function uploadImage(uri: string): Promise<string> {
    const response = await fetch(uri);
    const blob = await response.blob();

    if (!auth.currentUser) {
        throw new Error('User is not authenticated.');
    }

    const storageRef = ref(storage, `UserImg/${auth.currentUser.uid}/${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Listen for events
    await new Promise<void>((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error('Error uploading image:', error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        //resolve(downloadURL);
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                        reject(error);
                    });
            }
        );
    });

    return getDownloadURL(uploadTask.snapshot.ref);
}
